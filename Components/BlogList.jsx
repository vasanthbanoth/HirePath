import { assets } from '@/Assets/assets'
import BlogItem from './BlogItem'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { blog_data } from '@/Assets/assets'

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get(`/api/blog`);
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    console.log(blogs);

    return (
        <div>

            <div className='flex justify-center gap-6 my-10'>
                <button onClick={() => setMenu('All')} className={menu === "All" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>All</button>
                <button onClick={() => setMenu('BTech')} className={menu === "BTech" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>BTech</button>
                <button onClick={() => setMenu('Degree')} className={menu === "Degree" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Degree </button>
                <button onClick={() => setMenu('MBBS')} className={menu === "MBBS" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>MBBS </button>
                <button onClick={() => setMenu('UPSC')} className={menu === "UPSC" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>UPSC </button>
            </div>


            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>

                {blogs && blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => {
                    return <BlogItem key={index} id={item._id} image={item.image} title={item.title} description={item.description}
                        category={item.category} />
                })}

            </div>

        </div>
    )
}

export default BlogList