import Layout from '@/components/layout/Layout'
import {TextInput} from '@mantine/core'

export default function Login() {
  return (
    <Layout>
      <div className='max-w-lg mx-auto mt-6'>
        <h1 className='text-center'>Login Page</h1>
        <TextInput placeholder='Your Email' type='email' label='Email' />
      </div>
    </Layout>
  )
}