import mongoose from 'mongoose';
import { MONGO_URI, MONGO_OPTIONS } from './config/db'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  try {
      await mongoose.connect(MONGO_URI, MONGO_OPTIONS)
  } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
  }
}

export default connectDB
