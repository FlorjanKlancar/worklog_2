import "../styles/globals.css";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import {SessionProvider} from "next-auth/react";

function MyApp({Component, pageProps}) {
  return (
    <div className="p-4 w-full sm:w-10/12 md:w-9/12 lg:w-1/2  m-auto h-full">
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
