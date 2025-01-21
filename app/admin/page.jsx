'use client'
import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const AdminPanel = () => {
  const menuItems = [
    { title: 'Add blogs', path: '/admin/addProduct' },
    { title: 'Blogs lists', path: '/admin/blogList' },
    { title: 'Subscriptions', path: '/admin/subscriptions' }
  ]

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-2xl font-bold mb-6'>Admin Panel</h1>
      
      <div className='space-y-4'>
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className='flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors'
          >
            <span className='font-semibold'>{item.title}</span>
            <ChevronRight className='h-5 w-5 text-gray-400' />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel