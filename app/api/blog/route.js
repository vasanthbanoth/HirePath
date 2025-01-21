import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import ConnectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { ObjectId } from "mongodb";
import fs from 'fs';
const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

// API Endpoint to get all blogs
export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
        const blog = await BlogModel.findOne({_id:new ObjectId(blogId)});
            return NextResponse.json( blog );
        }
        else{
            const blogs = await BlogModel.find({});
            const sortedBlogs = blogs.sort((a, b) => b.date - a.date);
            const decreasedDescriptionBlogs = sortedBlogs.map((blog) => {
                return {
                    "_id": blog._id.toString(),
                    title: blog.title,
                    image: blog.image,
                    date: blog.date,
                    category: blog.category,
                    author: blog.author,
                    author_img: blog.author_img,
                    description: blog.description.slice(0, 100),
                };
            });
            return NextResponse.json({blogs:decreasedDescriptionBlogs});
        }
}
// API Endpoint For Uploading Blogs
export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        author: formData.get('author'),
        image: imgUrl,
        author_img: formData.get('author_img'),
    };

    await BlogModel.create(blogData);
    console.log("Blog saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
}

//create API Endpoint to delete Blog
export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        const blog = await BlogModel.findByIdAndDelete(id);
        
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ msg: "Blog Deleted" }, { status: 200 });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
    }
}