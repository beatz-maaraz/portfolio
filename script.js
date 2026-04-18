// Typing Effect
const text = ["Web Developer", "JavaScript Learner", "Creative Thinker", "UI/UX Designer"];
let i = 0, j = 0;
let currentText = "", isDeleting = false;

function type() {
    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    if (i < text.length) {
        if (!isDeleting && j <= text[i].length) {
            currentText = text[i].substring(0, j++);
        } else if (isDeleting && j >= 0) {
            currentText = text[i].substring(0, j--);
        }

        typingElement.innerText = currentText;

        let typeSpeed = isDeleting ? 50 : 150;

        if (!isDeleting && j === text[i].length) {
            typeSpeed = 1500; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % text.length;
            typeSpeed = 500; // Pause before new word
        }
        setTimeout(type, typeSpeed);
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    type();
    
    // Navbar Scroll Effect
    const navbar = document.querySelector("header");
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle("active");
        });
    }

    // Scroll Reveal Animation via Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Roll Animation for Cards (Requested in TODO.md)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('roll');
        });
        
        card.addEventListener('animationend', function() {
            this.classList.remove('roll'); // Remove class so it can be re-triggered
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('roll'); 
        });
    });
});

// Smooth Scroll Function
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        // close mobile menu if open
        const navLinks = document.querySelector(".nav-links");
        if(navLinks && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
        }

        section.scrollIntoView({ behavior: "smooth" });
    }
}

// Form Submission
function submitForm() {
    const btn = document.querySelector('.submit-btn');
    if (!btn) return false;
    
    const originalText = btn.innerText;
    btn.innerText = "Sending...";
    
    setTimeout(() => {
        alert("Message sent successfully!");
        btn.innerText = originalText;
        const form = document.querySelector('form');
        if (form) form.reset();
    }, 1000);
    
    return false;
}
