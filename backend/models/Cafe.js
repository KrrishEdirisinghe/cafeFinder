import mongoose from "mongoose";

const openingHoursSchema = new mongoose.Schema(
  {
    monday: { type: String, default: "Closed" },
    tuesday: { type: String, default: "Closed" },
    wednesday: { type: String, default: "Closed" },
    thursday: { type: String, default: "Closed" },
    friday: { type: String, default: "Closed" },
    saturday: { type: String, default: "Closed" },
    sunday: { type: String, default: "Closed" },
  },
  { _id: false }
);

const cafeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    area: {
      type: String,
      required: true,
      enum: [
        "Colombo 03",
        "Colombo 04",
        "Colombo 05",
        "Colombo 07",
        "Rajagiriya",
        "Nugegoda",
      ],
      index: true,
    },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
    wifi: { type: Boolean, default: false, index: true },
    powerOutlets: { type: Boolean, default: false, index: true },
    airConditioning: { type: Boolean, default: false },
    outdoorSeating: { type: Boolean, default: false, index: true },
    studyFriendly: { type: Boolean, default: false, index: true },
    openingHours: { type: openingHoursSchema, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

cafeSchema.index({ name: "text", description: "text", address: "text", area: "text" });

const Cafe = mongoose.models.Cafe || mongoose.model("Cafe", cafeSchema);

export default Cafe;
