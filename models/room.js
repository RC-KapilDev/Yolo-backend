import mongoose from "mongoose";

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

export { Rooms };
