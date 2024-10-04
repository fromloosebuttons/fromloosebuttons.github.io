const dropdownMenu = document.getElementById('dropdownMenu');

function setActive(menuIcon) {
    menuIcon.classList.toggle('animation');
    dropdownMenu.classList.toggle('active');
    const buttonRect = menuIcon.getBoundingClientRect();
    dropdownMenu.style.top = `${buttonRect.bottom + window.scrollY}px`;
}

let scrollSpeed = 1;
let autoScrollInterval;
let userScrollTimeout;

const scrollContainer = document.querySelector('.scroll-container');

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        scrollContainer.scrollLeft += scrollSpeed;

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 100) {
            reorderRight();
        }
    }, 10);
}

function detectManualScroll() {
    clearInterval(autoScrollInterval);

    if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 100) {
        reorderRight();
    } else if (scrollContainer.scrollLeft <= 50) {
        reorderLeft();
    }

    clearTimeout(userScrollTimeout);
    userScrollTimeout = setTimeout(() => {
        startAutoScroll();
    }, 100);
}

function reorderRight() {
    const firstItem = scrollContainer.firstElementChild;

    const clone = firstItem.cloneNode(true);
    scrollContainer.appendChild(clone);

    scrollContainer.scrollLeft -= firstItem.offsetWidth;
    
    scrollContainer.removeChild(firstItem);
}

function reorderLeft() {
    const lastItem = scrollContainer.lastElementChild;

    const clone = lastItem.cloneNode(true);
    scrollContainer.insertBefore(clone, scrollContainer.firstElementChild);

    scrollContainer.scrollLeft += lastItem.offsetWidth;
    
    scrollContainer.removeChild(lastItem);
}

scrollContainer.addEventListener('wheel', detectManualScroll);
scrollContainer.addEventListener('touchstart', detectManualScroll);
scrollContainer.addEventListener('touchmove', detectManualScroll);

startAutoScroll();