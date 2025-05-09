document.addEventListener('DOMContentLoaded', () => {
const hamburger = document.querySelector('.hamburger');
const closeMenu = document.querySelector('.close-menu');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && closeMenu && mobileMenu) {
hamburger.addEventListener('click', () => {
mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
mobileMenu.classList.remove('active');
});
}

const dropdowns = document.querySelectorAll(".dropdown, .mobile-dropdown");

dropdowns.forEach((dropdown) => {
const dropdownToggle = dropdown.querySelector("a");

dropdownToggle.addEventListener("click", function (event) {
event.preventDefault();

dropdowns.forEach((item) => {
if (item !== dropdown) {
item.classList.remove("active");
}
});

dropdown.classList.toggle("active");
});
});

const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
const observer = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('active');
observer.unobserve(entry.target);
}
});
}, { threshold: 0.2 });

fadeElements.forEach(section => observer.observe(section));
}

const animateNumber = (stat) => {
const target = +stat.dataset.value;
const start = +stat.dataset.start || 0;
const speed = 100;
const increment = Math.ceil((target - start) / speed);
let current = start;

const updateNumber = () => {
if (current < target) {
current += increment;
stat.innerText = current + '+';
setTimeout(updateNumber, 75);
} else {
stat.innerText = target + '+';
}
};

updateNumber();
};

const stats = document.querySelectorAll('.stat');
if (stats.length > 0) {
stats.forEach(stat => animateNumber(stat));
}

const form = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

if (form) {
form.addEventListener('submit', function (event) {
event.preventDefault();
clearErrors();

if (validateForm()) {
submitForm();
}
});

function validateForm() {
let valid = true;
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

if (!name.value.trim()) {
displayError('nameError', 'Please enter your name.');
valid = false;
}

if (!validateEmail(email.value.trim())) {
displayError('emailError', 'Please enter a valid email address.');
valid = false;
}

if (!message.value.trim()) {
displayError('messageError', 'Please enter a message.');
valid = false;
}

return valid;
}

function validateEmail(email) {
const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return re.test(email);
}

function displayError(elementId, message) {
const errorElement = document.getElementById(elementId);
if (errorElement) {
errorElement.textContent = message;
}
}

function clearErrors() {
document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

function submitForm() {
const formData = new FormData(form);

fetch('https://script.google.com/macros/s/AKfycbwwm5r8dpLKkzWUa9IheQkecDMa0qxpIMCIRjMF-YTprOkVQHKHC3RlCdVG-N7NS9vjpw/exec', { 
method: 'POST',
body: formData
})
.then(response => response.text())
.then(data => {
if (formResponse) {
formResponse.textContent = 'Message sent successfully!';
formResponse.classList.remove('error');
formResponse.classList.add('success');
form.reset();
}
})
.catch(error => {
if (formResponse) {
formResponse.textContent = 'There was an error submitting your message.';
formResponse.classList.remove('success');
formResponse.classList.add('error');
}
});
}
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
faqItems.forEach(item => {
item.addEventListener('click', () => {
item.classList.toggle('active');

faqItems.forEach(otherItem => {
if (otherItem !== item) {
otherItem.classList.remove('active');
}
});
});
});
}
});
