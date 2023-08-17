import mongoose from "mongoose";

async function connectDb(): Promise<void> {
  const connection = await mongoose.connect(process.env.MONGOID as string, {
    dbName: "breakingbad",
  });
  if (connection) {
    console.log(`Connected To database Host is ${connection.connection.host}!`);
  }
}
export { connectDb };
