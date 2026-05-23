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

      console.log("Scanned Result:", result);

      try {

        const data = JSON.parse(result);

        const response = await API.post("/qr/verify", {
          classId: data.classId,
          token: data.token,
          userId: "student123"
        });

        alert(response.data.msg);

      } catch (err) {
        console.log(err);
        alert("QR verification failed ❌");
      }

      scanner.clear();

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