function animateNav(params) {
    'use strict';
    
    const nav = document.querySelector('.header .nav .content');
    // let navWide = document.querySelector('.content-wrapper.nav-wrapper.nav_wide');
    // let header = document.querySelector('.header');
    
    document.addEventListener('scroll', () => {
        let scrolled = window.pageYOffset;
        if (scrolled > nav.clientHeight) {
            nav.classList.remove('wide');
            nav.classList.add('narrow');
        } else {
            nav.classList.remove('narrow');
            nav.classList.add('wide');
        }
    });
}

document.addEventListener('DOMContentLoaded', animateNav);