let now = new Date();
let greeting;

// Set time parameters
if(
	now.getHours() >= 04 && now.getHours() < 12
) {
	greeting = "Good morning";
} else if (
	now.getHours() >= 12 && now.getHours() < 18
) {
	greeting = "Good afternoon";
} else if (
	now.getHours() >= 18 && now.getHours() <= 23
) {
	greeting = "Good evening";
} else if (
	now.getHours() >= 00 && now.getHours() < 04
) {
	greeting = "Hello, fellow night owl";
} else {
	greeting = "Hello";
}


// Display greeting in h1 on page
let greetingHeading = document.getElementById("custom-greeting");

greetingHeading.textContent = greeting;
