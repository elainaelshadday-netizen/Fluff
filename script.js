function sapa() {
    alert("Welcome to Fluff! Little Clips, Big Happiness ♡");
}

// KERANJANG FLUFF
let keranjang = [];

function tambahKeranjang(namaProduk, harga) {

    let produk = keranjang.find(item => item.nama === namaProduk);

    if (produk) {
        produk.jumlah++;
    } else {
        keranjang.push({
            nama: namaProduk,
            harga: harga,
            jumlah: 1
        });
    }

    tampilkanKeranjang();

    alert(namaProduk + " berhasil ditambahkan ke keranjang! 💗");
}

// TAMPILKAN KERANJANG
function tampilkanKeranjang() {

    let daftar = document.getElementById("daftar-keranjang");
    let total = 0;

    if (keranjang.length === 0) {
        daftar.innerHTML = "<p>Belum ada produk yang dipilih.</p>";
    } else {

        daftar.innerHTML = "";

        keranjang.forEach((produk, index) => {

            let subtotal = produk.harga * produk.jumlah;
            total += subtotal;

            daftar.innerHTML += `
                <div class="item-keranjang">
                    <p><strong>${produk.nama}</strong></p>
                    <p>Rp${produk.harga.toLocaleString("id-ID")} x ${produk.jumlah}</p>

                    <button onclick="ubahJumlah(${index}, -1)">−</button>
                    <button onclick="ubahJumlah(${index}, 1)">+</button>
                    <p>Subtotal: Rp${subtotal.toLocaleString("id-ID")}</p>
                </div>
            `;
        });
    }

    document.getElementById("total-harga").innerText =
        "Total: Rp" + total.toLocaleString("id-ID");
}

// TAMBAH / KURANG JUMLAH
function ubahJumlah(index, perubahan) {

    keranjang[index].jumlah += perubahan;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    tampilkanKeranjang();
}

// CHECKOUT WHATSAPP
function checkoutWhatsApp() {

    if (keranjang.length === 0) {
        alert("Keranjang kamu masih kosong! 🍓");
        return;
    }

    let nomorOwner = "6281262635953";

    let pesan = "Halo Kak! Saya ingin memesan produk Fluff 💗\n\n";
    let total = 0;

    keranjang.forEach(produk => {

        let subtotal = produk.harga * produk.jumlah;
        total += subtotal;

        pesan += produk.nama + "\n";
        pesan += "Jumlah: " + produk.jumlah + "\n";
        pesan += "Subtotal: Rp" + subtotal.toLocaleString("id-ID") + "\n\n";
    });

    pesan += "Total Pesanan: Rp" + total.toLocaleString("id-ID");
    pesan += "\n\nTerima kasih! 💗";

    let link = "https://wa.me/" + nomorOwner + "?text=" + encodeURIComponent(pesan);

    window.open(link, "_blank");
}