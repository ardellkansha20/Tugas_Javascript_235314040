document.addEventListener("DOMContentLoaded", function () { 
    // Menunggu hingga halaman sepenuhnya dimuat sebelum menjalankan kode

    const submitBtn = document.getElementById("submitBtn"); 
    // Mengambil elemen tombol submit dari HTML

    const choicesContainer = document.getElementById("choicesContainer"); 
    // Mengambil elemen container untuk pilihan

    const selectionContainer = document.getElementById("selectionContainer"); 
    // Mengambil elemen container untuk hasil pemilihan

    submitBtn.addEventListener("click", function () { 
        // Menambahkan event listener pada tombol submit

        const nameInput = document.getElementById("name"); 
        // Mengambil input nama dari HTML

        const quantityInput = document.getElementById("quantity"); 
        // Mengambil input jumlah pilihan dari HTML

        const name = nameInput.value.trim(); 
        // Mengambil nilai input nama dan menghapus spasi di awal & akhir

        const quantity = parseInt(quantityInput.value); 
        // Mengambil nilai input jumlah pilihan dan mengonversi ke integer

        if (!name || isNaN(quantity) || quantity < 1) { 
            // Mengecek apakah input nama kosong atau jumlah tidak valid
            alert("Harap isi nama dan jumlah pilihan dengan benar.");
            return; 
            // Menghentikan eksekusi jika input tidak valid
        }

        nameInput.readOnly = true; 
        quantityInput.readOnly = true; 
        // Membuat input nama dan jumlah tidak bisa diubah setelah dikonfirmasi

        submitBtn.style.display = "none"; 
        // Menyembunyikan tombol submit setelah diklik

        choicesContainer.innerHTML = ""; 
        selectionContainer.innerHTML = ""; 
        // Mengosongkan container pilihan dan container hasil seleksi

        let optionsArray = []; 
        // Menyimpan ID input pilihan

        for (let i = 1; i <= quantity; i++) { 
            // Loop untuk membuat input pilihan sesuai jumlah yang dimasukkan

            const div = document.createElement("div"); 
            // Membuat elemen div untuk setiap pilihan

            const label = document.createElement("label"); 
            label.textContent = `Pilihan ${i} :`; 
            // Membuat label untuk input pilihan

            const input = document.createElement("input"); 
            input.type = "text"; 
            input.placeholder = `Teks Pilihan ${i}`; 
            input.id = `choice${i}`; 
            // Membuat input teks untuk memasukkan pilihan

            div.appendChild(label); 
            div.appendChild(input); 
            // Menambahkan label dan input ke dalam div

            choicesContainer.appendChild(div); 
            // Menambahkan div ke dalam container pilihan

            optionsArray.push(input.id); 
            // Menyimpan ID input dalam array untuk referensi selanjutnya
        }

        const confirmBtn = document.createElement("button"); 
        confirmBtn.textContent = "OK"; 
        confirmBtn.classList.add("btn", "btn-success"); 
        confirmBtn.id = "confirmBtn"; 
        // Membuat tombol konfirmasi untuk melanjutkan ke tahap pemilihan

        choicesContainer.appendChild(confirmBtn); 
        // Menambahkan tombol konfirmasi ke dalam container pilihan

        confirmBtn.addEventListener("click", function () { 
            // Menambahkan event listener ke tombol konfirmasi

            let allFilled = optionsArray.every(id => document.getElementById(id).value.trim() !== ""); 
            // Mengecek apakah semua input pilihan sudah diisi

            if (!allFilled) { 
                alert("Harap isi semua pilihan sebelum melanjutkan.");
                return; 
                // Jika ada input kosong, hentikan proses dan tampilkan alert
            }

            optionsArray.forEach(id => document.getElementById(id).readOnly = true); 
            // Membuat input pilihan tidak bisa diedit setelah dikonfirmasi

            confirmBtn.remove(); 
            // Menghapus tombol konfirmasi setelah diklik

            generateSelection(name, quantity, optionsArray); 
            // Memanggil fungsi untuk membuat pilihan seleksi
        });
    });

    function generateSelection(name, quantity, optionsArray) { 
        // Fungsi untuk menampilkan pilihan seleksi setelah konfirmasi

        selectionContainer.innerHTML = "<h3>Pilihan :</h3>"; 
        // Menambahkan judul ke container pilihan

        optionsArray.forEach((id) => { 
            // Loop melalui setiap pilihan yang telah dimasukkan

            const radioDiv = document.createElement("div"); 
            // Membuat div untuk setiap pilihan radio button

            const radio = document.createElement("input"); 
            radio.type = "radio"; 
            radio.name = "option"; 
            radio.value = document.getElementById(id).value; 
            // Membuat radio button untuk setiap pilihan

            const label = document.createElement("label"); 
            label.textContent = ` ${document.getElementById(id).value}`; 
            // Membuat label untuk radio button

            radioDiv.appendChild(radio); 
            radioDiv.appendChild(label); 
            selectionContainer.appendChild(radioDiv); 
            // Menambahkan radio button dan label ke dalam container pilihan
        });

        const finalOkBtn = document.createElement("button"); 
        finalOkBtn.textContent = "Submit"; 
        finalOkBtn.classList.add("btn", "btn-success"); 
        finalOkBtn.id = "finalOkBtn"; 
        // Membuat tombol submit untuk memilih pilihan

        selectionContainer.appendChild(finalOkBtn); 
        // Menambahkan tombol submit ke dalam container pilihan

        finalOkBtn.addEventListener("click", function () { 
            // Menambahkan event listener ke tombol submit

            const selectedOption = document.querySelector('input[name="option"]:checked'); 
            // Mendapatkan pilihan yang dipilih oleh pengguna

            if (!selectedOption) { 
                alert("Harap pilih salah satu pilihan sebelum melanjutkan.");
                return; 
                // Jika tidak ada yang dipilih, tampilkan alert
            }

            const selectedText = selectedOption.value; 
            // Mengambil teks pilihan yang dipilih

            const choicesText = optionsArray.map(id => document.getElementById(id).value).join(", "); 
            // Menggabungkan semua pilihan dalam satu string

            const resultDiv = document.createElement("div"); 
            resultDiv.style.border = "1px solid black"; 
            resultDiv.style.padding = "10px"; 
            resultDiv.style.marginTop = "10px"; 
            // Membuat div untuk menampilkan hasil pemilihan

            resultDiv.innerHTML = ` 
                Hallo, nama saya <b>${name}</b>, saya mempunyai sejumlah <b>${quantity}</b> pilihan yaitu <b>${choicesText}</b>, dan saya memilih <b>${selectedText}</b>.
            `; 
            // Menambahkan teks hasil pilihan ke dalam div

            selectionContainer.appendChild(resultDiv); 
            // Menambahkan div hasil ke dalam container pilihan
        });
        finalOkBtn.remove(); 
    }
});
