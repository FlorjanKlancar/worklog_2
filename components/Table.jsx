import DataTable from "react-data-table-component";
import {db} from "./firebase/index";
import {useEffect, useState} from "react";
// A super simple expandable component.
const ExpandedComponent = ({data}) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const columns = [
  {
    name: "Date",
    selector: (row) => row.date,
  },
  {
    name: "Hours",
    selector: (row) => row.hours,
  },
  {
    name: "Earned",
    selector: (row) => row.earned,
  },
];

const data = [
  {
    date: "13. 01. 2022",
    hours: "8",
    earned: "52.8",
  },
  {
    date: "13. 01. 2022",
    hours: "8",
    earned: "52.8",
  },
  {
    date: "13. 01. 2022",
    hours: "8",
    earned: "52.8",
  },
  {
    date: "13. 01. 2022",
    hours: "8",
    earned: "52.8",
  },
  {
    date: "13. 01. 2022",
    hours: "8",
    earned: "52.8",
  },
  {
    date: "13. 01. 2022",
    hours: "8",
    earned: "52.8",
  },
  {
    date: "13. 01. 2022",
    hours: "8",
    earned: "52.8",
  },
  {
    date: "13. 01. 2022",
    hours: "8",
    earned: "52.8",
  },
  {
    date: "13. 01. 2022",
    hours: "8",
    earned: "52.8",
  },
  {
    date: "13. 01. 2022",
    hours: "8",
    earned: "52.8",
  },
  {
    date: "13. 01. 2022",
    hours: "8",
    earned: "52.8",
  },
];

export default function MyComponent() {
  const [hours, setHours] = useState();

  useEffect(() => {
    db.collection("hours").onSnapshot((snapshot) =>
      setHours(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  console.log("hours", hours);
  return (
    <div className="mt-8 rounded ">
      <DataTable
        columns={columns}
        data={data}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
}
