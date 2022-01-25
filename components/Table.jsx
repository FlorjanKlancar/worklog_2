import { db } from "./firebase/index";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  unsubscribe,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import moment from "moment";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/solid";
import { PencilAltIcon } from "@heroicons/react/solid";
import GenericModal from "./GenericModal";
import Delete from "./Delete";
import { useSession } from "next-auth/react";
import Edit from "./Edit";

export default function MyComponent() {
  const { data: session } = useSession();

  const [editOpenModal, setEditOpenModal] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);

  const [hours, setHours] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM"));

  async function getData() {
    console.log("fetch");
    const q = query(
      collection(db, "hours"),
      where("id", "==", session?.user?.uid),
      where("month", "==", moment(date).format("MM")),
      where("year", "==", moment(date).format("YYYY")),
      orderBy("date", "asc")
    );

    const querySnapshot = await getDocs(q);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setHours(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }

  useEffect(() => {
    session && getData();

    //return () => unsubscribe();
  }, [date]);

  let hoursThisMonth = 0;
  let minutesThisMonth = 0;
  let earnedThisMonth = 0;

  hours &&
    hours.map((item) => {
      minutesThisMonth += parseInt(item.data.minutes);
      hoursThisMonth += parseInt(item.data.hours);
      earnedThisMonth += item.data.hours * item.data.wage;
    });

  console.log(minutesThisMonth, "this month mins");
  if (minutesThisMonth > 60) {
    minutesThisMonth = (minutesThisMonth / 60).toString();
    const split = minutesThisMonth.split(".");
    hoursThisMonth = hoursThisMonth + parseInt(split[0]);

    minutesThisMonth = (parseInt(split[1].substring(0, 2)) / 100) * 60;
  }

  return (
    <>
      {deleteOpenModal && (
        <GenericModal modal={deleteOpenModal} openModal={setDeleteOpenModal}>
          <Delete />
        </GenericModal>
      )}

      {editOpenModal && (
        <GenericModal modal={editOpenModal} openModal={setEditOpenModal}>
          <Edit />
        </GenericModal>
      )}
      <div className="flex flex-col justify-between mt-16 space-y-4">
        <div className="flex p-1 bg-sky-600 rounded-lg text-center border-black border-1 shadow-sky-600 shadow-lg justify-between">
          <div className="p-2">
            <ArrowLeftIcon
              className="h-8 w-8 ml-2 hover:cursor-pointer "
              onClick={() =>
                setDate(moment(date).subtract(1, "months").format("YYYY-MM"))
              }
            />
          </div>
          <input
            type="month"
            className="bg-sky-600 p-2 text-center "
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="p-2">
            <ArrowRightIcon
              className="h-8 w-8 ml-2 hover:cursor-pointer "
              onClick={() =>
                setDate(moment(date).add(1, "months").format("YYYY-MM"))
              }
            />
          </div>
        </div>
        <div className="text-sm sm:text-base flex flex-col p-1 bg-sky-600 rounded-lg  justify-between border-black border-1 shadow-sky-600 shadow-lg divide-y-2 divide-black divide-opacity-20">
          <div className="flex justify-between p-2 ">
            <div>Hours this month</div>
            <div>
              {hoursThisMonth} hours{" "}
              {minutesThisMonth > 0 &&
                Math.round(minutesThisMonth) + " minutes"}
            </div>
          </div>

          <div className="flex justify-between p-2">
            <div>Earned this month</div>
            <div>{earnedThisMonth.toFixed(2)}€</div>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll max-h-[500px] mt-4 rounded">
        <table className="min-w-full divide-y divide-gray-200 relative ">
          <thead className="bg-gray-100  ">
            <tr>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white opacity-70"
              >
                Date
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white opacity-70"
              >
                Hours
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white opacity-70"
              >
                Wage
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white opacity-70"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {hours && hours.length ? (
              hours.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 text-sm">
                        <div>
                          {moment(item.data.date).format("DD. MM. YYYY")}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {moment(item.data.date).format("dddd")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 ">
                        <div className="text-black text-base">
                          {item.data.hours} hours
                        </div>
                        {item.data.minutes > 0 && (
                          <div className="text-gray-500 text-xs">
                            {item.data.minutes} minutes
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {item.data.wage}€
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <PencilAltIcon
                        className="h-6 w-6 ml-2 text-gray-400 hover:cursor-pointer "
                        onClick={() => setEditOpenModal(true)}
                      />

                      <TrashIcon
                        className="h-6 w-6 ml-2 text-red-500 hover:cursor-pointer "
                        onClick={() => setDeleteOpenModal(true)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="h-16" colSpan="4">
                  No data found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
