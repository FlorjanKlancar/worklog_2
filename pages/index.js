import {Fragment, useEffect} from "react";
import FormComponent from "../components/FormComponent";
import Table from "../components/Table";
import UserInfo from "../components/UserInfo";
import LoginScreen from "../components/LoginScreen";
import {getSession} from "next-auth/react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Navbar from "../components/Navbar";

export default function Home() {
  const router = useRouter();

  const {data: session} = useSession();

  useEffect(() => {
    if (session) {
      console.log("session = true");
      router.push("/");
    } else {
      // maybe go to login page
      router.push("/auth/signin");
    }
  }, [router, session]);

  return (
    <Fragment>
      <Navbar />
      <UserInfo />
      <FormComponent />
      <Table />
    </Fragment>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  return {props: {session}};
}
