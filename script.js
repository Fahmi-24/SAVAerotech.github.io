/*==================== Toggle Icon Navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

/*==================== Scroll Sections Active Link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (document.querySelector('header nav a[href*=' + id + ']')) {
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                }
            });
        }
    });

    /*==================== Sticky Navbar ====================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== Remove Toggle Icon & Navbar on Click ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

/*==================== Scroll Reveal (Animasi Muncul) ====================*/
const sr = ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: true
});

// Animasi dari Atas
sr.reveal('.home-content, .heading, .sub-heading', { origin: 'top' });

// Animasi dari Bawah (Termasuk Video & Tabel Analisis)
sr.reveal('.about-img, .services-container, .specs-grid, .drone-showcase, .video-grid, .analysis-container', { origin: 'bottom' });

// Animasi Kiri & Kanan
sr.reveal('.home-content h1, .about-content', { origin: 'left' });
sr.reveal('.hero-visual', { origin: 'right' });


/*==================== MISSION CALCULATOR LOGIC (Excel Integrated) ====================*/
function calculateMission() {
    // 1. INPUT DARI USER (Mengambil status dari HTML)
    const mode = document.getElementById('flightMode').value;
    const solarOn = document.getElementById('solarSwitch').checked;

    // 2. DATA DARI EXCEL (Konstanta Perhitungan)
    // Kapasitas efektif baterai untuk mencapai endurance target
    // Rumus Balik: 307 Watt * (78 menit / 60) ≈ 400 Wh
    const batteryWh = 400; 
    
    // Konsumsi Daya (Watt) sesuai Excel
    const powerHover = 3192; // Sangat boros
    const powerCruise = 307; // Mode Hemat (Fixed Wing)
    const solarOutput = 90;  // Kontribusi Panel Surya

    // 3. LOGIKA PERHITUNGAN
    let currentPower = 0;
    
    // Cek Mode Terbang
    if (mode === 'hover') {
        currentPower = powerHover;
        // Di mode hover, solar panel dianggap tidak terlalu signifikan mengurangi beban besar
    } else {
        currentPower = powerCruise;
    }

    // Cek Status Solar Panel (Hanya mengurangi beban jika aktif & mode cruise)
    if (solarOn && mode === 'cruise') {
        currentPower = currentPower - solarOutput;
    }

    // Hitung Estimasi Waktu (Jam -> Menit)
    // Rumus Fisika: Waktu = Kapasitas Baterai / Daya Terpakai
    let flightTime = (batteryWh / currentPower) * 60;

    // 4. TAMPILKAN HASIL KE LAYAR
    // Update Angka Power (Watt)
    document.getElementById('resPower').innerText = Math.round(currentPower) + " W";
    
    // Update Angka Waktu (Menit) & Ganti Warna
    const timeElement = document.getElementById('resTime');
    const timeValue = Math.round(flightTime);
    
    timeElement.innerText = timeValue + " Min";
    
    // Logika Warna: Merah jika < 15 menit, Cyan jika aman
    if (timeValue < 15) {
        timeElement.style.color = "#ff2a6d"; // Merah
        timeElement.style.textShadow = "0 0 10px #ff2a6d";
    } else {
        timeElement.style.color = "#00f2ea"; // Cyan
        timeElement.style.textShadow = "0 0 10px #00f2ea";
    }
}

// Jalankan fungsi sekali saat website pertama kali dibuka
// Agar angka di kalkulator tidak kosong
calculateMission();