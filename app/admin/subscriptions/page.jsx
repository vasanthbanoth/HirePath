'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SubTableItem from '@/Components/AdminComponents/SubTableItem'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Page = () => {

    const [emails, setEmails] = useState([]);
    const fetchEmails = async () => {
        const response = await axios.get(`/api/email`);
        setEmails(response.data.email);
    }

    const deleteEmail = async (mangoId) => {
        const response = await axios.delete(`/api/email`, {
            params: {
                id: mangoId
            }
        });
        if (response.data.success) {
            toast.success(response.data.msg);
            fetchEmails();
        }
        else {
            toast.error("Error");
        }
    };


useEffect(() => {
    fetchEmails();
}, [])

return (

    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
        <h1>All Subscriptions</h1>
        <div className='relative h-[80vh] max-w-[600px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
            <table className='w-full text-sm text-gray-500'>
                <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            Email Subscription
                        </th>
                        <th scope='col' className='hidden sm:block px-6 py-3'>
                            Date
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {emails && emails.map((email) => {
                        return <SubTableItem key={email._id} email={email.email} mongoId={email._id} deleteEmail={deleteEmail} />
                    })}
                </tbody>
            </table>
        </div>
    </div>
)
}
export default Page