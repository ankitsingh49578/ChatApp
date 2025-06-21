import mongoose from "mongoose";

export default async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
