/* mihriban.dev — etkileşimler */

/* ---------- Nav durumu (kaydırınca küçülme) ---------- */
const nav = document.getElementById("nav");

const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Mobil menü ---------- */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  burger.classList.toggle("open", isOpen);
  burger.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

/* ---------- Scroll ile görünme (reveal) ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

/* ---------- Yetenek barları ---------- */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty("--target", entry.target.dataset.level + "%");
        entry.target.classList.add("animate");
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll(".skill__fill").forEach((el) => skillObserver.observe(el));

/* ---------- Aktif menü bağlantısı ---------- */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav__link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { threshold: 0.45 }
);

sections.forEach((s) => sectionObserver.observe(s));

/* ---------- İletişim formu (mailto ile gönderim) ---------- */
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
const CONTACT_EMAIL = "mihribanuckuyulu.aukariyer@gmail.com";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !message) {
    note.textContent = "> Lütfen tüm alanları doldurun.";
    note.classList.add("error");
    return;
  }

  if (!emailOk) {
    note.textContent = "> Geçerli bir e-posta adresi girin.";
    note.classList.add("error");
    return;
  }

  note.classList.remove("error");
  note.textContent = "> E-posta uygulamanız açılıyor...";

  const subject = encodeURIComponent("Portfolyo iletişim: " + name);
  const body = encodeURIComponent(
    "Ad: " + name + "\nE-posta: " + email + "\n\n" + message
  );

  window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
  form.reset();
});
