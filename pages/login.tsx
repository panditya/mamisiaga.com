import React, { useEffect } from 'react';
import { TextInput, PasswordInput, Paper, Title, Container, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/hooks';
import api from 'lib/api';
import { useAuth } from 'lib/hooks';
import { setCookies } from 'cookies-next';

export default function LoginPage() {
  const { user, error, mutate } = useAuth();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      device_name: `${process.env.NEXT_PUBLIC_APP_NAME} v${process.env.NEXT_PUBLIC_APP_VERSION}`,
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    try {
      const { data } = await api.auth.login(values);

      setCookies('token', data.data.token);

      await mutate();

      router.push('/');
    } catch (e: any) {
      if (e.response.status === 422) {
        form.setErrors(e.response.data.errors);
      }
    }
  };

  useEffect(() => {
    if (user && !error) {
      router.push('/');
    }
  }, [user]);

  return (
    <Container size={420} my={40}>
      <Title align="center">MamiSiaga</Title>

      <Paper withBorder p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Email"
            placeholder="Your email"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth mt="xl">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
