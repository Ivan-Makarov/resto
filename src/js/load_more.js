function loadMore() {
    const menu = document.querySelector('.menu-list');
    const items = [...menu.querySelectorAll('.menu-list--item')];
    const loadMore = document.querySelector('.btn.load-more');

    let showCount = 8;
    
    function showItems() {
        items.forEach((item, index) => {
            item.style.display = index < showCount ? 'block' : 'none'
        })
        if (items.length <= showCount) {
            loadMore.style.display = 'none';
        }
    }

    showItems();

    loadMore.addEventListener('click', () => {
        showCount += 8;
        showItems();
    })
}

document.addEventListener('DOMContentLoaded', loadMore);