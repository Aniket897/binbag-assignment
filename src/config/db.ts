import mongoose from "mongoose";

function ConnectDatabase(MongoUrl: string) {
  mongoose
    .connect(MongoUrl as string, {
      dbName: "binbag-assignment",
    })
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((error) => {
      console.log("failed to connect mongodb", error);
      process.exit(1);
    });
}


export default ConnectDatabase;