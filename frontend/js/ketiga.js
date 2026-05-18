// Interaktivitas ARDC Website

// Pesan Selamat Datang
function showMessage() {
    alert("Selamat datang di ARDC (Automation and Robotics Development Center) 🚀");
}

// Notifikasi Form (Fallback)
function contactAlert() {
    alert("Pesan Anda telah diterima! Tim ARDC akan segera menghubungi Anda.");
}

// Fungsi Buka WhatsApp
function openWhatsApp() {
    const phone = "6281234567890"; // Ganti dengan nomor WA ARDC yang asli
    const message = encodeURIComponent("Halo ARDC, saya tertarik untuk memesan Trainer PLC/HMI. Bisa minta info lebih lanjut?");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Fungsi Modal Pemesanan
function openOrderModal() {
    document.getElementById('contact-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop scroll saat modal buka
}

function closeOrderModal() {
    document.getElementById('contact-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Auto Scroll functionality
let isAutoScrolling = true;

function startAutoScroll() {
    // Auto-scroll dinonaktifkan agar posisi scroll tetap mengikuti user.
    isAutoScrolling = false;
}

// Scroll Reveal Animation (Intersection Observer)
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    // Ambil semua elemen dengan class 'reveal'
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

});