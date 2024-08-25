import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ruchita:Ruchita@123@cluster0.91n3m.mongodb.net/blog-app"
  );
  console.log("DB Connected");
};
