# 🚀 GET started here

List of available endpoints:

- POST /register
- POST /login
- GET /foods
- GET /carts
- POST /cart/:id
- POST /generate-midtrans-token
- DELETE /cart/:id

### CustomerRegister

Register a new Customer.

**URL**: `POST /register`

**Request**:

- Body:
  ```js
  {
    "email": "String",
    "password": "String",
  }
  ```

**Response**:

- _201 - Created_
  - Body:
    ```js
    {
      "statusCode": 201,
      "message": "account with ${customer.email} success to create"
    }
    ```

### Customer Login

Login a Customer.

**URL**: `POST /login`

**Request**:

- Body:
  ```js
  {
    "email": "String",
    "password": "String"
  }
  ```

**Response**:

- _200 - OK_
  - Body:
    ```js
    {
      "statusCode": 201,
      "message": "access_token"
    }
    ```

## Customer Authentication

### Get All Foods

Get all foods.

**URL**: `GET /foods`

**request**:

```js
{
  "access_token": "string"
}
```

**Response**:

- _200 - OK_
  - Body:
    ```json
    {
      "statusCode": 200,
      "foods": [
        {
          "id": "Integer",
          "name": "String",
          "images": "String",
          "desc": "String",
          "price": "String",
          "createdAt": "Date",
          "updatedAt": "Date"
        },
        ...
      ],
      "hasMore": "String"
    }
    ```

### Get All Carts

Get all carts.

**URL**: `GET /carts`

**request**:

```js
{
  "access_token": "string"
}
```

**Response**:

- _200 - OK_

  - Body:

    ```json
    {
      "statusCode": 200,
      "foods":
        [
    {
        "id": "integer",
        "FoodId": "integer",
        "CustomerId": "integer",
        "createdAt": "Date",
        "updatedAt": "Date",
        "Food": {
            "id": "integer",
            "name": "string",
            "images": "string",
            "desc": "string",
            "price": "integer",
            "createdAt": "Date",
            "updatedAt": "Date"
        }
    },
    ...
      ],
    }
    ```

### Create a Cart

Create a new cart.

**URL**: `POST /cart/:id`

**request**:

```js
{
  "access_token": "string"
}
```

200 - OK

```js
{
    "FoodId":<integer>,
    "CustomerId":<integer>
}

```

**Response**:

- _201 - Created_
  - Body:
    ```json
    {
      "statusCode": 201,
      "message": "Cart created successfully!!!"
    }
    ```


### Create a midtrans-token

Create a token for payment with midtrans.

**URL**: `POST /generate-midtrans-token`

**request**:

```js
{
  "access_token": "string"
}
```

200 - OK

```js
{
    "token":<integer>,
    "url":<integer>
}

```

### Delete a Cart

Delete a cart.

**URL**: `DELETE /cart/:id`

**request**:
```js
{
  "access_token": "string"
}
```

**Request**:
params

```js
{
    id:<integer>
}
```

**Response**:

- _200 - OK_
  - Body:
    ```js
    {
      message: " id ${cart.id} successfully deleted";
    }
    ```

## Global Error

## response ( 500)

```js
{
      "statusCode": 201,
      "message": "Internal Server Error"
    }
```
