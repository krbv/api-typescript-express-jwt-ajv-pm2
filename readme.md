# API Typescript + Express + JWT + AJV + PM2 Cluster, Zero Downtime

Test task: an example of "production ready" API. Breakpoint 4 hours from the start of the task.

Dear {UserName}, do not upload the source code to the production server without revision.

## Development

`npm start run:dev`

To start, you need to have globally installed Nodemon.

## Production

`npm start run:prod`

Before start, you need to add the new typescript dependency in PM2.

(`pm2 install typescript`)

## Basic usage

Send request to endpoint http://localhost:4000/api/v1/auth with header:<br> Authorization: Bearer secret-api-key

In response you get a token:

```json
{
  "status": "ok",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU5ODgyNTIyMn0.eyTEbIGN04OLh2KDIWGS_6eYyBlWkTwSZ6eD5-yC4Tc"
}
```

The token has no expiration date.

Add the token to the header for all the following requests.<br>
Headers:
token: eyJhbGciOiJIUzI1N...
<br>
GET: http://localhost:4000/api/v1/users<br>or<br>
DELETE: http://localhost:4000/api/v1/users/1

<hr>

## Middlewares

There are three locations for middlewares, each location has its own area of responsibility.

1. The coverage area is the whole application.

`src/index.ts`

```typescript
middlewares: [bodyParser.json, bodyParser.urlencoded];
```

<hr>

2. The coverage area is all routes in the controller.

`src/controllers/usersController/index.ts`

```typescript
middlewares() {
    return [jwtGuardMiddleware];
}
```

<hr>

3. The middlewares will apply only to one route

`src/controllers/usersController/index.ts`

```typescript
  routes(): IRoute[] {
    return [
      {
        path: "/users/:id",
        method: "delete",
        action: this.deleteUser,
        middlewares:[rateLimitter]
      },
    ];
  }
```

## Request Validation

To set up a request validator, you need to create a file with a description of the incoming data, then connect it to the route.

Working example:

`src/controllers/usersController/index.ts`

```typescript
import { createUserSchema } from "../../schemas/userSchema";


  routes(): IRoute[] {
    return [
      {
       // ...
       validationSchema: createUserSchema,
      },
    ];
  }
```

`src/schemas/userSchema.ts`

```javascript
export const createUserSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
    },
  },
  required: ["name"],
};
```
