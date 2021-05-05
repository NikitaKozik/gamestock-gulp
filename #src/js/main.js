function toggleDropdown() {

    const toggleButton = document.querySelector('.open-dropdown'),
          toggleContainer = document.querySelector('.dropdown-container');

    toggleButton.addEventListener('click', (e) => {
        toggleContainer.classList.toggle('show');
        toggleButton.classList.toggle('active');
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
