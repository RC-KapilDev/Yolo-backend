import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/yolo", authRoute);

const DB =
  "mongodb+srv://rkapildev8:test1234@cluster0.ubgexux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB)
  .then(() => {
    console.log("COnnection Successfull");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
