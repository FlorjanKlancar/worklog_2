import "../styles/globals.css";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginScreen from "../components/LoginScreen";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="p-4 w-full sm:w-10/12 md:w-9/12 lg:w-1/2  m-auto h-screen">
      {!isAuth ? (
        <LoginScreen setIsAuth={setIsAuth} />
      ) : (
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
      )}
    </div>
  );
}

export default MyApp;
