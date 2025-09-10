// =====================
// Fade-in Animation with Stagger
// =====================
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    if (entry.target.classList.contains('stagger')) {
      const siblings = Array.from(entry.target.parentElement.children);
      siblings.forEach((el, index) => {
        if (el.classList.contains('stagger')) {
          el.style.transitionDelay = `${index * 150}ms`;
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    } else {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));


// =====================
// Smooth Scroll for Internal Links
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});


// =====================
// Scroll-to-Top Button
// =====================
const scrollBtn = document.createElement('button');
scrollBtn.innerText = "↑";
scrollBtn.id = "scrollToTop";
document.body.appendChild(scrollBtn);

scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "20px";
scrollBtn.style.right = "20px";
scrollBtn.style.display = "none";
scrollBtn.style.padding = "10px 15px";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.backgroundColor = "#5bc0de";
scrollBtn.style.color = "#fff";
scrollBtn.style.fontSize = "18px";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
scrollBtn.style.zIndex = "999";

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// =====================
// Typing Effect in Intro Section
// =====================
const typedText = document.querySelector(".intro h1");
if (typedText) {
  const text = typedText.innerText;
  typedText.innerText = "";
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      typedText.innerText += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    }
  }
  typeWriter();
}


// =====================
// Dark Mode Toggle
// =====================
const darkModeBtn = document.createElement('button');
darkModeBtn.innerText = "🌙";
darkModeBtn.id = "darkModeToggle";
document.body.appendChild(darkModeBtn);

darkModeBtn.style.position = "fixed";
darkModeBtn.style.bottom = "20px";
darkModeBtn.style.left = "20px";
darkModeBtn.style.padding = "10px";
darkModeBtn.style.borderRadius = "50%";
darkModeBtn.style.border = "none";
darkModeBtn.style.cursor = "pointer";
darkModeBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
darkModeBtn.style.zIndex = "999";

// Load preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
});


// =====================
// Navbar Highlight on Scroll
// =====================
const sections = document.querySelectorAll("section, div.container[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 60;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-link");
    }
  });
});


// =====================
// Project Card Hover Tilt
// =====================
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 20).toFixed(2);
    const rotateY = ((centerX - x) / 20).toFixed(2);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});


// =====================
// Lazy Loading Images
// =====================
const lazyImages = document.querySelectorAll("img");

const lazyObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => {
  lazyObserver.observe(img);
});


// =====================
// Interactive Background (subtle gradient animation)
// =====================
const body = document.body;
let hue = 200;

function animateBackground() {
  hue = (hue + 0.2) % 360;
  body.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 95%), hsl(${(hue + 60) % 360}, 70%, 95%))`;
  requestAnimationFrame(animateBackground);
}

animateBackground();
