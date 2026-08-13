var CONFIG = {
  REFERRAL_URL: "https://app.flambra.com/?ref=D3D5653DFF&cadastro=1",
  SITE_NAME: "Flambra",
  SITE_URL: "https://tarcisioprogramador.github.io/flambra",
  INSTAGRAM: "https://www.instagram.com/flambra.app/",
  LINKEDIN: "https://br.linkedin.com/company/flambra",
  WHATSAPP: "https://wa.me/5562999999999"
};
function trackCTA(label) {
  if (typeof gtag === "function") gtag("event", "cta_click", {event_label: label});
  if (typeof dataLayer !== "undefined") dataLayer.push({event: "cta_click", cta_label: label});
}
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("[data-cta]").forEach(function(el) {
    el.addEventListener("click", function() { trackCTA(el.getAttribute("data-cta")); });
  });
  document.querySelectorAll("a[data-referral]").forEach(function(el) {
    el.href = CONFIG.REFERRAL_URL;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
});
