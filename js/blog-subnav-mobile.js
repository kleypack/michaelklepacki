if (matchMedia('only screen and (max-width: 760px)').matches) {

    // set limit
    const limit = 6;

    // define blog subnav container
    const blogNav = document.querySelector('.blog-nav');

    // add mobile class to blogNav
    blogNav.classList.add('mobile');

    // define all dates in subnav
    document.querySelectorAll('.blog-nav ol li a').forEach(postDate => {
        // grab the inner text of each link and trim any whitespace
        const dateText = postDate.innerText.trim();

        // limit the length of each post date
        if (dateText.length > limit) {
            postDate.innerText = `${dateText.slice(0, limit)}`
        };
    });

}