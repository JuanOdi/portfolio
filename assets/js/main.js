// Header: add a border/shadow once the page is scrolled
const header = document.querySelector('.js-header');

const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const toggle = document.querySelector('.js-menu-toggle');
const nav = document.querySelector('.js-nav');

toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    });
});

// Reveal on scroll, staggered within the same parent
const reveals = document.querySelectorAll('.reveal');

reveals.forEach((el) => {
    const siblings = el.parentElement.querySelectorAll(':scope > .reveal');
    if (siblings.length > 1) {
        const index = Array.prototype.indexOf.call(siblings, el);
        el.style.setProperty('--reveal-delay', `${(index % 4) * 0.08}s`);
    }
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

reveals.forEach((el) => observer.observe(el));

// Footer year
document.querySelector('.js-year').textContent = new Date().getFullYear();
