const dropdownMenu = document.getElementById('dropdownMenu');

function setActive(menuIcon) {
    menuIcon.classList.toggle('animation');
    dropdownMenu.classList.toggle('active');
    const buttonRect = menuIcon.getBoundingClientRect();
    dropdownMenu.style.top = `${buttonRect.bottom + window.scrollY}px`;
}