'use client'
import React, { useEffect, useState } from 'react'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import axios from 'axios'
import { blog_data } from '@/Assets/assets'
import { toast } from 'sonner'

const page = () => {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get(`/api/blog`);
        setBlogs(response.data.blogs);
    }
    const deleteBlog = async (mangoId) => {
        const response = await axios.delete(`/api/blog?id=${mangoId}`);
        fetchBlogs();
    }
    useEffect(() => {
        fetchBlogs();
    }, []);


    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>All blogs</h1>
            <div className='relative h-[80vh] max-w-[850%] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-700 bg-gray-50 text-left uppercase'>
                        <tr>
                            <th scope='col' className='hidden sm:block px-6 py-3'>
                                Author Name
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Blog Title
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogs.map((item, index) => (
                                <BlogTableItem key={index} mango={item._id} authorImg={item.author_img} 
                                title={item.title} author={item.author} deleteBlog={deleteBlog} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page
