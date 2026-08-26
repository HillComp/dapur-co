const menuHarian = [
    { name: "Nasi Ayam Bakar", desc: "Ayam bakar bumbu kecap, nasi putih, lalapan", price: "Rp 25.000", day: "Minggu" },
    { name: "Nasi Rendang", desc: "Rendang daging sapi empuk, nasi putih, sambal", price: "Rp 30.000", day: "Senin" },
    { name: "Nasi Ikan Goreng", desc: "Ikan goreng crispy, nasi putih, sambal terasi", price: "Rp 22.000", day: "Selasa" },
    { name: "Nasi Ayam Geprek", desc: "Ayam geprek pedas level 1-5, nasi putih", price: "Rp 23.000", day: "Rabu" },
    { name: "Nasi Soto Ayam", desc: "Soto ayam kuah bening, nasi putih, kerupuk", price: "Rp 20.000", day: "Kamis" },
    { name: "Nasi Pecel Lele", desc: "Lele goreng crispy, nasi putih, sambal pecel", price: "Rp 20.000", day: "Jumat" },
    { name: "Nasi Bebek Goreng", desc: "Bebek goreng goreng, nasi putih, sambal hijau", price: "Rp 35.000", day: "Sabtu" },
];

const hariIni = new Date().getDay();
const menuHariIni = menuHarian[hariIni];

document.getElementById('special-name').textContent = menuHariIni.name;
document.getElementById('special-desc').textContent = menuHariIni.desc;
document.getElementById('special-price').textContent = menuHariIni.price;
document.querySelector('.day-label').textContent = menuHariIni.day;

const menuItems = [
    {
        name: "Nasi Ayam Bakar",
        desc: "Ayam bakar bumbu kecap, nasi putih, lalapan segar",
        price: "Rp 25.000",
        category: "rice",
        img: "images/nasi-ayam-bakar.jpg"
    },
    {
        name: "Nasi Rendang",
        desc: "Rendang daging sapi empuk, nasi putih, sambal",
        price: "Rp 30.000",
        category: "rice",
        img: "images/nasi-rendang.jpg"
    },
    {
        name: "Soto Ayam",
        desc: "Kuah bening segar, ayam suwir, kerupuk",
        price: "Rp 20.000",
        category: "soup",
        img: "images/soto-ayam.jpg"
    },
    {
        name: "Es Teh Manis",
        desc: "Teh manis segar, es batu, lemon slice",
        price: "Rp 8.000",
        category: "drink",
        img: "images/ice-tea.jpg"
    },
    {
        name: "Jus Alpukat",
        desc: "Alpukat segar, susu kental manis, es batu",
        price: "Rp 15.000",
        category: "drink",
        img: "images/avocado-juice.jpg"
    },
    {
        name: "Nasi Geprek",
        desc: "Ayam geprek pedas, nasi putih, sambal bawang",
        price: "Rp 23.000",
        category: "rice",
        img: "images/nasi-geprek.jpg"
    },
];

const menuGrid = document.querySelector('.menu-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
let activeFilter = 'all';

function renderMenu() {
    menuGrid.innerHTML = '';

    const filtered = activeFilter === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeFilter);

    filtered.forEach(function(item) {
        const card = document.createElement('div');
        card.className = 'menu-card';

        card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <span>${item.price}</span>
        </div>
        `;

        menuGrid.appendChild(card);
    });
}

filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        activeFilter = button.dataset.category;
        renderMenu();
    });
});

renderMenu();

const jam = new Date().getHours();
const statusIndicator = document.getElementById('status-indicator');

const hariSekarang = new Date().getDay();
const hariKerja = hariSekarang >= 1 && hariSekarang <= 5; // Senin sampai Jumat
const hariWeekend = hariSekarang === 0 || hariSekarang === 6; // Sabtu dan Minggu

let buka = false;

if (hariKerja && jam >= 8 && jam < 21) {
    buka = true;
} else if (hariWeekend && jam >= 9 && jam < 22) {
    buka = true;
}

if (buka) {
    statusIndicator.textContent = '🟢 Buka Sekarang';
    statusIndicator.style.color = '#4a7c59';
} else {
    statusIndicator.textContent = '🔴 Tutup';
    statusIndicator.style.color = '#e74c3c';
}

const counters = document.querySelectorAll('.counter-number');

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            let current = 0;

            const increment = Math.ceil(target / 100);
            
            const timer = setInterval(function() {
                current += increment;

                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            }, 20);
            observer.unobserve(counter);
        }
    });
});

counters.forEach(function(counter) {
    observer.observe(counter);
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});