import {Blog} from '@/@types/blog';
import Layout from '@/components/layout/Layout';
import {useRequest} from '@/lib/request';
import {useStore} from '@/lib/store';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

export default function BlogView() {
  const state = useStore();
  const router = useRouter();
  const fetcher = useRequest();
  const [blog, setBlog] = useState<Blog | null>(null);
  
  let id = router.query.id ?? null;

  useEffect(() => {
    async function fetchBlog() {
      if (id) {
        try {
          const responseData = await fetcher(`/blogs/${id}`);
          setBlog(responseData.data);
        } catch (err) {
          console.log(err);
        }
      }
    }

    fetchBlog();
  }, [id])
  
  async function onDelete() {
    try {
      const responseData = await fetcher(`/blogs/${id}`, {method: 'DELETE'});
      if (responseData.success) {
        router.push('/blogs');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <div className='flex flex-row justify-between items-center px-4'>
        <h2 className='leading-10 text-2xl my-4 font-semibold'>{blog ? blog.title: 'Loading...'}</h2>

        {state.user && (
          <div className='flex gap-2'>
            <Link href={`/blogs/add?id=${id}`} className='bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 py-1 rounded-md'>Edit</Link>
            <button className='bg-rose-500 hover:bg-rose-400 text-white font-bold px-4 py-2 rounded-md' onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>

      <p className='px-4 whitespace-pre-wrap'>{blog?.content}</p>
    </Layout>
  );
}
