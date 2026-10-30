/* =========================================================
   DATA
   ========================================================= */
const menuHarian = [
    { name: "Nasi Ayam Bakar", desc: "Ayam bakar bumbu kecap, nasi putih, lalapan", price: "Rp 25.000", day: "Minggu" },
    { name: "Nasi Rendang", desc: "Rendang daging sapi empuk, nasi putih, sambal", price: "Rp 30.000", day: "Senin" },
    { name: "Nasi Ikan Goreng", desc: "Ikan goreng crispy, nasi putih, sambal terasi", price: "Rp 22.000", day: "Selasa" },
    { name: "Nasi Ayam Geprek", desc: "Ayam geprek pedas level 1-5, nasi putih", price: "Rp 23.000", day: "Rabu" },
    { name: "Nasi Soto Ayam", desc: "Soto ayam kuah bening, nasi putih, kerupuk", price: "Rp 20.000", day: "Kamis" },
    { name: "Nasi Pecel Lele", desc: "Lele goreng crispy, nasi putih, sambal pecel", price: "Rp 20.000", day: "Jumat" },
    { name: "Nasi Bebek Goreng", desc: "Bebek goreng, nasi putih, sambal hijau", price: "Rp 35.000", day: "Sabtu" }
];

const menuItems = [
    {
        name: "Nasi Ayam Bakar",
        desc: "Ayam bakar bumbu kecap, nasi putih, lalapan segar",
        price: "Rp 25.000",
        category: "rice",
        img: "images/nasi-ayam-bakar.webp"
    },
    {
        name: "Nasi Rendang",
        desc: "Rendang daging sapi empuk, nasi putih, sambal",
        price: "Rp 30.000",
        category: "rice",
        img: "images/nasi-rendang.webp"
    },
    {
        name: "Soto Ayam",
        desc: "Kuah bening segar, ayam suwir, kerupuk",
        price: "Rp 20.000",
        category: "soup",
        img: "images/soto-ayam.webp"
    },
    {
        name: "Es Teh Manis",
        desc: "Teh manis segar, es batu, lemon slice",
        price: "Rp 8.000",
        category: "drink",
        img: "images/ice-tea.webp"
    },
    {
        name: "Jus Alpukat",
        desc: "Alpukat segar, susu kental manis, es batu",
        price: "Rp 15.000",
        category: "drink",
        img: "images/avocado-juice.webp"
    },
    {
        name: "Nasi Geprek",
        desc: "Ayam geprek pedas, nasi putih, sambal bawang",
        price: "Rp 23.000",
        category: "rice",
        img: "images/nasi-geprek.webp"
    }
];

/* =========================================================
   TANGGAL & JAM (dipanggil sekali, dipakai di mana-mana)
   ========================================================= */
const now = new Date();
const hariIni = now.getDay();     // 0 = Minggu, 1 = Senin, ... 6 = Sabtu
const jamSekarang = now.getHours();

/* =========================================================
   1. DAILY SPECIAL (Menu Hari Ini)
   ========================================================= */
(function renderDailySpecial() {
    const specialName = document.getElementById('special-name');
    const specialDesc = document.getElementById('special-desc');
    const specialPrice = document.getElementById('special-price');
    const dayLabel = document.querySelector('.day-label');

    if (!specialName || !specialDesc || !specialPrice || !dayLabel) return;

    const menuHariIni = menuHarian[hariIni];
    if (!menuHariIni) return;

    specialName.textContent = menuHariIni.name;
    specialDesc.textContent = menuHariIni.desc;
    specialPrice.textContent = menuHariIni.price;
    dayLabel.textContent = menuHariIni.day;
})();

/* =========================================================
   2. MENU GRID + FILTER
   ========================================================= */
(function initMenu() {
    const menuGrid = document.querySelector('.menu-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!menuGrid || !filterButtons.length) return;

    let activeFilter = 'all';

    function renderMenu() {
        menuGrid.innerHTML = '';

        const filtered = activeFilter === 'all'
            ? menuItems
            : menuItems.filter(item => item.category === activeFilter);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.innerHTML = `
                <img src="${item.img}" alt="${item.name}" loading="lazy">
                <div class="card-body">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <span>${item.price}</span>
                </div>
            `;
            menuGrid.appendChild(card);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activeFilter = button.dataset.category;
            renderMenu();
        });
    });

    renderMenu();
})();

/* =========================================================
   3. STATUS BUKA / TUTUP
   ========================================================= */
(function initStatus() {
    const statusIndicator = document.getElementById('status-indicator');
    if (!statusIndicator) return;

    const hariKerja = hariIni >= 1 && hariIni <= 5;    // Senin - Jumat
    const hariWeekend = hariIni === 0 || hariIni === 6; // Sabtu - Minggu

    const buka = (hariKerja && jamSekarang >= 8 && jamSekarang < 21) ||
                 (hariWeekend && jamSekarang >= 9 && jamSekarang < 22);

    if (buka) {
        statusIndicator.textContent = '🟢 Buka Sekarang';
        statusIndicator.style.color = '#4a7c59';
    } else {
        statusIndicator.textContent = '🔴 Tutup';
        statusIndicator.style.color = '#e74c3c';
    }
})();

/* =========================================================
   4. COUNTER ANIMATION (pakai requestAnimationFrame)
   ========================================================= */
(function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    if (!counters.length) return;

    function animateCounter(el, target, suffix = '', duration = 1500) {
        const start = performance.now();

        function step(currentTime) {
            const progress = Math.min((currentTime - start) / duration, 1);

            // Easing: easeOutQuad biar melambat di akhir
            const eased = 1 - (1 - progress) * (1 - progress);
            const value = Math.floor(eased * target);

            el.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = parseInt(counter.dataset.target, 10);

            // Guard: kalau data-target kosong / NaN, skip
            if (isNaN(target)) {
                observer.unobserve(counter);
                return;
            }

            const suffix = counter.dataset.suffix || '+';
            animateCounter(counter, target, suffix);

            observer.unobserve(counter);
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
})();

/* =========================================================
   5. HAMBURGER MENU (mobile)
   ========================================================= */
(function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Auto-close pas klik link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Close pas klik di luar menu
    document.addEventListener('click', e => {
        if (!navLinks.classList.contains('active')) return;
        if (navLinks.contains(e.target) || hamburger.contains(e.target)) return;
        navLinks.classList.remove('active');
    });
})();