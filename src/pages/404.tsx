import Layout from '@/components/layout/Layout';

export default function Error404() {
  return (
    <Layout className='h-screen flex flex-col justify-center'>
      <h1 className='text-center leading-3 text-lg font-semibold text-teal-900'>404 Error: This page could not be found.</h1>
    </Layout>
  )
}