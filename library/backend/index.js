import axios from "axios";
import express, { Router, json } from "express";
import { readFileSync } from "fs";
import { join } from "path";
import serveStatic from "serve-static";
import cors from "cors";
import mongoose from "mongoose";

const PORT = 8000;

const STATIC_PATH = "./frontend/dist/";

const CENTRAL_URL = `http://${process.env.NODE_ENV === "prod" ? process.env.CENTRAL_SERVICE_SERVICE_HOST : "central"}:3000/`

const LIBRARY = process.env.LIBRARY;

mongoose.connect(process.env.DB);

const Borrow = mongoose.model("Borrow", {
  isbn: String,
  userId: String
});

const app = express();

app.use(json());
app.use(cors());

const router = new Router();

router.post("/api/register", async (req, res) => {
  const response = await axios.post(`${CENTRAL_URL} users`, req.body);
  res
    .status(response.status)
    .send(response.data);
});

router.post("/api/borrow", async (req, res) => {
  const response = await axios.post(`${CENTRAL_URL} borrows`, req.body);

  if (response.data.error) {
    res
      .status(response.status)
      .send({
        data: null,
        error: response.data.error
      });

    return;
  }

  const borrow = new Borrow(response.data.data);

  await borrow.save()

  res
    .status(response.status)
    .send("Successfully borrowed!");
});

router.use(serveStatic(STATIC_PATH))

router.use("/*", async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.use(process.env.NODE_ENV === "prod" ? process.env.PATH : "/lib", router);

app.listen(PORT, () => {
  console.log(`${LIBRARY} Library app is listening on ${PORT} `);
});
