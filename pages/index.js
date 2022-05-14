import FormComponent from "../components/FormComponent";
import Table from "../components/Table";
import UserInfo from "../components/UserInfo";
import {getSession} from "next-auth/react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const {data: session} = useSession();

  return (
    <div className="h-screen ">
      {session ? (
        <>
          <Navbar /> <UserInfo />
          <FormComponent />
          <Table />
        </>
      ) : (
        <div className="h-screen">
          <Link href={"/auth/signin"}>Sign in</Link>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  return {props: {session}};
}
