import Layout from '@/components/layout/Layout';
import {useStore} from '@/lib/store';

export default function AboutMe() {
  const state = useStore();

  return (
    <Layout>
      <h2 className='leading-10 text-2xl my-4 font-semibold'>Profile Page</h2>
      {state.user && (
        <>
          <p>ID: {state.user.id}</p>
          <p>Full Name: {state.user.name}</p>
          <p>Email: {state.user.email}</p>
        </>
      )}
      
    </Layout>
  )
}