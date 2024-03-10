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

const roomSchema = new mongoose.Schema({
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

const Rooms = mongoose.model("Room", roomSchema);

function validateRooms(room) {
  const schema = Joi.object({
    roomtype: Joi.string()
      .required()
      .valid(...roomType),
    location: Joi.array()
      .required()
      .min(1)
      .items(Joi.string().min(2).required()),
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

export { Rooms, validateRooms };
