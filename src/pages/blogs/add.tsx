import {Blog} from '@/@types/blog';
import Layout from '@/components/layout/Layout';
import {useRequest} from '@/lib/request';
import {useDispatch, useStore} from '@/lib/store';
import {getToken} from '@/lib/token';
import {TextInput, Textarea} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

export default function BlogAdd() {
  const router = useRouter();
  const fetcher = useRequest();
  const state = useStore();

  const { id } = router.query;

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
    }
  });

  useEffect(() => {
    async function fetchData() {
      let token = await getToken()
      if (!token) {
        router.push("/auth/login");
        return;
      }

      if (id) {
        try {
          const resData = await fetcher(`/blogs/${id}`);
          form.setValues({title: resData.data.title, content: resData.data.content});
        } catch (err) {
          console.log(err);
        }
      }
    }

    fetchData();
  }, [id])

  async function onSubmit() {
    try {
      form.clearErrors();
      let responseData
      if (id) {
        responseData = await fetcher(`/blogs/${id}`, {
          method: 'PUT',
          body: JSON.stringify(form.values)
        });
      } else {
        responseData = await fetcher(`/blogs`, {
          method: 'POST',
          body: JSON.stringify(form.values)
        });
      }
      
      if (!responseData.success) {
        form.setErrors(responseData.data);
      } else {
        // TODO: Redirect to updated blog
        router.push(`/blogs/${responseData.data.id}`);
      }
    } catch (err) {
      // console.log(err);
    }
  }

  return (
    <Layout>
      <div className='flex flex-col max-w-lg mx-auto'>
        <h2 className='leading-10 text-2xl my-4 font-semibold'>{id ? 'Update Blog' : 'Add new Blog'}</h2>
        <div className='flex flex-col border p-4 rounded-lg'>
          <TextInput withAsterisk placeholder='Blog Title' label='Blog Title' {...form.getInputProps('title')} />
          <Textarea withAsterisk className='mt-4' placeholder='Blog Content' label='Blog Content' {...form.getInputProps('content')} />
          <button className='mt-8 bg-blue-600 py-3 text-white rounded-lg font-bold hover:bg-blue-500' onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </Layout>
  )
}