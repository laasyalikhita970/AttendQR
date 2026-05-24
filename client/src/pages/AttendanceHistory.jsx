import { useEffect, useState } from "react";
import API from "../services/api";

function AttendanceHistory() {

  const [records, setRecords] = useState([]);

  useEffect(() => {

    fetchAttendance();

  }, []);

  const fetchAttendance = async () => {

    try {

      const res = await API.get("/qr/attendance");

      setRecords(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Attendance History 📋</h1>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Student ID</th>
            <th>Class ID</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {records.map((item) => (
            <tr key={item._id}>

              <td>{item.studentId}</td>

              <td>{item.classId}</td>

              <td>
                {new Date(item.date).toLocaleString()}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AttendanceHistory;