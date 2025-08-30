import mongoose from "mongoose";
import { serverConfig } from ".";


export async function connectdb() {
  try {
    
    await mongoose.connect(serverConfig.MONGO_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    console.error("error Connecting to MongoDB", error);
  }
}
