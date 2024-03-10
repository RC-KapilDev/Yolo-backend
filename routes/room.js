import { Rooms, validateRooms } from "../models/room.js";
import express from "express";

const roomRouter = express.Router();

async function createRoom() {
  const room = new Rooms({
    roomtype: "basic",
    location: ["adambakkam", "Guindy"],
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
    rent: 9000,
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

// createRoom();

roomRouter.get("/rooms", async (req, res) => {
  try {
    const rooms = await Rooms.find({});
    // .select("-_id")
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.send(500).json({ message: "INternal Server Error" });
  }
});
roomRouter.post("/room", async (req, res) => {
  const { error } = validateRooms(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  let roomdetails = new Rooms({
    roomtype: req.body.roomtype,
    location: req.body.location,
    sex: req.body.sex,
    amenities: req.body.amenities,
    rent: req.body.rent,
    address: req.body.address,
    image: req.body.image,
  });

  try {
    roomdetails = await roomdetails.save();
    res.status(200).json(roomdetails);
  } catch (err) {
    res.status(500).json({ message: "server Error" });
  }
});

export { roomRouter };
