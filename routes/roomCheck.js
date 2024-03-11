import { RoomsCheck, validateRoomsCheck } from "../models/roomCheck.js";
import express from "express";
import { Rooms } from "../models/room.js";

const roomCheckRouter = express.Router();

roomCheckRouter.get("/", (req, res) => {
  res.status(200).send("ROute Working ");
});

roomCheckRouter.post("/room", async (req, res) => {
  const { error } = validateRoomsCheck(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  let roomdetails = new RoomsCheck({
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

roomCheckRouter.get("/rooms", async (req, res) => {
  try {
    const roomsCheck = await RoomsCheck.find({});
    // .select("-_id")
    res.json(roomsCheck);
  } catch (err) {
    console.error(err);
    res.send(500).json({ message: "INternal Server Error" });
  }
});

roomCheckRouter.delete("/:roomid", async (req, res) => {
  try {
    const room = await RoomsCheck.findByIdAndDelete(req.params.roomid);
    if (!room) {
      return res.status(404).json({ message: "Cannot find the ID" });
    }

    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

roomCheckRouter.delete("/approve/:roomid", async (req, res) => {
  try {
    const room = await RoomsCheck.findByIdAndDelete(req.params.roomid);
    if (!room) {
      return res.status(404).json({ message: "Cannot find the ID" });
    }
    let roomdetails = new Rooms({
      roomtype: room.roomtype,
      location: room.location,
      sex: room.sex,
      amenities: room.amenities,
      rent: room.rent,
      address: room.address,
      image: room.image,
    });
    if (!roomdetails) {
      return res.status(400).json({ message: "not entred room details" });
    }
    roomdetails = await roomdetails.save();
    res.json(roomdetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { roomCheckRouter };
