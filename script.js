document.addEventListener("DOMContentLoaded", function () {
    const tanggal = document.getElementById("tanggal");
    const status = document.getElementById("status");
    const tombolPresensi = document.getElementById("tombolPresensi");
    const tombolTutup = document.getElementById("tombolTutup");
    const kamera = document.getElementById("kamera");
    const kameraContainer = document.getElementById("kameraContainer");

    let stream = null;

    tanggal.textContent = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    tombolPresensi.addEventListener("click", async function () {
        try {
            if (!navigator.mediaDevices ||
                !navigator.mediaDevices.getUserMedia) {
                status.textContent =
                    "Browser tidak mendukung kamera atau halaman belum menggunakan HTTPS.";
                return;
            }

            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false
            });

            kamera.srcObject = stream;
            kameraContainer.style.display = "block";
            status.textContent = "Kamera aktif. Fitur pengenalan wajah belum tersedia.";
            tombolPresensi.disabled = true;

        } catch (error) {
            status.textContent =
                "Kamera tidak dapat dibuka. Izinkan akses kamera dan gunakan halaman HTTPS.";
            console.error(error);
        }
    });

    tombolTutup.addEventListener("click", function () {
        if (stream) {
            stream.getTracks().forEach(function (track) {
                track.stop();
            });
            stream = null;
        }

        kamera.srcObject = null;
        kameraContainer.style.display = "none";
        tombolPresensi.disabled = false;
        status.textContent = "Kamera ditutup.";
    });
});