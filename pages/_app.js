import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="p-4 w-full sm:w-10/12 md:w-9/12 lg:w-1/2  m-auto h-full">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default App;
