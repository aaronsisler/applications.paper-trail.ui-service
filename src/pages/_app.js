import React from "react";
import App from "next/app";
import Head from "next/head";

import "../styles/app.scss";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Paper Trail</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <nav />
        <Component {...pageProps} />
        <footer />
      </>
    );
  }
}

export default MyApp;
