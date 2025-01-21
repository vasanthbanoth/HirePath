import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
import { toast } from 'react-toastify'
function BlogTableItem({ authorImg, title, author, mango, date, deleteBlog,}) {
    return (
        <tr className='bg-white border-b'>

            <th scope='col' className='item-center hidden gap-3 sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                <Image width={40} height={40} src={authorImg ? authorImg : assets.profile_icon} />
                <p>{author ? author : "No author"}</p>
            </th>
            <td className='px-6 py-4'>
                {title ? title : "no title"}
            </td>
            <td className='px-6 py-4'>
                {"11 Jan 2025"}
            </td>
            <td onClick={async () => { await deleteBlog(mango); toast.success("Blog deleted") } } className='px-6 py-4 cursor-pointer'>
                x
            </td>
        </tr>
    )
}

export default BlogTableItem    
