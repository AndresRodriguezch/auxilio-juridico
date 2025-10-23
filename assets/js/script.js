// ==========================================
// ACTUALIZAR AÑO EN EL FOOTER
// ==========================================
document.getElementById("year").textContent = new Date().getFullYear();

// ==========================================
// MENÚ OFFCANVAS MÓVIL
// ==========================================

// Selección de elementos del DOM
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const menuOverlay = document.getElementById("menuOverlay");
const offcanvasMenu = document.getElementById("offcanvasMenu");
const menuLinks = document.querySelectorAll(".menu-link");
const body = document.body;

/**
 * Función para abrir el menú offcanvas
 * - Muestra el panel lateral
 * - Muestra el overlay oscuro
 * - Previene el scroll del body
 */
function openMenu() {
  offcanvasMenu.classList.add("show");
  menuOverlay.classList.remove("hidden");
  menuOverlay.classList.add("show");
  body.classList.add("menu-open");
}

/**
 * Función para cerrar el menú offcanvas
 * - Oculta el panel lateral
 * - Oculta el overlay oscuro
 * - Restaura el scroll del body
 */
function closeMenu() {
  offcanvasMenu.classList.remove("show");
  menuOverlay.classList.remove("show");
  menuOverlay.classList.add("hidden");
  body.classList.remove("menu-open");
}

// ==========================================
// EVENT LISTENERS DEL MENÚ
// ==========================================

// Abrir menú al hacer clic en el botón hamburguesa
menuToggle.addEventListener("click", openMenu);

// Cerrar menú al hacer clic en el botón X
menuClose.addEventListener("click", closeMenu);

// Cerrar menú al hacer clic en el overlay (fondo oscuro)
menuOverlay.addEventListener("click", closeMenu);

// Cerrar menú al hacer clic en cualquier enlace de navegación
menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Cerrar menú al presionar la tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && offcanvasMenu.classList.contains("show")) {
    closeMenu();
  }
});

// ==========================================
// SMOOTH SCROLL CON OFFSET PARA NAVBAR
// ==========================================

/**
 * Función para hacer scroll suave considerando la altura del navbar
 * @param {HTMLElement} target - Elemento al que se hará scroll
 */
function smoothScrollToElement(target) {
  // Obtener la altura del header (navbar)
  const header = document.querySelector("header");
  const headerHeight = header ? header.offsetHeight : 0;

  // Obtener la posición del elemento objetivo
  const targetPosition =
    target.getBoundingClientRect().top + window.pageYOffset;

  // Calcular la posición final considerando el offset del navbar (+ 20px de margen extra)
  const offsetPosition = targetPosition - headerHeight - 20;

  // Hacer scroll suave
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

// Aplicar smooth scroll a todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Evitar que se ejecute si es solo "#"
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        smoothScrollToElement(target);

        // Actualizar la URL sin hacer scroll (opcional)
        history.pushState(null, null, href);
      }
    }
  });
});
