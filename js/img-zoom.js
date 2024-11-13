document.addEventListener('DOMContentLoaded', function() {
    // Create the fullscreen viewer element
    const zoomOverlay = document.createElement('div');
    zoomOverlay.classList.add('zoom-overlay');

    // Create an image element inside the fullscreen viewer
    const zoomedImage = document.createElement('img');
    zoomOverlay.appendChild(zoomedImage);

    // Append the fullscreen viewer to the body
    document.body.appendChild(zoomOverlay);

    // Function to open the fullscreen viewer
    function openZoomOverlay(src) {
        zoomedImage.src = src;
        zoomOverlay.style.display = 'flex'; // Show the fullscreen viewer
        document.body.classList.add('no-scroll'); // Add class to prevent scrolling
    }

    // Function to close the fullscreen viewer
    function closeZoomOverlay() {
        zoomOverlay.style.display = 'none'; // Hide the fullscreen viewer
        document.body.classList.remove('no-scroll'); // Remove class to prevent scrolling
    }

    // Attach click event listeners to all images with the 'fullscreen-image' class
    const images = document.querySelectorAll('.zoomable');
    images.forEach(image => {
        image.addEventListener('click', function() {
            openZoomOverlay(this.src);
        });
    });

    // Close the fullscreen viewer when the user clicks on the fullscreen image
    zoomOverlay.addEventListener('click', closeZoomOverlay);
});