document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Manejo del Menú Responsive Móvil
  // ==========================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Cerrar el menú al presionar cualquier enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 2. Navegación Suave (Smooth Scroll)
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================
  // 3. Módulo Interactivo de Salsas (Tabs)
  // ==========================================
  const sauceTabs = document.querySelectorAll('.sauce-tab-btn');
  const saucePanels = document.querySelectorAll('.sauce-category-panel');

  if (sauceTabs.length > 0) {
    sauceTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remover estado activo de todos los botones y paneles
        sauceTabs.forEach(btn => btn.classList.remove('active'));
        saucePanels.forEach(panel => panel.classList.remove('active'));

        // Activar el botón seleccionado
        tab.classList.add('active');

        // Mostrar el panel correspondiente al ID seleccionado
        const targetCategory = tab.getAttribute('data-category');
        const targetPanel = document.getElementById(targetCategory);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // ==========================================
  // 4. Animación de Entrada al Scroll (Reveal)
  // ==========================================
  const observerOptions = {
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Elementos que se animan suavemente al aparecer en pantalla
  const animatedElements = document.querySelectorAll(
    '.card, .sauce-badge, .sauce-cta-box, .menu-category-card, .review-box, .location-card'
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });
});