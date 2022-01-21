import { db } from "./firebase/index";
import { useEffect, useState } from "react";
import moment from "moment";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { ArrowLeftIcon } from "@heroicons/react/solid";

export default function MyComponent() {
  const [hours, setHours] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM"));

  useEffect(() => {
    db.collection("hours")
      .where("month", "==", moment(date).format("MM"))
      .where("year", "==", moment(date).format("YYYY"))
      .orderBy("date", "asc")
      .onSnapshot((snapshot) =>
        setHours(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [date]);

  return (
    <>
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
        <div className="flex flex-col p-1 bg-sky-600 rounded-lg  justify-between border-black border-1 shadow-sky-600 shadow-lg divide-y-2 divide-black divide-opacity-20">
          <div className="flex justify-between p-2">
            <div>Hours this month</div>
            <div>?</div>
          </div>

          <div className="flex justify-between p-2">
            <div>Earned this month</div>
            <div>?€</div>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll max-h-[500px] mt-4 rounded">
        <table className="min-w-full divide-y divide-gray-200 relative">
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
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {hours && hours.length ? (
              hours.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {moment(item.data.date).format("DD. MM. YYYY")}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 ">
                        {item.data.hours}
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
                      <div className="flex-shrink-0 h-10 w-10">Delete/edit</div>
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
