import mongoose from "mongoose";

async function connectDb(): Promise<void> {
  try {
    const conection = await mongoose.connect(process.env.MONGOID as string, {
      dbName: "breakingbad",
    });
    if (conection) {
      console.log(
        "Successfuly Connected Database To The Host : ",
        conection.connection.host,
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export default connectDb;
