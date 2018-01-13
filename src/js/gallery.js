function gallery() {
    const body = document.querySelector('.body');
    const images = [...document.querySelectorAll('.gallery--img')];
    const imgFull = document.querySelector('.img-gallery--img');
    const gallery = document.querySelector('.img-gallery');
    const prev = document.querySelector('.img-gallery--prev');
    const next = document.querySelector('.img-gallery--next');

    function activateGalleryImgs(img, index) {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            gallery.classList.add('active');
            imgFull.src = img.src;
            imgFull.dataset.index = index;
            body.classList.add('noscroll')
        })
    }

    images.forEach(activateGalleryImgs)

    function toPrev() {
        imgFull.dataset.index = imgFull.dataset.index == 0 ? images.length - 1 : parseInt(imgFull.dataset.index) - 1;  
        imgFull.src = images[imgFull.dataset.index].src;
    }

    function toNext() {
        imgFull.dataset.index = imgFull.dataset.index == images.length - 1 ? 0 : parseInt(imgFull.dataset.index) + 1;
        imgFull.src = images[imgFull.dataset.index].src;
    }

    prev.addEventListener('click', toPrev);
    next.addEventListener('click', toNext);

    function changeImgWithKB(e) {
        if (e.key === "ArrowLeft") {
            toPrev();
        } else if (e.key === "ArrowRight") {
            toNext()
        }
    }

    document.addEventListener('keydown', changeImgWithKB)
}

document.addEventListener('DOMContentLoaded', gallery);

function closeModal() {
    const modals = [...document.querySelectorAll('.modal')];
    const body = document.querySelector('.body');

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                body.classList.remove('noscroll');
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', closeModal);