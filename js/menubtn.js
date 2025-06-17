let hideTimeout;
    const menubar = document.querySelector('.menubar-bottom');

    function showMenubar() {
      // Show the menubar
      menubar.style.display = 'flex';

      // Clear any existing timeout
      clearTimeout(hideTimeout);

      // Set new timeout to hide after 2 seconds
      hideTimeout = setTimeout(() => {
        menubar.style.display = 'none';
      }, 2000);
    }

    // Listen for scroll events
    window.addEventListener('scroll', showMenubar);