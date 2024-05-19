# User List Management and Email Sending API

This API allows administrators to manage user lists and send emails to subscribed users within those lists. Users also have the ability to unsubscribe from the service.

## Setup

To set up the project, you will need the following:

- MongoDB connection link (URI in .env file)
- JWT_SECRET in .env
- Deployed endpoint link (END_POINT in .env)

## Authentication

### Register User

- **Endpoint:** `/api/v1/auth/register`
- **Method:** POST
- **Payload:**
  ```json
  {
    "name": "Sample Name",
    "password": "123456",
    "email": "sample@gmail.com"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User Registered Successfully",
    "user": {
      "name": "Sample Name",
      "email": "Sample@gmail.com",
      "password": "$2b$10$DJKEHzsQDj.6agJEJY1TQuHpP5b9L8ruVbIO69XKodMaBuKG0iJ..",
      "_id": "6649c48d64283e8e088d07a5",
      "createdAt": "2024-05-19T09:21:17.693Z",
      "updatedAt": "2024-05-19T09:21:17.693Z",
      "__v": 0
    }
  }
  ```

### Login User

- **Endpoint:** `/api/v1/auth/login`
- **Method:** POST
- **Payload:**
  ```json
  {
    "password": "123456",
    "email": "sample@gmail.com"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successfully",
    "user": {
      "_id": "66484f098b8b3d3fb3af9228",
      "name": "Sample Name",
      "email": "Sample@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ4NGYwOThiOGIzZDNmYjNhZjkyMjgiLCJpYXQiOjE3MTYxMTA2OTQsImV4cCI6MTcxNjcxNTQ5NH0.58dUby_DbgfvuOey840oGqw84LdZ8wBrIV5V9QszkWQ"
  }
  ```

## Administrator Routes

Put token in header
Authorization = token

### Get Lists

- **Endpoint:** `/api/v1/admin/getlist`
- **Method:** GET
- **Sample Response:**
  ```json
  {
    "success": true,
    "list": [
      {
        "_id": "664853cf811f2de062e06614",
        "title": "User List 1",
        "customProperties": [
          {
            "title": "city",
            "fallbackValue": "Unknown",
            "_id": "664853cf811f2de062e06615"
          },
          {
            "title": "age",
            "fallbackValue": "0",
            "_id": "664853cf811f2de062e06616"
          }
        ],
        "admin": "66478a24b274072a6bd0b68b",
        "createdAt": "2024-05-18T07:07:59.226Z",
        "__v": 0
      }
      // Other lists...
    ]
  }
  ```

### Get Users of a List

- **Endpoint:** `/api/v1/admin/getusers/:listid`
- **Method:** GET
- **Sample Response:**
  ```json
  {
    "success": true,
    "getUsers": [
      {
        "_id": "66499535f5f96b2f7cd18702",
        "name": "desifighter",
        "email": "desifighterrr@gmail.com",
        "subscribe": false
        // Other user details...
      }
      // Other users...
    ]
  }
  ```

### Create List

- **Endpoint:** `/api/v1/admin/createlist`
- **Method:** POST
- **Payload:**
  ```json
  {
    "title": "List method",
    "customProperties": [{ "title": "area", "fallbackValue": "hanumana" }]
  }
  ```
- **Sample Response:**
  ```json
  {
      "title": "List method",
      "customProperties": [
          {
              "title": "area",
              "fallbackValue": "hanumana",
              "_id": "6649c6ce64283e8e088d07b2"
          }
      ],
      "admin": "66478a24b274072a6bd0b
  ```

## Administrator Routes (continued)

### Upload CSV to Add Users

- **Endpoint:** `/api/v1/admin/upload-csv`
- **Method:** POST
- **Payload:**
  - `listid`: The ID of the list to which users will be added.
  - `csvfile`: The CSV file containing user data.
- **Sample Response:**
  ```json
  {
    "success": true,
    "addedUsersCount": 0,
    "errorsCount": 3,
    "errors": [
      {
        "user": {
          "name": "desifighter",
          "email": "desifighterrr@gmail.com",
          "city": "mauganj",
          "zone": ""
        },
        "error": "Email already exists"
      }
      // Other error details...
    ]
  }
  ```

### Send Email to List Users

- **Endpoint:** `/api/v1/admin/email/:listid`
- **Method:** POST
- **Payload:**
  ```json
  {
    "email": "xxxx@gmail.com",
    "password": "XXXX", // App-specific password for third-party app access
    "emailcontent": "Hey [name] Thank you for signing up with your email [email]. We have received your city as [city]. Team MathonGo.",
    "subject": "Test Email Subject"
  }
  ```
- **Sample Response:**
  ```json
  {
    "success": true,
    "successfullySentEmail": [],
    "errorEmail": [],
    "message": "Emails sent successfully"
  }
  ```

## User Routes

### Unsubscribe User

- **Endpoint:** `/api/v1/user/:userid`
- **Method:** GET
