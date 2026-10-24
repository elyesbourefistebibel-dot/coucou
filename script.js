// Adresse qui reçoit les demandes de devis
const CONTACT_EMAIL = "contact@duoclean.fr";

// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  })
);

// Ombre de l'en-tête au défilement
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Apparition progressive des blocs
const revealTargets = document.querySelectorAll(".card, .features li, .step, .faq details, .form");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// Formulaire de devis : vérifie les champs puis ouvre la messagerie
const form = document.getElementById("contact-form");
const status = form.querySelector(".form__status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let valid = true;

  form.querySelectorAll("[required]").forEach((field) => {
    const ok = field.value.trim() !== "" && field.checkValidity();
    field.classList.toggle("is-invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    status.textContent = "Merci de remplir correctement les champs obligatoires.";
    status.className = "form__status is-error";
    return;
  }

  const data = new FormData(form);
  const subject = `Demande de devis — ${data.get("service")}`;
  const body = [
    `Nom : ${data.get("nom")}`,
    `Téléphone : ${data.get("telephone") || "—"}`,
    `E-mail : ${data.get("email")}`,
    `Prestation : ${data.get("service")}`,
    "",
    data.get("message"),
  ].join("\n");

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  status.textContent = "Merci ! Votre messagerie s'ouvre pour envoyer la demande.";
  status.className = "form__status is-ok";
  form.reset();
});

form.querySelectorAll("input, select, textarea").forEach((field) =>
  field.addEventListener("input", () => field.classList.remove("is-invalid"))
);

// Année du pied de page
document.getElementById("year").textContent = new Date().getFullYear();
