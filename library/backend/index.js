import axios from "axios";
import express, { json } from "express";
import { readFileSync } from "fs";
import { join } from "path";
import serveStatic from "serve-static";

const PORT = 3000;

const STATIC_PATH = "/app/frontend/dist/";

const CENTRAL_URL = "central:3000/";

const app = express();

app.use(json());

app.post("/api/register", async (req, res) => {
  const response = await axios.post(`${CENTRAL_URL}users`, req.body);
  res
    .status(response.status)
    .send(response.data);
});

app.post("/api/borrow", async (req, res) => {
  const response = await axios.post(`${CENTRAL_URL}borrows`, req.body);

  //TODO: if good then mongoose this bitch

  //TODO: if bad then cri

  res
    .status(response.status)
    .send(response.data);
});

app.use(serveStatic(STATIC_PATH))

app.use("/*", async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT, () => {
  console.log(`Library app is listening on ${PORT}`);
});
