import { useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [classId, setClassId] = useState("");

  const [qrImage, setQrImage] = useState("");

  const generateQR = async () => {

    try {

      const res = await API.post("/qr/generate", {
        classId,
      });

      setQrImage(res.data.qrImage);

    } catch (error) {

      console.log(error);

      alert("QR generation failed ❌");

    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Teacher Dashboard 👨‍🏫
        </h1>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl">

          <h2 className="text-2xl font-semibold mb-6">
            Generate Attendance QR
          </h2>

          <input
            type="text"
            placeholder="Enter Class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-700 outline-none mb-5"
          />

          <button
            onClick={generateQR}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold"
          >
            Generate QR
          </button>

          {qrImage && (

            <div className="mt-10 text-center">

              <h3 className="text-xl mb-5">
                Scan This QR
              </h3>

              <img
                src={qrImage}
                alt="QR Code"
                className="mx-auto w-72 rounded-xl shadow-lg"
              />

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;