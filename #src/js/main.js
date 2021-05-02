function toggleMobNav() {

    const navButton = document.getElementsByClassName('navigation-hamburger')[0],
        nav = document.querySelector('.nav-links');

    navButton.addEventListener('click', (e) => {
        nav.classList.toggle('mobile');

        e.preventDefault();
        e.stopPropagation();

    });

    window.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !navButton.contains(e.target)) {
            nav.classList.remove('mobile');
            e.preventDefault();
            e.stopPropagation();
        }
    });




}

toggleMobNav();