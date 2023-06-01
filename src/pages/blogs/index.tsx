import {Blog} from '@/@types/blog';
import Layout from '@/components/layout/Layout';
import {useRequest} from '@/lib/request';
import {useStore} from '@/lib/store';
import Link from 'next/link';
import {useEffect, useState} from 'react';

export default function BlogIndex() {
  const [blogs, setBlogs] = useState([]);
  const state = useStore();
  const fetcher = useRequest();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        let responseData = await fetcher("/blogs");
        setBlogs(responseData.data);
      } catch (err) {
      console.log(err);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <Layout>
      <div className='flex flex-row justify-between items-center'>
        <h2 className='leading-10 text-2xl my-4 font-semibold'>All Blogs</h2>
        {state.user && 
          <Link href="/blogs/add" className='bg-blue-500 text-white font-bold px-4 py-2 rounded-md'>Add</Link>
        }
      </div>

      <div className='container flex flex-row flex-wrap w-full max-w-4xl mx-auto justify-start gap-4'>
        {blogs ? (
          blogs.map((blog: Blog) => {
            return (
              <div key={blog.id} className='md:basis-1/2-gap-4 lg:basis-1/3-gap-4 flex self-stretch basis-full'>
                <Link href={`/blogs/${blog.id}`} className='p-4 border rounded-lg self-stretch w-full'>
                  <h3 className='font-semibold mb-2'>{blog.title}</h3>
                  <p>{blog.content.length > 100 ? blog.content.substring(0, 100) + '...' : blog.content}</p>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No Blogs found!</p>
        )}
      </div>
    </Layout>
  );
}
