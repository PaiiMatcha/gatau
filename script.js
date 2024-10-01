const artikelData = [
    {
        judul: "Prestasi Gemilang Tim Robotik Sekolah",
        isi: "Tim robotik sekolah kita berhasil meraih juara pertama dalam kompetisi nasional...",
        gambar: "https://source.unsplash.com/random/300x200/?robot"
    },
    {
        judul: "Program Literasi Baru: Membaca untuk Masa Depan",
        isi: "Sekolah kita meluncurkan program literasi baru yang bertujuan untuk meningkatkan minat baca siswa...",
        gambar: "https://source.unsplash.com/random/300x200/?library"
    },
    {
        judul: "Kunjungan Edukatif ke Museum Sains",
        isi: "Minggu lalu, siswa kelas 8 mengikuti kunjungan edukatif ke Museum Sains Nasional...",
        gambar: "https://source.unsplash.com/random/300x200/?museum"
    },
    {
        judul: "Perayaan Hari Kartini di Sekolah",
        isi: "Dalam rangka memperingati Hari Kartini, sekolah kita mengadakan berbagai lomba dan pentas seni...",
        gambar: "https://source.unsplash.com/random/300x200/?celebration"
    },
    {
        judul: "Prestasi Siswa dalam Olimpiade Matematika",
        isi: "Tiga siswa kita berhasil meraih medali emas dalam Olimpiade Matematika tingkat provinsi...",
        gambar: "https://source.unsplash.com/random/300x200/?mathematics"
    },
    {
        judul: "Pelatihan Guru: Metode Pembelajaran Inovatif",
        isi: "Para guru mengikuti pelatihan intensif tentang metode pembelajaran inovatif untuk meningkatkan kualitas pengajaran...",
        gambar: "https://source.unsplash.com/random/300x200/?teacher"
    }
];

const galeriData = [
    "https://source.unsplash.com/random/400x300/?school",
    "https://source.unsplash.com/random/400x300/?classroom",
    "https://source.unsplash.com/random/400x300/?students",
    "https://source.unsplash.com/random/400x300/?laboratory",
    "https://source.unsplash.com/random/400x300/?sports",
    "https://source.unsplash.com/random/400x300/?graduation"
];

let artikelDitampilkan = 3;

function tampilkanArtikel() {
    const daftarArtikel = document.getElementById('daftar-artikel');
    daftarArtikel.innerHTML = '';
    
    for (let i = 0; i < artikelDitampilkan && i < artikelData.length; i++) {
        const artikel = artikelData[i];
        const artikelElemen = document.createElement('div');
        artikelElemen.classList.add('artikel');
        
        artikelElemen.innerHTML = `
            <img src="${artikel.gambar}" alt="${artikel.judul}">
            <div class="artikel-content">
                <h3>${artikel.judul}</h3>
                <p>${artikel.isi.substring(0, 100)}...</p>
                <button onclick="bacaSelengkapnya('${artikel.judul}')" class="btn">Baca Selengkapnya</button>
            </div>
        `;
        
        daftarArtikel.appendChild(artikelElemen);
    }

    if (artikelDitampilkan >= artikelData.length) {
        document.getElementById('muat-lagi').style.display = 'none';
    }
}

function muatLebihBanyak() {
    artikelDitampilkan += 3;
    tampilkanArtikel();
}

function bacaSelengkapnya(judul) {
    const artikel = artikelData.find(a => a.judul === judul);
    if (artikel) {
        alert(`${artikel.judul}\n\n${artikel.isi}`);
    }
}

function tampilkanGaleri() {
    const galeriContainer = document.getElementById('galeri-container');
    galeriData.forEach(gambar => {
        const galeriItem = document.createElement('div');
        galeriItem.classList.add('galeri-item');
        galeriItem.innerHTML = `<img src="${gambar}" alt="Kegiatan Sekolah">`;
        galeriContainer.appendChild(galeriItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    const subjectCards = document.querySelectorAll('.subject-card');
    subjectCards.forEach(card => {
        card.addEventListener('click', () => {
            const subject = card.getAttribute('data-subject');
            alert(`Anda memilih mata pelajaran: ${subject}`);
        });
    });

    document.getElementById('muat-lagi').addEventListener('click', muatLebihBanyak);

    document.getElementById('kontak-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pesan Anda telah terkirim. Terima kasih!');
        this.reset();
    });

    tampilkanArtikel();
    tampilkanGaleri();

    // Kode baru untuk selector tema
    const themeOptions = document.querySelectorAll('.theme-option');
    const root = document.documentElement;

    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            root.setAttribute('data-theme', theme);
            
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // Menyimpan preferensi tema ke localStorage
            localStorage.setItem('selectedTheme', theme);
        });
    });

    // Mengambil tema yang tersimpan dari localStorage
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
        document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');
    } else {
        // Set tema default jika tidak ada yang tersimpan
        root.setAttribute('data-theme', 'gradient');
        document.querySelector('[data-theme="gradient"]').classList.add('active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.subject-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cari elemen h3 terdekat dalam kartu mata pelajaran yang sama
            const subjectCard = this.closest('.subject-card');
            const subjectName = subjectCard ? subjectCard.querySelector('h3').textContent : 'tidak diketahui';
            
            // Hapus baris ini jika Anda tidak ingin menampilkan alert sama sekali
            // alert('Anda memilih mata pelajaran: ' + subjectName);
            
            // Arahkan pengguna ke halaman yang dituju
            window.location.href = this.getAttribute('href');
        });
    });
});
