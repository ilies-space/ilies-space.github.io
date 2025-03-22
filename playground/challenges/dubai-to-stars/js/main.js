// Main JavaScript file for Dubai to the Stars

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-background');
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Destination cards hover effect
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Form validation
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const destination = document.getElementById('destination').value;
        const departure = document.getElementById('departure').value;
        const seatClass = document.getElementById('class').value;
        
        if (!destination || !departure || !seatClass) {
            alert('Please fill in all fields');
            return;
        }
        
        // Demo booking confirmation
        alert('Booking submitted successfully! This is a demo prototype.');
    });
}

// Initialize date picker with minimum date as today
const departureInput = document.getElementById('departure');
if (departureInput) {
    const today = new Date().toISOString().split('T')[0];
    departureInput.min = today;
}

// Demo data for destinations
const destinations = [
    {
        id: 'iss',
        name: 'International Space Station',
        price: 500000,
        duration: '3 days',
        description: 'Experience life in low Earth orbit'
    },
    {
        id: 'lunar',
        name: 'Lunar Hotel',
        price: 1000000,
        duration: '7 days',
        description: 'Luxury accommodations on the Moon'
    },
    {
        id: 'mars',
        name: 'Mars Station',
        price: 2000000,
        duration: '30 days',
        description: 'First human settlement on Mars'
    }
];

// Populate destination select with demo data
const destinationSelect = document.getElementById('destination');
if (destinationSelect) {
    destinations.forEach(dest => {
        const option = document.createElement('option');
        option.value = dest.id;
        option.textContent = `${dest.name} - $${dest.price.toLocaleString()}`;
        destinationSelect.appendChild(option);
    });
}

// Demo space miles system
let spaceMiles = 0;

function addSpaceMiles(amount) {
    spaceMiles += amount;
    updateSpaceMilesDisplay();
}

function updateSpaceMilesDisplay() {
    const milesDisplay = document.querySelector('.space-miles');
    if (milesDisplay) {
        milesDisplay.textContent = `Space Miles: ${spaceMiles}`;
    }
}

// Initialize space miles
addSpaceMiles(1000); // Demo initial miles

// Demo launch countdown timer
function updateLaunchCountdown() {
    const countdownElement = document.querySelector('.launch-countdown');
    if (!countdownElement) return;

    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 7); // Demo launch in 7 days

    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = "LAUNCHED!";
    }
}

const countdownInterval = setInterval(updateLaunchCountdown, 1000);
updateLaunchCountdown();

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    nav.insertBefore(menuToggle, navLinks);
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}); 