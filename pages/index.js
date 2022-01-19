import {Fragment} from "react";
import FormComponent from "../components/FormComponent";
import Table from "../components/Table";
import UserInfo from "../components/UserInfo";

const username = "Manja";

export default function Home() {
  return (
    <Fragment>
      <UserInfo username={username} />
      <FormComponent />
      <Table />
    </Fragment>
  );
}
