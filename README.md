1. install all the dependencies (npm install)

2. create a .env file and create variables for
   SECRET but if not there is a default value.

3. there is a middleware in server.js called (restrictedRoute) pass that file as middleware
   to add authorization to users.

## - users register and login routes.

> ### POST /api/auth/register

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

> ## after you login, it will add a new property to users information.
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
          "type": <string>, // example (LOGIN) with right credentials otherwise (FAILED)
          "created": <timestamp>

       }
    ]
}
    ...
```

<br />

we are using an array as our database, was trying to use postgreSQL but i wasn't sure if i was allow to.
If you keep login in it will keep adding new properties after an hour it will delete them.
