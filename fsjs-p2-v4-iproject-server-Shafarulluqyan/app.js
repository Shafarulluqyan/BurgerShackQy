if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const { Customer, Cart, Food } = require("./models");
const { signToken, verifyToken } = require("./helpers/jwt");
const { comparePass } = require("./helpers/bcrypt");
const app = express();
const port = process.env.PORT || 3000;
const axios = require("axios");
const { Op } = require("sequelize");
const midtransClient = require("midtrans-client");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello coyy!");
});

app.post("/register", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ id: customer.id, email: customer.email });
  } catch (err) {
    if (
      err.name == "SequelizeValidationError" ||
      err.name == "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({ message: err.errors[0].message });
    }
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });
    const customer = await Customer.findOne({ where: { email } });
    if (!customer || !comparePass(password, customer.password))
      return res.status(401).json({ message: "Invalid email/password" });
    res.json({ access_token: signToken({ id: customer.id }) });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const verified = verifyToken(access_token);

    if (!verified) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const customer = await Customer.findByPk(verified.id);

    if (!customer) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.customer = customer;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
app.use(authentication);

app.get("/foods", async (req, res) => {
  try {
    const { page } = req.query;
    const paramQuery = {};
    let limit;
    let offset;

    // Pagination
    if (page !== "" && typeof page !== "undefined") {
      const perPage = 10; // Default perPage value
      const pageNumber = parseInt(page, 10) || 1;
      limit = perPage;
      offset = (pageNumber - 1) * perPage;
      paramQuery.limit = limit;
      paramQuery.offset = offset;
    } else {
      limit = 10;
      offset = 0;
      paramQuery.limit = limit;
      paramQuery.offset = offset;
    }

    const { productName } = req.query;
    let filterCriteria = {};
    if (productName) {
      filterCriteria = {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${productName}%`,
            },
          },
        ],
      };
    }

    const foods = await Food.findAll({
      where: filterCriteria,
      ...paramQuery,
      order: [["id", "ASC"]],
    });

    if (foods) {
      const hasMore = foods.length === limit;
      res.status(200).json({ foods, hasMore });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/carts", async (req, res) => {
  try {
    const cart = await Cart.findAll({
      include: {
        model: Food,
      },
    });
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/cart/:id", async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) {
      req.status(404).json({ message: "Not Found" });
    }
    const cart = await Cart.create({
      CustomerId: req.customer.id,
      FoodId: req.params.id,
    });
    res.status(201).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/generate-midtrans-token", async (req, res) => {
  const price = req.headers.price;
  const customer = await Customer.findByPk(req.customer.id);
  console.log(customer);
  try {
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });
    let parameter = {
      transaction_details: {
        order_id: "TRANSACTION_" + Math.floor(100000 + Math.random() * 900000),
        gross_amount: price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: customer.email,
      },
    };
    const midtransToken = await snap.createTransaction(parameter);
    res.status(201).json(midtransToken);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ where: { id } });

    if (!cart) {
      return res.status(404).json({ message: "Not Found" });
    }

    await Cart.destroy({ where: { id } });
    return res
      .status(200)
      .json({ message: `id ${cart.id} successfully deleted` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// app.patch("/isPayment", async (req, res) => {
//   try {
//     await Customer.update(
//       { isPayment: true },
//       {
//         where: {
//           id: req.customer.id,
//         },
//       }
//     );
//     res.status(200).json({
//       message: `customer with id '${req.customer.id}' is now marked as paid`,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
