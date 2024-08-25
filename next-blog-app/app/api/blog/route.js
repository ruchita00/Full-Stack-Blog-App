import connectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
const { NextResponse } = require("next/server");

export async function GET(request) {
  await connectDB();
  return NextResponse.json({ msg: "API Working" });
}

export async function POST(request) {
  await connectDB();

  const formData = await request.formData();
  const image = formData.get("image");
  const timestamp = Date.now();

  //logic to store the image into public folder

  let imgURL = null;
  // if (image !== undefined) {
  //   const imageByteData = await image?.arrayBuffer();
  //   const buffer = Buffer.from(imageByteData);
  //   const path = `./public/${timestamp}_${image?.name}`;
  //   await writeFile(path, buffer);
  //   imgURL = `/${timestamp}_${image?.name}`;
  // }

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imgURL ?? "sample.png"}`,
    authorImg: `${formData.get("authorImg")}`,
  };

  await BlogModel.create(blogData);
  return NextResponse.json(
    { success: true, msg: "Blog Added" },
    { status: 200 }
  );
}
