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

## Change password (send email request)
POST: https://power-pulse-dq7h.onrender.com/api/users/changePassword/

Content-Type: application/json
Body:
{
    "email": string,
}


Respose: 
200: OK
{
    "message": "Verification link has been sent on your Email, please check it."
}
При успешном запросе у пользователя появляются следующие изминения:
1) Снова повявляется verificationToken (который есть в ссылке которую высылают на почту)
href="http://localhost:3000/changePassword/${verificationToken}"
2) Accsess Token (token) становиться равный = '' (т.е. мы его разлогиниваем)
3) Статус Verify становится false (это сделано для того чтобы злоумышленник не смог зайти по новой в аккаунт имея старые данные), Т.е. дальше пользователя можно взломать только взломав его почту ... 

404: User not found

## Change Password 
PATCH: https://power-pulse-dq7h.onrender.com/api/users/changePassword/:verificationToken
Content-Type: application/json
Body:
{
    "password": string,
}

Respose: 
200: OK
{
    "message": "Password has been changed, please logged in with new password."
}
404: User not found
400: Bad Request

## Change Avatar
PATCH: https://power-pulse-dq7h.onrender.com/api/users/avatar

Content-Type: multipart/form-data;
Authorization: Bearer Token

form-data: 
avatar: file

Respose: 
200: OK
{
    "avatarURL": "https://res.cloudinary.com/ddko4tdbl/image/upload/v1700509283/kdlo4gcbp008db7vhqjk.jpg"
}
404: User not found
401: Unauthorized


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
    "sex": ,
    "levelActivity": Number 
}
401 Unauthorized
400 Bad Request (Data has been already added)

## Update Profile settings
PUT: https://power-pulse-dq7h.onrender.com/api/profileSettings/

Content-Type: application/json
Body:
{
    "name": String,
    "profileSettings": {
        "height": Number,
        "currentWeight": Number,
        "desiredWeight": Number,
        "birthday": Date,
        "blood": Number,
        "sex": String,
        "levelActivity": Number
    }
}

Status codes:
200 OK
{
    "user": {
        "email": String,
        "name": String,
        "avatarURL": String,
        "registrDate": String,
        "profileSettings": {
            "height": Number,
            "currentWeight": Number,
            "desiredWeight": Number,
            "birthday": Date,
            "blood": Number,
            "sex": String,
            "levelActivity": Number,
            "owner": String,
            "bmr": Number
        }
    }
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

## Get App Statistics
GET: https://power-pulse-dq7h.onrender.com/api/statistics/

Status codes:
200 OK
{
    "exercisesVideos": Number,       Все видео что есть у нас в приложении.
    "usersCount": Number,            Все пользователи что зарегистрированны.
    "exercisesDone": Number,         Кол-во упражнений которые сделали все пользователи.
    "allBurnedColories": Number,     Кол-во каллорий что сожгли все пользователи.
    "generalTimeSpend": Number       Кол-во времени которое провели все пользователи на тренировках.
}