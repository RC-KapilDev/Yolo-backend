import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { roomRouter } from "./routes/room.js";
import { authRouter } from "./routes/auth.js";
import { reservationRouter } from "./routes/reservation.js";
import { roomCheckRouter } from "./routes/roomCheck.js";

const PORT = process.env.PORT || 3000;
const app = express();
const DB =
  "mongodb+srv://rckapildev8:test1234@cluster0.0dppe1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not Connect To MongoDB"));

app.use(cors());
app.use(express.json());
app.use("/yolo", roomRouter);
app.use("/validate", roomCheckRouter);
app.use(authRouter);
app.use("/res", reservationRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening at Port ${PORT}`);
});
