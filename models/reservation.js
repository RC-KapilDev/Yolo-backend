import mongoose from "mongoose";
import Joi from "joi";

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

const roomType = ["basic", "medium", "premium", "luxury"];
const sex = ["male", "female", "unisex"];

const reservationSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  roomtype: {
    type: String,
    required: true,
    enum: roomType,
  },
  location: {
    type: Array,
    required: true,
  },
  sex: {
    type: String,
    required: true,
    enum: sex,
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

const Reservation = mongoose.model("Reservation", reservationSchema);

function validateReservation(room) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    roomtype: Joi.string()
      .required()
      .valid(...roomType),
    location: Joi.array()
      .required()
      .min(1)
      .items(Joi.string().min(5).required()),
    sex: Joi.string()
      .required()
      .valid(...sex),
    amenities: Joi.array()
      .min(1)
      .items(
        Joi.string()
          .valid(...validAmenities)
          .required()
      ),
    rent: Joi.number().min(1000).required(),
    address: Joi.string().min(20).required(),
    image: Joi.array().required().items(Joi.string().uri().required()),
  });
  return schema.validate(room);
}

export { Reservation, validateReservation };
