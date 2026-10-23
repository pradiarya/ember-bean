const menuButton = document.querySelector(".menu-toggle");
const menuOverlay = document.querySelector("#site-menu");
function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuOverlay.classList.toggle("is-open", open);
  menuOverlay.inert = !open;
  document.body.classList.toggle("menu-open", open);
  if (open) menuOverlay.querySelector("a").focus();
  else menuButton.focus();
}
menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});
menuOverlay.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
  }
});
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
function selectTab(tab, moveFocus = false) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((panel) => {
    panel.hidden = panel.id !== tab.getAttribute("aria-controls");
  });
  if (moveFocus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    selectTab(tabs[nextIndex], true);
  });
});
const galleryDialog = document.querySelector(".gallery-dialog");
const dialogTitle = document.querySelector("#gallery-dialog-title");
const dialogArt = document.querySelector(".dialog-art");
document.querySelectorAll(".gallery-image").forEach((imageButton) => {
  imageButton.addEventListener("click", () => {
    const illustration = imageButton.querySelector("svg").cloneNode(true);
    illustration.removeAttribute("aria-labelledby");
    illustration.setAttribute("aria-label", imageButton.getAttribute("aria-label").replace("Enlarge illustration of ", ""));
    const illustrationTitle = illustration.querySelector("title");
    if (illustrationTitle) illustrationTitle.removeAttribute("id");
    dialogTitle.textContent = imageButton.getAttribute("aria-label").replace("Enlarge illustration of ", "");
    dialogArt.replaceChildren(illustration);
    galleryDialog.showModal();
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => {
  galleryDialog.close();
});
galleryDialog.addEventListener("click", (event) => {
  if (event.target === galleryDialog) galleryDialog.close();
});
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
