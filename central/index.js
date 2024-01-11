import express, { json } from "express";
import mongoose from "mongoose";

const PORT = 3000;

mongoose.connect(process.env.DB);

const User = mongoose.model(
  "User",
  {
    name: String,
    surname: String,
    address: String,
    ucin: {
      type: String,
      unique: true
    }
  }
);

const Borrow = mongoose.model("Borrow", {
  bookName: String,
  writer: String,
  isbn: String,
  releaseDate: Date,
  userId: String
});

const app = express();

app.use(json());

app.post("/users", async (req, res) => {
  const {
    name,
    surname,
    address,
    ucin
  } = req.body;


  const user = new User({ name, surname, address, ucin });

  try {
    await user.save();
    res.status(201).send({
      message: `User ${ucin} saved!`,
      error: null
    });
  } catch {
    res.status(400).send({
      message: null,
      error: `Could not save user, duplicate found!`
    });
  }
});

app.post("/borrows", async (req, res) => {
  const {
    bookName,
    writer,
    isbn,
    releaseDate,
    userId
  } = req.body;


  const borrow = new Borrow({
    bookName,
    writer,
    isbn,
    userId,
    releaseDate: new Date(releaseDate)
  });

  const counted = await Borrow.countDocuments({ userId });

  if (counted > 2) {
    res.status(400).send({
      message: null,
      error: `User ${userId} could not borrow, passed the borrow limit`
    });
    return;
  }


  await borrow.save();
  res.status(201).send({
    data: {
      userId,
      isbn
    },
    error: null
  });
});

app.get("/", (_req, res) => {
  res.send("Healthcheck");
});

app.listen(PORT, () => {
  console.log(`Central library app is listening on ${PORT}`);
})
