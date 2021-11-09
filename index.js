require("dotenv").config();

const { Client } = require("pg");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/posts", (request, response) => {
  const client = createClient();

  client.connect().then(() => {
    client.query("SELECT * FROM posts").then((queryResponse) => {
      response.json(queryResponse.rows);
    });
  });
});

app.get("/api/posts/:id", (request, response) => {
  const client = createClient();

  client.connect().then(() => {
    client
      .query("SELECT * FROM posts WHERE id = $1 LIMIT 1", [request.params.id])
      .then((queryResponse) => {
        if (queryResponse.rowCount >= 1) {
          response.json(queryResponse.rows[0]);
        } else {
          response.status(404).send();
        }
      });
  });
});

app.post("/api/posts", (request, response) => {
  const client = createClient();

  client.connect().then(() => {
    client
      .query("INSERT INTO posts (title, body) VALUES ($1, $2) RETURNING *", [
        request.body.title,
        request.body.body,
      ])
      .then((queryResponse) => {
        response.json(queryResponse.rows[0]);
      });
  });
});

/*
  Class exercise
  Create DELETE /api/posts/:id
  SQL: https://www.w3schools.com/sql/sql_delete.asp
  Send a response with a 204 status code and an empty response body if rowCount = 1.
  Otherwise, send a response with a 404 status code and an empty response body.
*/
app.delete("/api/posts/:id", (request, response) => {
  const client = createClient();

  client.connect().then(() => {
    client
      .query("DELETE FROM posts WHERE id = $1", [request.params.id])
      .then((queryResponse) => {
        if (queryResponse.rowCount === 1) {
          response.status(204).send();
        } else {
          response.status(404).send();
        }
      });
  });
});

/*
  Class exercise
  Create PUT /api/posts/:id
  SQL: https://www.w3schools.com/sql/sql_update.asp
  Send the updated post as JSON in the response body if rowCount = 1.
  Be sure to include "RETURNING *" in your SQL like we did in POST /api/posts.
  Otherwise, send a response with a 404 status code and an empty response body.
*/
app.put("/api/posts/:id", (request, response) => {
  const client = createClient();

  client.connect().then(() => {
    client
      .query(
        "UPDATE posts SET title = $1, body = $2 WHERE id = $3 RETURNING *",
        [request.body.title, request.body.body, request.params.id]
      )
      .then((queryResponse) => {
        if (queryResponse.rowCount === 1) {
          response.json(queryResponse.rows[0]);
        } else {
          response.status(404).send();
        }
      });
  });
});

function createClient() {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  });

  return client;
}

app.listen(3000);
