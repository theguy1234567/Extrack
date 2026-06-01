import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

export default async function connectToDB() {
  try {
    console.log("DB config called");
    // console.log("mongoose state:", mongoose.connection.readyState);
    console.log(mongoose.connection.name);

    if (!MONGO_URI) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }

    await mongoose.connect(MONGO_URI);
    const connection = mongoose.connection;
    if (connection.readyState == 1) {
      console.log("✅ DB connected");
    } else {
      console.log("❌ DB NOT connected");
    }
  } catch (error) {
    console.log("❌Db connection failed from dbconfig", error);
  }
}
