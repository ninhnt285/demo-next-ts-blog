import Layout from '@/components/layout/Layout';
import {useStore} from '@/lib/store';
import Image from 'next/image';
import NextIcon from '../../public/images/next.svg';

export default function Home() {
  const state = useStore();
  
  return (
    <Layout className='flex-col gap-y-4'>
      <h2 className='leading-10 text-2xl my-4 font-semibold'>Welcome Page</h2>
      
      <p>This is a demo site for learning and testing new frameworks</p>

      <ul className='pl-4 mt-4'>
        <li className='list-disc'><a className='underline' href='https://nextjs.org/'>NextJS</a></li>
        <li className='list-disc'><a className='underline' href='https://www.typescriptlang.org/'>TypeScript</a></li>
        <li className='list-disc'><a className='underline' href='https://tailwindcss.com/'>Tailwind</a></li>
        <li className='list-disc'><a className='underline' href='https://ui.mantine.dev/'>Mantine</a></li>
      </ul>

      <p className='mt-4'>Source Code: <a className='underline italic font-bold text-blue-500' href='https://github.com/ninhnt285/demo-next-ts-blog'>Github</a></p>
    </Layout>
  );
}
