// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.add('scrolled'); // Force keeping the scrolled styling or remove for transparency at top
    }
});

// Slider Logic for Grades Section
const panels = document.querySelectorAll('.grade-panel');
const prevBtn = document.getElementById('gradePrev');
const nextBtn = document.getElementById('gradeNext');
let currentIdx = 0;

function updateSlider() {
    panels.forEach((panel, i) => {
        panel.classList.toggle('active', i === currentIdx);
    });
}

if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentIdx = (currentIdx + 1) % panels.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIdx = (currentIdx - 1 + panels.length) % panels.length;
        updateSlider();
    });
}




// Simple Scroll Animation (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        faqItems.forEach(faq => {
            faq.classList.remove('active');
            faq.querySelector('.faq-answer').style.maxHeight = null;
        });
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            e.preventDefault();
            // Offset for fixed header
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Popup Form Logic
const popupOverlay = document.getElementById('enquiryPopup');
const openPopupBtns = document.querySelectorAll('.open-popup');
const closePopupBtn = document.getElementById('closePopup');

if (popupOverlay && openPopupBtns && closePopupBtn) {
    // Open popup
    openPopupBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close popup on close button
    closePopupBtn.addEventListener('click', () => {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close popup on clicking outside the card
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
