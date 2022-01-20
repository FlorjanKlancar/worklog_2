import {db} from "./firebase/index";
import {useEffect, useState} from "react";
import moment from "moment";

export default function MyComponent() {
  const [hours, setHours] = useState();

  useEffect(() => {
    db.collection("hours")
      .orderBy("date", "asc")
      .onSnapshot((snapshot) =>
        setHours(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between mt-4 space-y-4">
        <div className="flex p-1 bg-sky-600 rounded-lg text-white text-center border-black border-1 shadow-sky-600 shadow-lg justify-between">
          <div className="p-2">l</div>
          <input type="month" className="bg-sky-600 p-2 text-center " />
          <div className="p-2">r</div>
        </div>
        <div className="flex flex-col p-1 bg-sky-600 rounded-lg text-white justify-between border-black border-1 shadow-sky-600 shadow-lg divide-y-2">
          <div className="flex justify-between p-2">
            <div>Hours this month</div>
            <div>154</div>
          </div>

          <div className="flex justify-between p-2">
            <div>Earned this month</div>
            <div>154€</div>
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
            {hours &&
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
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
