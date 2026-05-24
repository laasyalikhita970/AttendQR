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
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-black text-white p-6 rounded-2xl shadow-lg mb-8">

          <h1 className="text-4xl font-bold">
            AttendQR 🚀
          </h1>

          <p className="mt-2 text-gray-300">
            Smart QR Attendance System
          </p>

        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Generate QR Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-semibold mb-4">
              Generate QR
            </h2>

            <input
              type="text"
              placeholder="Enter Class ID"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <button
              onClick={generateQR}
              className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90"
            >
              Generate QR
            </button>

          </div>

          {/* QR Display */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">

            <h2 className="text-2xl font-semibold mb-4">
              QR Preview
            </h2>

            {qrImage ? (
              <img
                src={qrImage}
                alt="QR Code"
                className="w-72 h-72"
              />
            ) : (
              <p className="text-gray-500">
                QR will appear here
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;