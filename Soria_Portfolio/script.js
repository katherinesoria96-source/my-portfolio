// ---------- Mobile menu ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- Dark mode ----------
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  }
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
applyTheme(savedTheme || "dark");

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ---------- Typing effect ----------
const roles = ["Computer Science Student", "Aspiring Web Developer", "Java & Python Learner", "Creative Coder"]; // edit these
const typingEl = document.getElementById("typing");
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const current = roles[roleIndex];
  typingEl.textContent = current.substring(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

// ---------- Animate skill bars when visible ----------
const fills = document.querySelectorAll(".fill");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + "%";
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
fills.forEach((f) => skillObserver.observe(f));

// ---------- Project / Certificate filter ----------
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".card");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const filter = tab.dataset.filter;
    cards.forEach((card) => {
      card.classList.toggle("hide", filter !== "all" && card.dataset.type !== filter);
    });
  });
});

// ---------- Highlight active nav link on scroll ----------
const sections = document.querySelectorAll("main section");
const links = document.querySelectorAll("#navLinks a");

window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  links.forEach((link) =>
    link.classList.toggle("active", link.getAttribute("href") === "#" + current)
  );
});

// ---------- Contact form validation ----------
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  statusEl.className = "form-status";

  if (!name || !email || !message) {
    statusEl.textContent = "Please fill in all fields.";
    statusEl.classList.add("error");
    return;
  }
  if (!emailOk) {
    statusEl.textContent = "Please enter a valid email address.";
    statusEl.classList.add("error");
    return;
  }

  // Demo only: opens the visitor's email app with the message filled in.
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\n- " + name + " (" + email + ")");
  window.location.href = "mailto:Katherinesoria96@gmail.com?subject=" + subject + "&body=" + body;

  statusEl.textContent = "Thanks, " + name + "! Your email app should open now.";
  statusEl.classList.add("success");
  form.reset();
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();