document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menangani klik pada item menu sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-nav a');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            // Di sini Anda bisa menambahkan logika untuk memuat konten yang sesuai
        });
    });

    // Fungsi untuk menampilkan waktu real-time
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('clock').textContent = `Admin | ${timeString}`;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Panggil sekali untuk menginisialisasi

    // Fungsi untuk animasi penghitung dan lingkaran progres
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // Durasi animasi dalam milidetik
        const step = target / (duration / 16); // 60 FPS
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            el.textContent = Math.round(current);
            
            // Animasi lingkaran progres
            const progressRing = el.closest('.stat-card').querySelector('.progress-ring__circle');
            const radius = progressRing.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const offset = circumference - (current / target) * circumference;
            progressRing.style.strokeDashoffset = offset;

            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Mulai animasi penghitung ketika elemen muncul di viewport
    const counterElements = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counterElements.forEach(el => observer.observe(el));

    // Fungsi untuk menambahkan aktivitas baru
    function addNewActivity(activity) {
        const list = document.querySelector('.activity-list');
        const li = document.createElement('li');
        li.innerHTML = `
            <i class="${activity.icon}"></i>
            <div>
                <p>${activity.text}</p>
                <small>${activity.time}</small>
            </div>
        `;
        list.prepend(li);
        // Trigger reflow
        li.offsetHeight;
        li.style.opacity = '1';
        li.style.transform = 'translateY(0)';
    }

    // Simulasi aktivitas baru setiap 5 detik
    setInterval(() => {
        const activities = [
            { icon: 'fas fa-user-plus', text: 'Siswa baru terdaftar', time: 'Baru saja' },
            { icon: 'fas fa-upload', text: 'Materi baru diunggah', time: 'Baru saja' },
            { icon: 'fas fa-comment', text: 'Komentar baru pada materi', time: 'Baru saja' }
        ];
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        addNewActivity(randomActivity);
    }, 5000);

    function toggleBackToTopButton() {
        const button = document.getElementById("backToTopBtn");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            button.classList.add("show");
        } else {
            button.classList.remove("show");
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    window.addEventListener('scroll', toggleBackToTopButton);
    document.getElementById("backToTopBtn").addEventListener('click', scrollToTop);
});

function toggleScrollButtons() {
    const topBtn = document.getElementById("backToTopBtn");
    const bottomBtn = document.getElementById("scrollToBottomBtn");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop > 20) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }

    if (scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 20) {
        bottomBtn.classList.add("show");
    } else {
        bottomBtn.classList.remove("show");
    }
}

window.addEventListener('scroll', toggleScrollButtons);
window.addEventListener('load', toggleScrollButtons);