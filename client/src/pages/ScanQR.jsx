import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { jwtDecode } from "jwt-decode";
import API from "../services/api";

function ScanQR() {

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    async function success(decodedText) {

      scanner.clear();

      try {

        const data = JSON.parse(decodedText);

        console.log("Scanned Result:", data);

        const token = localStorage.getItem("token");

        const user = jwtDecode(token);

        const res = await API.post("/qr/verify", {
  classId: data.classId,
  token: data.token,
  userId: user.id,
  studentName: user.name,
});

        alert(res.data.msg);

      } catch (err) {

        console.log(err);

        alert("QR verification failed ❌");

      }

    }

    function error(err) {
      console.log(err);
    }

    scanner.render(success, error);

    return () => {
      scanner.clear().catch(() => {});
    };

  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">

      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl">

        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Scan Attendance QR 📷
        </h1>

        <div
          id="reader"
          className="bg-white p-4 rounded-xl"
        ></div>

      </div>

    </div>
  );
}

export default ScanQR;