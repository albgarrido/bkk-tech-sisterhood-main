'use strict';

/**
 * BKK Tech Sisterhood - Main Interaction Script
 * Handles: Mobile Menu, Scroll Reveal, Smooth Scrolling, and Sticker Parallax
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('#menu-toggle');
    const mobileMenu = document.querySelector('#mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu a');

    const toggleMenu = () => {
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active');
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.add('hidden');
            mobileMenu?.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
            }
        }
    });


    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header?.classList.add('shadow-md');
        } else {
            header?.classList.remove('shadow-md');
        }
    };
    window.addEventListener('scroll', handleScroll);


    // --- Smooth Scrolling for Navigation ---
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80; // Buffer for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Reveal on Scroll Animation ---
    const revealElements = document.querySelectorAll('section, article, .group');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };

    // Add necessary CSS class for reveal
    revealElements.forEach(el => el.classList.add('reveal'));
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once initially to show elements in view


    // --- Interactive Sticker Parallax ---
    // Subtle movement for "kawaii stickers" based on mouse position
    const stickers = document.querySelectorAll('.sticker');
    
    if (window.innerWidth > 768) { // Only on desktop
        window.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth) - 0.5;
            const mouseY = (e.clientY / window.innerHeight) - 0.5;

            stickers.forEach((sticker, index) => {
                const depth = (index + 1) * 10;
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                
                // Offset the existing floating animation transform
                sticker.style.setProperty('transform', `translate(${moveX}px, ${moveY}px) rotate(${(index % 2 === 0 ? -5 : 10)}deg)`, 'important');
            });
        });
    }


    // --- Google Form Link Logging (CTA Tracking) ---
    const applicationLinks = document.querySelectorAll('a[href*="forms.google.com"]');
    applicationLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Sisterhood Application Link clicked');
        });
    });

});