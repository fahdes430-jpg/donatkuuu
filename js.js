const btnPesan = document.getElementById('btnPesan');
const totalHargaSpan = document.getElementById('totalHarga');
const totalJumlahSpan = document.getElementById('totalJumlah');
const menuItems = document.querySelectorAll('.menu-item');

function hitungTotal() {
  let totalHarga = 0;
  let totalJumlah = 0;

  menuItems.forEach(item => {
    const harga = parseInt(item.dataset.harga);
    const jumlah = parseInt(item.querySelector('.jumlah-item').value) || 0;

    totalJumlah += jumlah;
    totalHarga += harga * jumlah;
  });

  totalJumlahSpan.textContent = totalJumlah;
  totalHargaSpan.textContent = "Rp " + totalHarga.toLocaleString("id-ID");
}

menuItems.forEach(item => {
  item.querySelector('.jumlah-item').addEventListener('input', hitungTotal);
});

btnPesan.addEventListener('click', () => {
  let pesan = [];
  let totalHarga = 0;
  let totalJumlah = 0;

  menuItems.forEach(item => {
    const rasa = item.dataset.rasa;
    const harga = parseInt(item.dataset.harga);
    const jumlah = parseInt(item.querySelector('.jumlah-item').value) || 0;

    if (jumlah > 0) {
      pesan.push(`${rasa} x ${jumlah}`);
      totalJumlah += jumlah;
      totalHarga += harga * jumlah;
    }
  });

  if (totalJumlah === 0) {
    alert("Silakan pilih minimal 1 donat.");
    return;
  }

  const pesanWA =
`Halo Donatku 🍩
Saya ingin memesan:

- ${pesan.join("\n- ")}

Total Donat: ${totalJumlah}
Total Harga: Rp ${totalHarga.toLocaleString("id-ID")}`;

  const urlWA = `https://wa.me/6282172600441?text=${encodeURIComponent(pesanWA)}`;
  window.open(urlWA, '_blank');
});
