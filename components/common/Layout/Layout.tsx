import React, { useState } from 'react';
import {
  AppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  AppShellProps,
} from '@mantine/core';
import Navbar from '../Navbar/Navbar';

export default function Layout({ children }: AppShellProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<Navbar hiddenBreakpoint="sm" hidden={!opened} />}
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Title order={4}>MamiSiaga</Title>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
