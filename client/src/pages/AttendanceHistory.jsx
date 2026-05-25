import { useEffect, useState } from "react";
import API from "../services/api";

function AttendanceHistory() {

  const [records, setRecords] = useState([]);

  useEffect(() => {

    fetchAttendance();

  }, []);

  const fetchAttendance = async () => {

    try {

      const res = await API.get("/attendance");

      setRecords(res.data);

    } catch (error) {

      console.log(error);

      alert("Failed to fetch attendance ❌");

    }

  };

  // Group attendance by date
  const groupedAttendance = records.reduce(
    (groups, item) => {

      const date = new Date(
        item.createdAt
      ).toLocaleDateString();

      if (!groups[date]) {

        groups[date] = [];

      }

      groups[date].push(item);

      return groups;

    },
    {}
  );

  return (

    <div className="min-h-screen bg-gray-900 text-white p-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Attendance History 📷
        </h1>

        {
          Object.entries(groupedAttendance)
            .map(([date, attendance]) => (

              <div
                key={date}
                className="mb-10"
              >

                <h2 className="text-2xl font-bold text-blue-400 mb-4">
                  📅 {date}
                </h2>

                <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">

                  <table className="w-full">

                    <thead className="bg-gray-700">

                      <tr>

                        <th className="p-4 text-left">
                          Student Name
                        </th>

                        <th className="p-4 text-left">
                          Class ID
                        </th>

                        <th className="p-4 text-left">
                          Time
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {
                        attendance.map((item, index) => (

                          <tr
                            key={index}
                            className="border-b border-gray-700"
                          >

                            <td className="p-4">
                              {item.studentName}
                            </td>

                            <td className="p-4">
                              {item.classId}
                            </td>

                            <td className="p-4">
                              {
                                new Date(
                                  item.createdAt
                                ).toLocaleTimeString()
                              }
                            </td>

                          </tr>

                        ))
                      }

                    </tbody>

                  </table>

                </div>

              </div>

            ))
        }

      </div>

    </div>

  );

}

export default AttendanceHistory;