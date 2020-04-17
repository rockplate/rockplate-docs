import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeOptions, ThemeProvider } from '@material-ui/core/styles';

import App from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import themeOptions from '../src/theme';

import { AppProps } from 'next/app';

import { MDXProvider } from '@mdx-js/react';

import { Highlight } from '../rockplate/components';

import NextLink from 'next/link';
import Link from '@material-ui/core/Link';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/monokai.css';
// import 'codemirror/theme/rubyblue.css';
// import 'codemirror/theme/blackboard.css';
import './styles.css';
// }

const NextLinkWrapped = (props: any) => (
  <NextLink href={props.href} passHref>
    <a className={props.className}>{props.children}</a>
  </NextLink>
);

const mdxComponents = {
  pre: (props: any) => <div className="highlight-wrapper" {...props} />,
  code: (props: any) => {
    return <Highlight {...props} />;
  },
  a: (props: any) => {
    return <Link component={NextLinkWrapped} {...props} />;
    return (
      <NextLink {...props} passHref>
        <Link {...props} />;
      </NextLink>
    );
  },
};

export default class RockplateDocsApp extends App<{}, {}, { themeOptions: ThemeOptions }> {
  private isDarkMode?: boolean;
  constructor(props: any) {
    super(props);

    let isDarkMode: boolean = false;
    // if (typeof localStorage !== 'undefined' && localStorage.getItem('rockplate-docs-is-dark-mode') !== null) {
    //   isDarkMode = localStorage.getItem('rockplate-docs-is-dark-mode') === '1';
    // } else {
    //   isDarkMode = false; // should useMediaQuery('(prefers-color-scheme: dark)');
    // }

    isDarkMode = false;

    this.isDarkMode = isDarkMode;

    if (themeOptions.palette?.type) {
      themeOptions.palette.type = this.isDarkMode ? 'dark' : 'light';
    }
    this.state = {
      themeOptions,
    };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    const theme = createMuiTheme(this.state.themeOptions);
    return (
      <React.Fragment>
        <Head>
          <title>Rockplate</title>
        </Head>
        <ThemeProvider theme={theme}>
          <MDXProvider components={mdxComponents}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </MDXProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
