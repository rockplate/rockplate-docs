import { NextPage } from 'next';

import React from 'react';
import Layout from '../src/Layout';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { RockPlateIntro } from '../rockplate/components';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  const classes = useStyles();
  return (
    <Layout page="home">
      <RockPlateIntro />
    </Layout>
  );
};

export default Home;
