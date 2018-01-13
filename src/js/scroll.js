function smoothScrolltoAnchors() {
    'use strict';
    const menuBtns = [...document.querySelectorAll('[href^="#"]')];

    menuBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            $.scrollTo(e.target.getAttribute('href'), 500, {
                offset: -40
            })
        });
    })
}

document.addEventListener('DOMContentLoaded', smoothScrolltoAnchors);
