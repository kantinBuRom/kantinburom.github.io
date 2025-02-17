const securityConfig = {
  maxLength: 100,
  phoneNumber: "NjI4MTM4NjU4NTkyMQ==",
};
function showStoreInfo() {
  const storeHours = "Senin - Sabtu: 07.30 - 16.00";
  const storeAddress =
    "Kantin Basement Unpam 2 Viktor Buaran\nKantin Bu Rom 57";
  let secureBRI = "MTEyNzAxMDAwNTQyNTM2";

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  function getQRImageStyle() {
    if (isMobileDevice()) {
      const screenWidth = window.innerWidth;
      const qrSize = Math.min(screenWidth * 1, 400);
      return `width: ${qrSize - 50}px; height: ${
        qrSize + 200
      }px; max-width: 90vw; margin: auto;`;
    } else {
      return `width: 400px; height: 600px; margin: auto;`;
    }
  }

  secureBRI = atob(secureBRI);

  swal({
    title: "Info Warung Bu Rom",
    text: `Jam Buka: ${storeHours}\nAlamat: ${storeAddress}\n\nSilakan hubungi kami melalui WhatsApp untuk informasi lebih lanjut.\nPilih Menu Pembayaran`,
    icon: "info",
    buttons: {
      bri: {
        text: "Scan QRIS BRI",
        value: "bri",
      },
      dana: {
        text: "Scan QRIS",
        value: "dana",
      },
    },
  }).then((value) => {
    if (value === "bri") {
      const showQRCode = (clipboardMessage = "") => {
        swal({
          title: "Scan QRIS BRI",
          text: `Nomor rekening: ${secureBRI}\n${clipboardMessage}`,
          icon: "success",
          content: {
            element: "img",
            attributes: {
              src: "./image/QRIS.webp",
              alt: "QR Code",
              style: getQRImageStyle(),
            },
          },
          buttons: {
            dana: {
              text: "Buka Aplikasi Dana",
              value: "dana",
            },
            gopay: {
              text: "Buka Aplikasi Gopay",
              value: "gopay",
            },
            gojek: {
              text: "Buka Aplikasi Gojek",
              value: "gojek",
            },
            gopayMerchant: {
              text: "Buka Aplikasi Gopay Merchant",
              value: "gopayMerchant",
            },
            close: {
              text: "Tutup",
              value: "close",
            },
          },
        }).then((action) => {
          if (action === "dana") {
            window.location.href =
              "intent://home#Intent;scheme=danaid;package=id.dana;S.browser_fallback_url=https%3A%2F%2Flink.dana.id;end;";
          } else if (action === "gopay") {
            window.location.href =
              "intent://home#Intent;scheme=gopay;package=com.gojek.gopay;end;";
          } else if (action === "gojek") {
            window.location.href =
              "intent://home#Intent;scheme=gojek;package=com.gojek.app;end;";
          } else if (action === "gopayMerchant") {
            window.location.href =
              "intent://home#Intent;scheme=gopaymerchant;package=com.gojek.gopaymerchant;end;";
          } else if (action === "close") {
            swal.close();
          }
        });
      };

      if (navigator.clipboard) {
        if (window.isSecureContext) {
          navigator.clipboard
            .writeText(secureBRI)
            .then(() =>
              showQRCode("\nNomor Rekening telah tersalin. Jika ingin manual")
            )
            .catch(() =>
              showQRCode("\nGagal menyalin, silakan salin secara manual.")
            );
        } else {
          navigator.clipboard
            .writeText(secureBRI)
            .then(() =>
              showQRCode("\nNomor Rekening telah tersalin. Jika ingin manual")
            )
            .catch(() =>
              showQRCode("\nGagal menyalin, silakan salin secara manual.")
            );
        }
      } else {
        showQRCode("\nSilakan salin secara manual.");
      }
    } else if (value === "dana") {
      const showQRCode = (clipboardMessage = "") => {
        swal({
          title: "Scan QRIS",
          text: `Nomor rekening: ${secureBRI}\n${clipboardMessage}`,
          icon: "success",
          content: {
            element: "img",
            attributes: {
              src: "./image/QRIS2.webp",
              alt: "QR Code",
              style: getQRImageStyle(),
            },
          },
          buttons: {
            dana: {
              text: "Buka Aplikasi Dana",
              value: "dana",
            },
            gopay: {
              text: "Buka Aplikasi Gopay",
              value: "gopay",
            },
            gojek: {
              text: "Buka Aplikasi Gojek",
              value: "gojek",
            },
            gopayMerchant: {
              text: "Buka Aplikasi Gopay Merchant",
              value: "gopayMerchant",
            },
            close: {
              text: "Tutup",
              value: "close",
            },
          },
        }).then((action) => {
          if (action === "dana") {
            window.location.href =
              "intent://home#Intent;scheme=danaid;package=id.dana;S.browser_fallback_url=https%3A%2F%2Flink.dana.id;end;";
          } else if (action === "gopay") {
            window.location.href =
              "intent://home#Intent;scheme=gopay;package=com.gojek.gopay;end;";
          } else if (action === "gojek") {
            window.location.href =
              "intent://home#Intent;scheme=gojek;package=com.gojek.app;end;";
          } else if (action === "gopayMerchant") {
            window.location.href =
              "intent://home#Intent;scheme=gopaymerchant;package=com.gojek.gopaymerchant;end;";
          } else if (action === "close") {
            swal.close();
          }
        });
      };

      if (navigator.clipboard) {
        if (window.isSecureContext) {
          navigator.clipboard
            .writeText(secureBRI)
            .then(() =>
              showQRCode("\nNomor Rekening telah tersalin. Jika ingin manual")
            )
            .catch(() =>
              showQRCode("\nGagal menyalin, silakan salin secara manual.")
            );
        } else {
          navigator.clipboard
            .writeText(secureBRI)
            .then(() =>
              showQRCode("\nNomor Rekening telah tersalin. Jika ingin manual")
            )
            .catch(() =>
              showQRCode("\nGagal menyalin, silakan salin secara manual.")
            );
        }
      } else {
        showQRCode("\nSilakan salin secara manual.");
      }
    }
  });
}

const style = document.createElement("style");
style.textContent = `
.qr-modal {
max-width: 95vw !important;
}
.qr-modal .swal-content {
margin: 1em auto;
text-align: center;
}
.qr-modal img {
object-fit: contain;
display: block;
margin: 0 auto;
}
`;
document.head.appendChild(style);

// const menuItems = {
//     IndomieGoreng: {
//         name: "Indomie Goreng",
//         price: 8000,
//         qty: 0,
//         description: "Indomie Goreng dengan telur dan bumbu Indomie"
//     },
//      // Add more menu items here
// };

let menuItems = {};

async function loadMenu() {
  try {
    const idon =
      "Vm0wd2QyUXlVWGxXYTFwT1ZsZFNXVll3WkRSV1JsbDNXa1JTVjJKSGVEQmFSV2hyVm14S2MyTkVRbFZXYlUweFZtcEJlRmRIVmtkWApiRnBPWW0xb1VWZFdaRFJaVjAxNFdraEdVZ3BpUmxwWVdXeFZkMlZHV25STlZGSlVUV3N4TlZaSGRITmhVWEJUWWxaS2QxWnRkRmRaClZrNVhWMjVTYkZJelVsVlVWbFV4VTFaYWRHUkdaRlphTTBKd1ZteGFkMWRXV25STlZGSnJDbUpXV25wV01qVkxXVlpLUjFOc1ZsVlcKTTJoTVZqQmFWMlJGTlZaa1JuQldWMFZLVlZkWGRHOVJNbEY0VjJ4b1RsWkZTbkpEYXpGRlZtNXdWMDFxVmxCV01HUkxWbXhrYzJGRwpWbGNLWWtoQmVsWnRjRWRWTVZsNFYyNU9ZVkl5YUZOV01GWkxaV3hrVjFwRVFsTmhlbFpUVlVaUmQxQlJQVDA9";
    const acumalaka = "MTI=";

    let acuacumalaka = idon;
    for (let i = 0; i < atob(acumalaka); i++) {
      acuacumalaka = atob(acuacumalaka);
    }

    const response = await fetch(acuacumalaka);
    if (!response.ok) throw new Error("Gagal memuat menu");

    const data = await response.json();
    menuItems = data;
    renderMenu();
  } catch (error) {
    console.error("Error:", error.message);
    swal("Gagal", "Tidak dapat memuat menu.", "error");
  }
}

let userData = {
  name: "",
  address: "",
  className: "",
};

document.addEventListener("DOMContentLoaded", function () {
  loadUserData();
  renderMenu();
  updateOrderSummary();
  checkStoreStatus();
});

function updatejam() {
  let now = new Date();

  let userLang = navigator.language || navigator.userLanguage;
  let isIndonesian = userLang.toLowerCase() === "id-id";

  let dayNames = isIndonesian
    ? ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
  let monthNames = isIndonesian
    ? [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ]
    : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

  let dayOfWeek = dayNames[now.getDay()];
  let month = monthNames[now.getMonth()];
  let timeFormatted = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  document.getElementById("jam").innerHTML = `
               <p class="jam">${dayOfWeek}, ${now.getDate()} ${month} ${now.getFullYear()}</p>
               <p class="jam">${timeFormatted}</p>
           `;
}

setInterval(updatejam, 1000);

updatejam();

function loadUserData() {
  try {
    userData.name = DOMPurify.sanitize(
      sessionStorage.getItem("userName") || ""
    );
    userData.address = DOMPurify.sanitize(
      sessionStorage.getItem("userAddress") || ""
    );
    userData.className = DOMPurify.sanitize(
      sessionStorage.getItem("userClass") || ""
    );

    if (!userData.name) {
      swal(
        "Terjadi kesalahan",
        "Silakan coba lagi, data user tidak ditemukan",
        "error"
      ).then(() => {
        window.location.href = "index.html";
      });
      return;
    }

    const userInfoHTML = `
            <p><strong>Nama:</strong> ${userData.name}</p>
            ${
              userData.address
                ? `<p><strong>Alamat:</strong> ${userData.address}</p>`
                : ""
            }
            ${
              userData.className
                ? `<p><strong>Kelas:</strong> ${userData.className}</p>`
                : ""
            }
        `;
    document.getElementById("userInfo").innerHTML = userInfoHTML;
  } catch (error) {
    console.error("Error loading user data:", error);
    swal("Terjadi kesalahan", "Silakan coba lagi", "error").then(() => {
      window.location.href = "index.html";
    });
  }
}

function renderMenu() {
  let menuHTML = "";

  const sortedMenu = Object.entries(menuItems).sort((a, b) =>
    a[1].name.localeCompare(b[1].name)
  );

  for (let [key, item] of sortedMenu) {
    menuHTML += `
      <div class="menu-item" data-name="${item.name.toLowerCase()}">
          <div class="menu-item-info">
              <div class="menu-item-name">${item.name}</div>
              <div class="menu-item-price">Rp ${item.price.toLocaleString()}</div>
              <div class="menu-item-description">${item.description}</div>
          </div>
          <div class="quantity-control">
              <button class="qty-btn" onclick="changeQty('${key}', -1)" ${
      item.qty === 0 ? "disabled" : ""
    }>-</button>
              <span class="qty-display" id="${key}Qty">${item.qty}</span>
              <button class="qty-btn" onclick="changeQty('${key}', 1)">+</button>
          </div>
      </div>
    `;
  }

  document.getElementById("menuList").innerHTML = menuHTML;
}

function changeQty(item, amount) {
  const newQty = menuItems[item].qty + amount;
  if (newQty >= 0) {
    menuItems[item].qty = newQty;
    renderMenu();
    updateOrderSummary();
  } else {
    swal("Jumlah pesanan tidak valid", "Silakan coba lagi", "error");
  }
}

function updateOrderSummary() {
  let totalPrice = 0;
  let hasItems = false;

  for (let key in menuItems) {
    if (menuItems[key].qty > 0) {
      totalPrice += menuItems[key].price * menuItems[key].qty;
      hasItems = true;
    }
  }

  document.getElementById(
    "totalPrice"
  ).innerText = `Total: Rp ${totalPrice.toLocaleString()}`;
  document.getElementById("orderButton").disabled = !hasItems;
  document.getElementById("orderSummary").classList.toggle("visible", hasItems);
}

function processOrder() {
  try {
    let orderText = `*Pesanan Baru*\n\n`;
    orderText += `Nama: ${userData.name}\n`;
    if (userData.address) orderText += `Alamat: ${userData.address}\n`;
    if (userData.className) orderText += `Kelas: ${userData.className}\n\n`;

    orderText += `*Detail Pesanan:*\n`;
    let totalPrice = 0;

    for (let key in menuItems) {
      if (menuItems[key].qty > 0) {
        const subtotal = menuItems[key].price * menuItems[key].qty;
        totalPrice += subtotal;
        orderText += `${menuItems[key].name} x ${
          menuItems[key].qty
        } = Rp ${subtotal.toLocaleString()}\n`;
      }
    }

    orderText += `\n*Total: Rp ${totalPrice.toLocaleString()}*`;
    orderText += `\n\n*Waktu Pesan: ${new Date().toLocaleString("id-ID")}*`;

    const encrypt = atob(securityConfig.phoneNumber);
    const whatsappUrl = `https://wa.me/${encrypt}?text=${encodeURIComponent(
      orderText
    )}`;

    swal({
      title: "Simpan Nota?",
      text: "Apakah Anda ingin menyimpan nota pesanan?",
      icon: "info",
      buttons: ["Tidak", "Simpan"],
    }).then((willSave) => {
      if (willSave) {
        const date = new Date();
        const fileName = `nota-${date.getDate().toString().padStart(2, "0")}${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}${date.getFullYear()}.txt`;

        const blob = new Blob([orderText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();

        swal(
          "Pesanan berhasil",
          "Nota Anda telah disimpan dan kami akan segera memproses pesanan Anda.",
          "success"
        );
      } else {
        swal(
          "Pesanan berhasil",
          "Silakan tunggu konfirmasi dari kami",
          "success"
        );
      }

      window.open(whatsappUrl, "_blank");
    });
  } catch (error) {
    console.error("Error processing order:", error);
    swal("Terjadi kesalahan", "Silakan coba lagi", "error");
  }
}

function filterMenu() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const sanitizeRegex = /^[a-zA-Z\s]*$/;

  if (searchInput && !sanitizeRegex.test(searchInput)) {
    swal(
      "Malicious Activity Detected",
      "Your input contains invalid symbols.",
      "error"
    );
    return;
  }

  const sanitizedInput = DOMPurify.sanitize(searchInput);

  const menuItems = document.querySelectorAll(".menu-item");
  let found = false;

  menuItems.forEach((item) => {
    const itemName = item
      .querySelector(".menu-item-name")
      .innerText.toLowerCase();
    if (itemName.includes(sanitizedInput)) {
      item.style.display = "flex";
      found = true;
    } else {
      item.style.display = "none";
    }
  });

  let menuList = document.getElementById("menuList");
  let notFoundMessage = document.getElementById("notFoundMessage");

  if (!found) {
    if (!notFoundMessage) {
      notFoundMessage = document.createElement("div");
      notFoundMessage.id = "notFoundMessage";
      notFoundMessage.style.textAlign = "center";
      notFoundMessage.style.marginTop = "10px";
      menuList.appendChild(notFoundMessage);
    }
    const encodedQuery = encodeURIComponent(sanitizedInput);
    const privasi = atob(securityConfig.phoneNumber);
    notFoundMessage.innerHTML = `
    <p>Tidak ada menu tersebut, ingin request makanan tersebut? <br>
    <a href="https://wa.me/${privasi}?text=Saya+ingin+request+menu+${encodedQuery}" 
       target="_blank" 
       id="whatsappLink"
       rel="noopener noreferrer"
       style="color: green; text-decoration: none; font-weight: bold;">
        Chat di WhatsApp
    </a></p>
`;

    const whatsappLink = document.getElementById("whatsappLink");
    if (whatsappLink) {
      whatsappLink.addEventListener("click", function (event) {
        event.preventDefault();
        swal(
          "Terima kasih",
          "Request Anda akan segera kami proses",
          "success"
        ).then(() => {
          window.open(whatsappLink.href, "_blank");
        });
      });
    }
  } else {
    if (notFoundMessage) {
      notFoundMessage.remove();
    }
  }
}

function checkStoreStatus() {
  const now = new Date();
  const hour = now.getHours();
  const storeStatus = document.getElementById("storeStatus");

  if (hour >= 7 && hour < 16) {
    storeStatus.textContent = "Buka";
    storeStatus.className = "store-status open";
  } else {
    storeStatus.textContent = "Tutup";
    storeStatus.className = "store-status closed";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "PrintScreen" ||
      event.key === "F12" ||
      (event.ctrlKey && event.shiftKey && event.key === "S")
    ) {
      swal(
        "Terjadi kesalahan",
        "Tidak diperbolehkan mengambil screenshot atau membuka console",
        "error"
      );
      console.log(
        "Tidak diperbolehkan mengambil screenshot atau membuka console"
      );
      event.preventDefault();
    }
  });
  loadMenu();
});
