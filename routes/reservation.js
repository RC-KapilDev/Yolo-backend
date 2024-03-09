import { Reservation, validateReservation } from "../models/reservation.js";
import express from "express";

const reservationRouter = express.Router();

reservationRouter.get("/welcome", (req, res) => {
  res.status(200).send("the rout is working");
});

reservationRouter.post("/rooms", async (req, res) => {
  const { error } = validateReservation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  let reservation = new Reservation({
    email: req.body.email,
    roomtype: req.body.roomtype,
    location: req.body.location,
    sex: req.body.sex,
    amenities: req.body.amenities,
    rent: req.body.rent,
    address: req.body.address,
    image: req.body.image,
  });
  reservation = await reservation.save();
  res.json(reservation);
});

reservationRouter.get("/:email", async (req, res) => {
  const reservation = await Reservation.find({
    email: req.params.email,
  });
  if (!reservation) {
    return res.status(404).send("The given mail id is not Found");
  }
  res.json(reservation);
});

reservationRouter.delete("/:roomid", async (req, res) => {
  try {
    const delreservation = await Reservation.findByIdAndDelete(
      req.params.roomid
    );
    if (!delreservation) {
      res.send(404).send("Rervation not Found");
    }
    res.send(delreservation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export { reservationRouter };
