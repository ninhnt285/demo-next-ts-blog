import Layout from '@/components/layout/Layout';
import {useStore} from '@/lib/store';

export default function Home() {
  const state = useStore();
  
  return (
    <Layout>
      <h1>Welcome Page</h1>
      <p>{state.user && state.user.name}</p>
    </Layout>
  );
}
