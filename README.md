# Registration \ Authentication

## Registration
POST: https://power-pulse-dq7h.onrender.com/api/users/register

Content-Type: application/json
Body:
{
    "name": String, required
    "email": String, required
    "password": String, min length 6 cherecters, required
}

После регистрации нужно пройти вреификацию , на указанную почту будет отправлен email для подтверждения.

Status codes:
201 Created
Response:
{
    "user": {
        "email": String,
        "name": String,
        "verificationToken": String
    }
}
409 Conflict (Email in use)
400 Bad Request

## Resend verification link on email
POST: https://power-pulse-dq7h.onrender.com/verify/

Content-Type: application/json
Body:
{
    "email": String, required
}

Status codes:
200 OK (Verification email sent)
400 Bad Request (Verification has already been passed)
404 Not Found (User not found)

## Login
POST: https://power-pulse-dq7h.onrender.com/api/users/login

Content-Type: application/json
Body:
{
    "email": string, required
    "password": string, required
}

Status codes:
200 OK 
{
    "token": String,
    "user": {
        "email": String,
        "name": String,
        "UserID": String
    }
}
400 Bad Request
401 Unauthorized (Email not verify)

## Current
GET: https://power-pulse-dq7h.onrender.com/api/users/current

Headers:
Authorization: Bearer Token

Respose: 
"user": {
    "email": string,
    "name": string
}

Status codes:
200 OK
401 Unauthorized

## Logout
POST: https://power-pulse-dq7h.onrender.com/api/users/logout

Headers:
Authorization: Bearer Token

Status codes:
204 No Content (Succsess)
401 Unauthorized

# Profile Settings

## Add Profile settings
POST: https://power-pulse-dq7h.onrender.com/api/profileSettings/

Headers:
Authorization: Bearer Token

Content-Type: application/json
Body:
{
    height: number; minimum 150(cm); required
    currentWeight: number; minimum 35(kg); required
    desiredWeight: number; minimum 35(kg); required
    birthday: date; must be older than 18 years;  required
    blood: number; allowed values 1, 2, 3, 4; required
    sex: string; allowed values "male", "female"; required
    levelActivity: number; allowed values 1, 2, 3, 4, 5; required
}

Status codes:
201 Created
{
    "height": Number,
    "currentWeight": Number,
    "desiredWeight": Number,
    "birthday": Date,
    "blood": Number,
    "sex": String,
    "levelActivity": Number 
}
401 Unauthorized
400 Bad Request (Data has been already added)

## Update Profile settings
PUT: https://power-pulse-dq7h.onrender.com/api/profileSettings/

Content-Type: application/json
Body:
{
    height: number; minimum 150(cm); required
    currentWeight: number; minimum 35(kg); required
    desiredWeight: number; minimum 35(kg); required
    birthday: date; must be older than 18 years;  required
    blood: number; allowed values 1, 2, 3, 4; required
    sex: string; allowed values "male", "female"; required
    levelActivity: number; allowed values 1, 2, 3, 4, 5; required
}

Status codes:
200 OK
{
    "height": Number,
    "currentWeight": Number,
    "desiredWeight": Number,
    "birthday": Date,
    "blood": Number,
    "sex": String,
    "levelActivity": Number 
}
401 Unauthorized
400 Bad Request 

## Get Profile settings
GET: https://power-pulse-dq7h.onrender.com/api/profileSettings/

Headers:
Authorization: Bearer Token

Status codes:
200 OK
{
    "height": Number,
    "currentWeight": Number,
    "desiredWeight": Number,
    "birthday": Date,
    "blood": Number,
    "sex": String,
    "levelActivity": Number 
}
401 Unauthorized