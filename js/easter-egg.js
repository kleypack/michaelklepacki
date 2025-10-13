// CONSTANTS - NAVIGATION ELEMENTS
const secret = document.getElementById("secret");
const secretTrigger = document.getElementById("secretTrigger");

// Toggle between showing and hiding the hidden secret when toggle is clicked

function toggleHidden() {

	if (secret.classList.contains("hidden")) {
		// show
		secret.classList.remove("hidden");
	} else {
		// show
		secret.classList.add("hidden");
	}

}



