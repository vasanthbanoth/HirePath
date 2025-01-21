'use client'
import { blog_data} from '@/Assets/assets';
import React, { Suspense, useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/Components/Footer';
import { assets } from '@/Assets/assets';
import axios from 'axios';


const BlogContent = ({ id }) => {

    const [blog, setBlog] = useState({});
    const [paragraphs, setParagraphs] = useState([]);


    const fetchBlog = async () => {
        const response = await axios.get('/api/blog?id=' + id);
        setBlog(response.data);
        const paragraphs = response.data.description.split('\n');
        setParagraphs(paragraphs);
        console.log(response.data);
    }

    useEffect(() => {
        fetchBlog();
    }, [])



    console.log(blog);

    return (
        <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href="/">
                <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
                </Link>
                <button className='flex items-center gap-2 font-medium 
                    py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started
                    <Image src={assets.arrow} alt='' />
                </button>
            </div>
            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{blog.title}</h1>
                <Image className='mx-auto mt-6 border border-white rounded-full' src={blog.author_img} width={60} height={60} alt='' />
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{blog.author}</p>

            </div>
        </div>
        <div className='mx-5  max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
            <Image className='border-4 border-white' src={blog.image} width={1280} height={720} alt='' />
            <article className="prose">
      <h1 className="my-8 text-[26px] font-semibold">{blog.title}</h1>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4">
          {paragraph}
        </p>
      ))}
    </article>
            
            <div className='my-24'>
                <p className='text-black font font-semibold my-4'>Share this article on social media</p>
                <div className='flex'>
                    <Image src={assets.facebook_icon} width={50} alt='' />
                    <Image src={assets.twitter_icon} width={50} alt='' />
                    <Image src={assets.googleplus_icon} width={50} alt='' />
               
                   </div>
                </div>
            </div> 
            <Footer />                  
    </>
    );
}


const Page = ({ params }) => {
    
    const { id } = React.use(params);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogContent id={id} />
        </Suspense>
    );
}

export default Page;



