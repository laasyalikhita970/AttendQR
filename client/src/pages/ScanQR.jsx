import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
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

    scanner.render(success, error);

    async function success(result) {

      try {

        console.log("Scanned Result:", result);

        // Convert QR string to object
        const data = JSON.parse(result);

        console.log("Parsed Data:", data);

        // Send to backend
        const response = await API.post("/qr/verify", {
          classId: data.classId,
          token: data.token,
          userId: "student123",
        });

        alert(response.data.msg);

      } catch (err) {

        console.log(err);

        if (err.response) {
          alert(err.response.data.msg);
        } else {
          alert("QR verification failed");
        }

      }

    }

    function error(err) {
      console.warn(err);
    }

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1>Scan QR 📷</h1>

      <div id="reader"></div>

    </div>
  );
}

export default ScanQR;