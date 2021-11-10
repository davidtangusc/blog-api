# Blog API

## Installation

Clone this repository and `cd` into it. Then run:

```
npm install
```

To run locally, run `npm run dev`.

## Exercises

### Create DELETE /api/posts/:id

- SQL: https://www.w3schools.com/sql/sql_delete.asp
- Send a response with a 204 status code and an empty response body if `rowCount` = 1. Otherwise, send a response with a 404 status code and an empty response body.

### Create PUT /api/posts/:id

- SQL: https://www.w3schools.com/sql/sql_update.asp
- Send the updated post as JSON in the response body if `rowCount` = 1.
- Be sure to include `RETURNING *` in your SQL like we did in `POST /api/posts`. Otherwise, send a response with a 404 status code and an empty response body.
