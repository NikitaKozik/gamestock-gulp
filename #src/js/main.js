window.onload = () => {
//dropdown
function toggleDropdown() {

    const toggleButton = document.querySelector('.open-dropdown'),
          toggleContainer = document.querySelector('.dropdown');

    toggleButton.addEventListener('click', (e) => {
        toggleContainer.classList.toggle('show');
        toggleButton.classList.add('active');
        e.preventDefault();
        e.stopPropagation();
    });

    window.addEventListener('click', (e) => {
        if (!toggleContainer.contains(e.target) && !toggleButton.contains(e.target)) {
            toggleContainer.classList.remove('show');
            toggleButton.classList.remove('active');
            e.preventDefault();
            e.stopPropagation();
        }
    });

}

toggleDropdown();

//toggle mobile nav
function toggleMobileNav() {
    const toggleMobileNavButton = document.querySelector('.toggle-navigation'),
          navigation = document.querySelector('.links');

          toggleMobileNavButton.addEventListener('click', (e) => {
            navigation.classList.toggle('show');
            
            e.preventDefault();
        });

        window.addEventListener('click', (e) => {
            if (!navigation.contains(e.target) && !toggleMobileNavButton.contains(e.target)) {
                navigation.classList.remove('show');
                e.preventDefault();
            }
        });
}

toggleMobileNav();

//crop card title 

function cropTitle() {
    const cardTitle = document.querySelectorAll('.card-title');

    for(let i = 0; i < cardTitle.length; i++) {
        if(cardTitle[i].innerText.length > 60) {
            cardTitle[i].textContent =  cardTitle[i].innerText.substring(0,60) + '...';
        }
    }
}

cropTitle();

};