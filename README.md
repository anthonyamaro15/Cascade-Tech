1. install all the dependencies (npm install)

2. create a .env file and create variables for
   SECRET but if not there is a default value.

3. there is a middleware in server.js pass that file as middleware
   to add authorization to users.

## - users register and login routes.

> ### POST /api/authregister

```
Expects:
{
    email: <string>,
    password: <string>,
    phone: <integer>
}
```

```
Returns:
{
    "email": <string>,
    "password": <string>,
    "phone: <integer>
}
```

<br />

> #### POST /api/auth/login

```
Expects:
{
    email: <string>,
    password: <string>
}

Returns:
{   "token": <string>,
    "email": <string>,
    "password": <string>,
    "phone": <integer>
}
```

<br />

> ## after you login it will add a new property to users information.
>
> ## if you try to login with the wrong password it will add a type of FAILED

```
Returns:
{   "token": <string>,
    "email": <string>,
    "password": <string>,
    "phone": <integer>,
    "event: [
       {
          "type": <string>, // example (LOGIN)
          "created": <timestamp>

       }
    ]
}
    ...
```

<br />

## if you keep login in it will keep adding new properties after an hour it will delete them.
