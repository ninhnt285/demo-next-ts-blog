import Layout from '@/components/layout/Layout'
import {useRequest} from '@/lib/request'
import {useDispatch} from '@/lib/store';
import {setToken} from '@/lib/token';
import {Button, Card, Text, TextInput} from '@mantine/core'
import {useForm} from '@mantine/form'
import {useRouter} from 'next/router';

export default function Login() {
  const fetcher = useRequest();
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
  })

  async function onSubmit() {
    try {
      form.clearErrors();
      const responseData = await fetcher("/login", {
        method: 'POST',
        body: JSON.stringify(form.values)
      });
      if (!responseData.success) {
        form.setErrors(responseData.data);
      } else {
        const newUser = responseData.data;
        // Save token
        await setToken(newUser.token);
        // Set user in store
        dispatch({type: 'SET_USER', payload: newUser});
        router.push("/");
      }
    } catch (err) {
      // console.log(err);
    }
  }

  return (
    <Layout>
      <Card withBorder radius='lg' p='xl' className='max-w-lg mx-auto mt-6 flex flex-col'>
        <Text fz='xl' ta='center' fw='bold' transform='uppercase'>Login</Text>
        <TextInput placeholder='Your Email' type='email' label='Email Address' {...form.getInputProps('email')} />
        <TextInput placeholder='Password' type='password' label='Password' className='mt-4' {...form.getInputProps('password')} />
        <Button className='mt-4 text-right' variant='filled'  onClick={onSubmit}>Submit</Button>
      </Card>
    </Layout>
  );
}
