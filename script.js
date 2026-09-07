document.addEventListener('DOMContentLoaded', () => {
  // ============================================================
  // 1. Manejo del Menú Móvil Hamburguesa
  // ============================================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Cerrar el menú al dar clic en cualquier enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // ============================================================
  // 2. Navegación Suave (Smooth Scroll)
  // ============================================================
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

  // ============================================================
  // 3. Módulo Unificado: Simulador de Alitas & Catálogo de Salsas
  // ============================================================
  const sauceTabBtns = document.querySelectorAll('.sauce-tab-btn');
  const saucePanels = document.querySelectorAll('.sauce-group-panel');
  const sauceChipBtns = document.querySelectorAll('.sauce-chip-btn');

  // Elementos dinámicos del visor visual
  const sauceLayer = document.getElementById('sauceLayer');
  const sauceGlow = document.getElementById('sauceGlow');
  const activeSauceName = document.getElementById('activeSauceName');
  const activeSauceIcon = document.getElementById('activeSauceIcon');
  const tastingCategoryBadge = document.getElementById('tastingCategoryBadge');
  const tastingHeat = document.getElementById('tastingHeat');
  const tastingDescription = document.getElementById('tastingDescription');

  // Pestañas superiores (Dulces, Dulces Picosas, Picosas)
  if (sauceTabBtns.length > 0) {
    sauceTabBtns.forEach(tab => {
      tab.addEventListener('click', () => {
        sauceTabBtns.forEach(b => b.classList.remove('active'));
        saucePanels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetId = `group-${tab.getAttribute('data-tab')}`;
        const activePanel = document.getElementById(targetId);

        if (activePanel) {
          activePanel.classList.add('active');

          // Bañar automáticamente con la primera salsa del grupo seleccionado
          const firstSauceInGroup = activePanel.querySelector('.sauce-chip-btn');
          if (firstSauceInGroup) {
            firstSauceInGroup.click();
          }
        }
      });
    });
  }

  // Botones de cada salsa (Bañar alita en vivo)
  if (sauceChipBtns.length > 0 && sauceLayer) {
    sauceChipBtns.forEach(button => {
      button.addEventListener('click', function () {
        sauceChipBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Extraer atributos
        const sauceKey = this.getAttribute('data-sauce');
        const sauceName = this.getAttribute('data-name');
        const sauceIcon = this.getAttribute('data-icon');
        const glowColor = this.getAttribute('data-color') || '#ff5500';
        const categoryText = this.getAttribute('data-category');
        const heatText = this.getAttribute('data-heat');
        const descText = this.getAttribute('data-desc');

        // Efecto Splash: Salida suave
        sauceLayer.classList.remove('active');

        // Actualizar textos y resplandor ambiental
        if (sauceGlow) {
          sauceGlow.style.background = `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`;
        }
        if (activeSauceName) activeSauceName.textContent = sauceName;
        if (activeSauceIcon) activeSauceIcon.textContent = sauceIcon;
        if (tastingCategoryBadge) tastingCategoryBadge.textContent = categoryText;
        if (tastingHeat) tastingHeat.textContent = heatText;
        if (tastingDescription) tastingDescription.textContent = descText;

        // Cargar nueva salsa superpuesta y animar caída
        setTimeout(() => {
          sauceLayer.src = `assets/recgraf/salsa-${sauceKey}.png`;
          sauceLayer.classList.add('active');
        }, 120);
      });
    });
  }

  // ============================================================
  // 4. Animación de Entrada Suave al Hacer Scroll (Reveal)
  // ============================================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  const animatedElements = document.querySelectorAll(
    '.card, .wing-card, .bento-card, .special-card, .junior-card, .review-box, .location-card'
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });
});
