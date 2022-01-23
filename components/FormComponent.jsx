import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import CheckIcon from "@mui/icons-material/Check";
import {useState} from "react";
import {db} from "./firebase/index";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import moment from "moment";
import {useSession} from "next-auth/react";

function FormComponent() {
  const {data: session} = useSession();

  const [wage, setWage] = useState(7.2);
  const [hours, setHours] = useState(8);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  async function submitHandler(e) {
    e.preventDefault();

    const insertObject = {
      wage: wage,
      hours: hours,
      date: date,
      month: moment(date).format("MM"),
      year: moment(date).format("YYYY"),
      timestamp: serverTimestamp(),
      id: session?.user?.uid,
    };

    const docRef = await addDoc(collection(db, "hours"), insertObject);
  }

  return (
    <div className="mt-8">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="flex">
          <FloatingLabel
            controlId={"floatingInputWage"}
            label="Wage"
            className={"mb-3 mr-1 text-gray-400 w-1/2"}
          >
            <Form.Control
              type="number"
              defaultValue={wage}
              onChange={(e) => setWage(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId={"floatingInputWorkingHours"}
            label="Working hours"
            className={"mb-3 ml-1 text-gray-400 w-1/2"}
          >
            <Form.Control
              type="number"
              defaultValue={hours}
              onChange={(e) => setHours(e.target.value)}
              required
            />
          </FloatingLabel>
        </div>

        <FloatingLabel
          controlId={"floatingInputDate"}
          label="Date"
          className={"mb-3 text-gray-400 w-full"}
        >
          <Form.Control
            type="date"
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FloatingLabel>

        <button
          className="w-full bg-sky-500 rounded-md mt-2 p-2 shadow-sky-900 shadow-md font-semibold "
          type="submit"
        >
          <CheckIcon />
          Insert
        </button>
      </form>
    </div>
  );
}

export default FormComponent;
