import express from "express";
import mongoose from "mongoose";
const Port = 3000;
const app = express();

mongoose
  .connect("mongodb://localhost/yolo-application")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not Connect To MongoDB"));

const validAmenities = [
  "parking",
  "ac",
  "wifi",
  "refrigerator",
  "almirah",
  "bedsheet",
  "cctv",
  "housekeeping",
  "pillow",
  "drinkingwater",
  "bathroom",
  "wash",
];

const roomSchema = new mongoose.Schema({
  roomtype: {
    type: String,
    required: true,
    enum: ["basic", "medium", "premium", "luxury"],
  },
  location: {
    type: Array,
    required: true,
  },
  sex: {
    type: String,
    required: true,
    enum: ["male", "female", "unisex"],
  },
  amenities: {
    type: Array,
    validate: {
      validator: function (value) {
        return value.every((item) => validAmenities.includes(item));
      },
      message: (props) => `${props.value} is not a valid Amenities Type`,
    },
  },
  rent: {
    type: Number,
    min: 1000,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
});

const Rooms = mongoose.model("Room", roomSchema);

async function createRoom() {
  const room = new Rooms({
    roomtype: "basic",
    location: ["adam", "velachery"],
    sex: "female",
    amenities: [
      "ac",
      "wifi",
      "bedsheet",
      "pillow",
      "drinkingwater",
      "wash",
      "parking",
      "cctv",
    ],
    rent: 8000,
    address: "No 1/6 bello street adambakkam chennai-8000",
    image: [
      "https://media.designcafe.com/wp-content/uploads/2023/07/05141750/aesthetic-room-decor.jpg",
      "https://media.designcafe.com/wp-content/uploads/2023/07/05141651/aesthetic-room-decor-with-light-fixtures.jpg",
    ],
  });
  try {
    await room.save();
  } catch (err) {
    err.errors;
  }
}

createRoom();

app.get("/rooms", async (req, res) => {
  try {
    const rooms = await Rooms.find({}).select("-_id");
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.send(500).json({ message: "INternal Server Error" });
  }
});

app.listen(Port, () => {
  console.log(`Listening at Port ${Port}`);
});
