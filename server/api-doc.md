# Rent Room API Documentation

## Endpoints :

List of available endpoints : 
- `POST/register`
- `POST/login`
- `GET/types`

- `POST/lodgings`
- `GET/lodgings`
- `GET/lodgings/:id`
- `DELETE/lodgings/:id`

## 1. POST/register
request :
- body :

```json
{
    "username" : "string",
    "email" : "string",
    "password" : "string",
    "role" : "string",
    "phoneNumber" : "string",
    "address" : "string"
}
```

_Response ( 201 - Created )_

```json
{
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "phoneNumber": "string",
    "address": "string",
    "updatedAt": "date",
    "createdAt": "date"
    }
```

_Response ( 400 - Bad Request )_

```json
{
    "message" : "Username is Required"
}
OR
{
    "message" : "Email is Required"
}
OR
{
    "message" : "Insert Correct Email"
}
OR 
{
    "message" : "Password is Required"
}
OR
{
    "message" : "Password minimal 5 characters"
}
```

## 2. POST/login
Description : login for registered user

Request :
```json
{
    "email" : "string",
    "password" : "string"
}

```
_Response ( 200 - OK )_
```json
{
    "acces_token" : "string"
}
```
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 3. GET/types
Description : Get all types

_Response( 200 - OK)_

```json
[
        {
            "id": 2,
            "name": "Apartment",
            "createdAt": "2023-08-07T13:13:53.538Z",
            "updatedAt": "2023-08-07T13:13:53.538Z"
        },
        {
            "id": 3,
            "name": "Hotel",
            "createdAt": "2023-08-07T13:14:01.668Z",
            "updatedAt": "2023-08-07T13:14:01.668Z"
        }
]
```

## 4. POST/lodgings
request :
- body :

```json
{
    "name" : "string", 
    "facility" : "string",
    "roomCapacity" : "integer",
    "imgUrl" : "string",
    "authorId" : "integer",
    "location" : "string",
    "price" : "integer",
    "typeId" : "integer"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "name" : "string", 
    "facility" : "string",
    "roomCapacity" : "integer",
    "imgUrl" : "string",
    "authorId" : "integer",
    "location" : "string",
    "price" : "integer",
    "typeId" : "integer",
    "updatedAt": "date",
    "createdAt": "date"
    }
```

_Response (400 - Bad Request)_

```json
{
    "message" : "Name is Required"
}
OR
{
    "message" : "Facility is Required"
}
OR
{
    "message" : "Img URL is Required"
}
OR 
{
    "message" : "Please Insert Correct URL"
}
OR
{
    "message" : "Location is Required"
}
OR
{
    "message" : "Minimal Price 250000"
}
```

## 5. GET/lodgings
Description : Get all lodgings

_Response( 200 - OK)_

```json
[
        {
            "id": 2,
            "name": "OhYo",
            "facility": "Full Furnished",
            "roomCapacity": 2,
            "imgUrl": "https://www.pinhome.id/kamus-istilah-properti/wp-content/uploads/2021/08/planetofhotels-com.jpg",
            "authorId": 12,
            "location": "Bogor",
            "price": 750000,
            "typeId": 2,
            "createdAt": "2023-08-07T13:32:29.990Z",
            "updatedAt": "2023-08-07T13:32:29.990Z"
        },
        {
            "id": 5,
            "name": "RedWindows",
            "facility": "Double bed",
            "roomCapacity": 2,
            "imgUrl": "https://www.pinhome.id/kamus-istilah-properti/wp-content/uploads/2021/08/planetofhotels-com.jpg",
            "authorId": 14,
            "location": "Bogor",
            "price": 750000,
            "typeId": 4,
            "createdAt": "2023-08-07T14:43:18.436Z",
            "updatedAt": "2023-08-07T14:43:18.436Z"
        }
]
```


## 6. GET/lodgings/:id
Description : Get lodging by id

request : 
- params :
```json 
{
    "id" : "integer(required)"
}
```

_Response( 200 - OK )_
```json
        {
            "id": 2,
            "name": "OhYo",
            "facility": "Full Furnished",
            "roomCapacity": 2,
            "imgUrl": "https://www.pinhome.id/kamus-istilah-properti/wp-content/uploads/2021/08/planetofhotels-com.jpg",
            "authorId": 12,
            "location": "Bogor",
            "price": 750000,
            "typeId": 2,
            "createdAt": "2023-08-07T13:32:29.990Z",
            "updatedAt": "2023-08-07T13:32:29.990Z"
        }
 ```

 _Response( 404 - Not Found )_
 ```json
        {
            "message"  : "Lodging Not Found"
        }
 ```

## 7. DELETE/lodgings/:id
request : 
- params :
```json 
{
    "id" : "integer(required)"
}
```

_Response( 200 - OK )_
```json
{
    "message" : "Lodging with id : 1. succes to deleted"
}
```

_Response ( 404 - Not Found )_
```json
{
    "message" : "Lodging Not Found"
}
```

_Response ( 403 - Forbidden )_
```json
{
    "message" : "You aren't allow access this point"
}
```

## Global Error

Response (500 - Internal Server Error)

```js
{
    "message" : "Internal Server Error"
}
```




