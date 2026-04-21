// Product cards clickable redirects for Business Areas
window.addEventListener('load', () => {
  // Wait for dynamic content
  setTimeout(() => {
    const productCards = document.querySelectorAll('#business-areas .product-card');
    const pages = [
    'structures.html',        // Technological & General Structure
    'peb.html',               // PEB
    'process-equipment.html', // Process Equipments
    'machining.html',         // Machining Products
    'erection.html',          // Erection & Commissioning
    'civil.html'              // Civil Work
  ];

  productCards.forEach((card, index) => {
    card.style.cursor = 'pointer';
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
      card.style.boxShadow = '0 20px 40px rgba(47,123,255,0.25)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });

    card.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (pages[index]) {
        window.location.href = pages[index];
      }
    });
  });
}, 1500); // Wait for dynamic content load
});
