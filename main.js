// Fade-in Animation with Stagger
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
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
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
