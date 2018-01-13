$('.dishes-slider').owlCarousel({
    // loop:true,
    margin: 60,
    nav: false,
    dots: true,
    dotsContainer: '.dishes-slider-pages',
    // navContainer: '.main-catalogue-slider-nav',
    // navText: ['', ''],
    autoplay: false,
    // autoplayTimeout: 5000,
    // autoplaySpeed: 1000,
    responsive:{
        0:{
            items:4
        },
        950:{
            items:4
        },
        1200:{
            items:4
        }
    }
})
