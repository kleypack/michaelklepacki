// Ensures the script runs after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', function() {

    // Get all sections with an ID and their corresponding subnav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.subnav-timeline-item');

    // Throttle function
    function throttle(fn, wait) {
        let lastTime = 0;
        return function() {
            const now = new Date().getTime();
            if (now - lastTime >= wait) {
                fn();
                lastTime = now;
            }
        };
    }

    function updateNav() {
        let scrollPosition = window.scrollY;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= (sectionTop - 50) && scrollPosition < (sectionTop + sectionHeight)) {
                // Remove 'active-anchor' from all nav links
                navLinks.forEach(link => link.classList.remove('active-anchor'));

                // Add 'active-anchor' to the corresponding nav link
                const activeLink = document.querySelector(`.subnav-timeline a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active-anchor');
                }
            }
        });
    }

    // Attach the throttled scroll event listener
    window.addEventListener('scroll', throttle(updateNav, 500)); // Throttle with 100ms delay

    // Add the 'active-anchor' class to a clicked nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Delay the active class change to avoid interference with scrolling
            setTimeout(() => {
                // Remove 'active-anchor' from all nav links
                navLinks.forEach(link => link.classList.remove('active-anchor'));

                // Add 'active-anchor' to the clicked link
                link.classList.add('active-anchor');
            }, 200); // Adjust the delay as needed (200ms here)
        });
    });

});
