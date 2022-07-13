import "../styles/globals.scss";
import Layout from "../components/layout/Layout";
import { SessionProvider } from "next-auth/react";
import("../models/Question");
import("../models/Quiz");

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
