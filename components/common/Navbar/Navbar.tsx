import React from 'react';
import { Navbar as BaseNavbar, ScrollArea, createStyles, Title } from '@mantine/core';
import {
  Notes,
  CalendarStats,
  Gauge,
  FileAnalytics,
  Adjustments,
} from 'tabler-icons-react';
import { useAuth } from 'lib/hooks';
import { UserButton } from '../UserButton/UserButton';
import { LinksGroup } from '../NavbarLinks/NavbarLinksGroup';

const mockdata = [
  { label: 'Dashboard', icon: Gauge },
  {
    label: 'Maternal Health Monitoring',
    icon: Notes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Prenatal Care', link: '/' },
      { label: 'Delivery', link: '/' },
      { label: 'Postpartum', link: '/' },
    ],
  },
  {
    label: 'Infant Health Monitoring',
    icon: CalendarStats,
    links: [
      { label: 'Neonatal Care', link: '/' },
      { label: 'Immunizations', link: '/' },
      { label: 'BMIs', link: '/' },
    ],
  },
  { label: 'Educational Content', icon: FileAnalytics },
  { label: 'Settings', icon: Adjustments },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function Navbar({ ...props }) {
  const { user } = useAuth();
  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <BaseNavbar width={{ sm: 300 }} p="md" className={classes.navbar} {...props}>
      <BaseNavbar.Section grow className={classes.links} component={ScrollArea}>
        {links}
      </BaseNavbar.Section>

      <BaseNavbar.Section className={classes.footer}>
        <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name={user?.data.name}
          email={user?.data.email}
        />
      </BaseNavbar.Section>
    </BaseNavbar>
  );
}
