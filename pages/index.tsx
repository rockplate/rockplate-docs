import { NextPage } from 'next';
import FooterLinks from '../src/FooterLinks';

import React from 'react';
import Layout from '../src/Layout';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { LandingDemo } from '../rockplate/components';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import Link from '@material-ui/core/Link';
import NextLink from 'next/link';

import Button from '@material-ui/core/Button';

import GitHubIcon from '@material-ui/icons/GitHub';

import IndexDocs from '../docs/index.mdx';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  const classes = useStyles();
  return (
    <Layout page="home">
      <div style={{ maxWidth: '620px', margin: 'auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '30px', lineHeight: '30px' }}>
            <img
              src="https://avatars3.githubusercontent.com/u/61226601?s=200&v=4"
              style={{
                height: '60px',
                marginBottom: '-15px',
                marginRight: '10px',
              }}
            />
            Rockplate
          </h1>
          <h3
            style={{
              marginTop: '-5px',
              marginBottom: '45px',
            }}
          >
            Templating language for sensible humans
          </h3>
        </div>
        <LandingDemo />
        <Alert style={{ marginTop: '30px' }} severity="info">
          <AlertTitle>Quarantine Quiz</AlertTitle>
          <div>
            What happens when you change <code>[you genius]</code> to <code>[you idiot]</code> in live code editor?
          </div>
          <div style={{ marginTop: '10px' }}>
            <Link href="https://github.com/rockplate/rockplate/issues/2">Click here to answer</Link>
          </div>
        </Alert>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <NextLink href="/getting-started" passHref>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              style={{ marginBottom: '8px', marginRight: '8px' }}
            >
              Get Started
            </Button>
          </NextLink>
          <Button
            variant="contained"
            color="default"
            size="medium"
            href="https://github.com/rockplate/rockplate"
            style={{
              marginBottom: '8px',
            }}
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        </div>
        <IndexDocs />
      </div>
      <FooterLinks step={0} next={{ link: '/getting-started', label: 'Getting Started' }} />
    </Layout>
  );
};

export default Home;
