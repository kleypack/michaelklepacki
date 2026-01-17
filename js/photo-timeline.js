// Wait until the full HTML document has been parsed
// (so all .month sections, articles, and nav links exist)
document.addEventListener("DOMContentLoaded", () => {

    // Reference to the element in the nav that displays the current month (e.g. "Oct")
    const currentMonthEl = document.getElementById("current-month");

    // All month sections inside the galleries (e.g. <section class="month october">)
    const months = document.querySelectorAll(".month");

    // All year containers (e.g. <article id="2025">)
    const years = document.querySelectorAll("article[id]");

    // All navigation links that represent years (e.g. <a href="#2025">)
    const yearLinks = document.querySelectorAll(".year-link");

    // ------------------------------------------------------------
    // Build a lookup table:
    // {
    //   "2025": <a href="#2025">,
    //   "2024": <a href="#2024">,
    //   ...
    // }
    //
    // This avoids querying the DOM repeatedly later and
    // gives us constant-time access to a nav link by year ID.
    // ------------------------------------------------------------
    const yearLinkMap = {};
    yearLinks.forEach(link => {
        // Extract "2025" from href="#2025"
        const id = link.getAttribute("href")?.slice(1);
        if (id) yearLinkMap[id] = link;
    });

    // ------------------------------------------------------------
    // Create a single IntersectionObserver to handle:
    // - month visibility (to update the month label)
    // - year visibility (to highlight the active year link)
    //
    // The browser will call this callback whenever an observed
    // element crosses the observer’s "activation zone".
    // ------------------------------------------------------------
    const observer = new IntersectionObserver(
        (entries) => {

            // `entries` is an array of elements whose intersection
            // state has changed since the last callback
            entries.forEach(entry => {

                // Ignore elements that are leaving the viewport
                if (!entry.isIntersecting) return;

                // The element that just became "active"
                const el = entry.target;

                /* ====================================================
                   MONTH LOGIC
                   ==================================================== */

                // If the element is a month section
                if (el.classList.contains("month")) {

                    // Each month section has two classes:
                    // "month" and the actual month name ("october", "march", etc.)
                    // Find the class that is NOT "month"
                    const monthClass = [...el.classList]
                        .find(c => c !== "month");

                    if (monthClass) {
                        // Capitalize and shorten the month to 3 letters
                        // "october" → "Oct"
                        currentMonthEl.textContent =
                            monthClass.charAt(0).toUpperCase() +
                            monthClass.slice(1, 3);
                    }
                }

                /* ====================================================
                   YEAR LOGIC
                   ==================================================== */

                // If the element is a year container (<article id="2025">)
                if (el.tagName === "ARTICLE" && el.id) {

                    // Remove the active style from all year links
                    yearLinks.forEach(l =>
                        l.classList.remove("active-anchor")
                    );

                    // Add the active style to the matching year link
                    // using the precomputed lookup table
                    yearLinkMap[el.id]?.classList.add("active-anchor");
                }
            });
        },
        {
            // No custom scroll container; use the viewport
            root: null,

            // Shrink the top and bottom of the viewport by 50% each,
            // leaving a thin horizontal band in the middle.
            //
            // An element becomes "active" when it crosses
            // the vertical center of the screen.
            rootMargin: "-50% 0px -50% 0px",

            // Trigger as soon as ANY part of the element enters the zone
            threshold: 0
        }
    );

    // ------------------------------------------------------------
    // Start observing:
    // - every month section (for month label updates)
    // - every year article (for nav highlighting)
    // ------------------------------------------------------------
    months.forEach(m => observer.observe(m));
    years.forEach(y => observer.observe(y));
});
