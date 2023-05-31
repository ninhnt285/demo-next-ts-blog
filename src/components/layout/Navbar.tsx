import {useRequest} from '@/lib/request';
import {useDispatch, useStore} from '@/lib/store';
import {removeToken} from '@/lib/token';
import {Burger, Button, Text} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {log} from 'console';
import Image from "next/image";
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

export default function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false);
  const state = useStore();
  const dispatch = useDispatch();
  const router = useRouter();

  async function onLogout() {
    await removeToken();
    dispatch({type: 'LOGOUT', payload: {}});
    router.push("/");
  }

  return (
    <header className='sticky top-0 z-50 bg-teal-900'>
      <nav className='container flex flex-wrap items-center lg:justify-between py-4 mx-auto justify-between px-4'>
        <div id='logo' className='flex lg:flex-1'>
          <Link href='/'>
            <Image src={`/images/logo-shadow.png`} alt='Logo' height='24' width='113' />
          </Link>
        </div>

        <Burger className='lg:hidden text-white' color='white' opened={drawerOpened} onClick={toggleDrawer} />

        <ul id='main-nav' className={`${drawerOpened ? '' : 'hidden'} border-teal-600 text-white basis-full border-y my-4 py-2 lg:my-0 lg:py-0 lg:flex lg:gap-x-4 lg:basis-auto lg:border-y-0`}>
          <li className={`text-md font-semibold leading-6 rounded-lg hover:text-teal-200 ${router.pathname == '/' && 'text-teal-50 bg-teal-800'}`}>
            <Link className='block py-2 px-4' href='/'>Home</Link>
          </li>

          <li className={`text-md font-semibold leading-6 rounded-lg hover:text-teal-200 ${router.pathname == '/blogs' && 'text-teal-50 bg-teal-800'}`}>
          <Link className='block py-2 px-4' href='/blogs'>Blogs</Link>
          </li>

          <li className={`text-md font-semibold leading-6 rounded-lg hover:text-teal-200 ${router.pathname == '/about-me' && 'text-teal-50 bg-teal-800'}`}>
          <Link className='block py-2 px-4' href='/about-me'>About Me</Link>
          </li>
        </ul>

        <div id='extra-btns' className={`${drawerOpened ? '' : 'hidden'} flex basis-full flex-col gap-y-2 text-center lg:flex lg:flex-1 lg:flex-row lg:justify-end lg:gap-x-4 lg:p-0`}>
          {state.isFetching ? null : (state.user ? (
            <Button onClick={onLogout}>Logout</Button>
          ) : (
            <>
              <Link href='/login' className='bg-white text-cyan-600 px-4 py-2 rounded-md font-bold hover:bg-gray-100'>Login</Link>
              <Link href='/register' className='text-gray-700 bg-teal-300 px-4 py-2 rounded-md font-bold hover:bg-teal-400'>Register</Link>
            </>
          ))}
        </div>
      </nav>
    </header>
  );
}
