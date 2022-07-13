import { Fragment } from "react";
import MainHeader from "./MainHeader";

import classes from "../../styles/layout/Layout.module.scss";
import { useSession } from "next-auth/react";

function Layout({ children }) {
  const { data: session } = useSession(); //making sure the session is active

  return (
    <Fragment>
      <MainHeader currentUser={session?.user} />
      <main className={classes.Layout}>{children}</main>
    </Fragment>
  );
}

export default Layout;
