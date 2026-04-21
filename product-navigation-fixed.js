// Fixed Product cards clickable - runs on load + retries for dynamic content
(function() {
  function initProductCards() {
    const productCards = document.querySelectorAll('#business-areas .product-card');
    const pages = [
      'structures.html',        // 0: Technological & General Structure
      'peb.html',               // 1: PEB
      'process-equipment.html', // 2: Process Equipments
      'machining.html',         // 3: Machining Products
      'erection.html',          // 4: Erection & Commissioning
      'civil.html'              // 5: Civil Work
    ];

    productCards.forEach((card, index) => {
      if (card.dataset.clickable === 'true') return; // Already initialized
      card.dataset.clickable = 'true';
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
  }

  // Run immediately, on DOMContentLoaded, and retry every 500ms for 5s
  initProductCards();
  document.addEventListener('DOMContentLoaded', initProductCards);
  
  let retryCount = 0;
  const maxRetries = 10;
  const retryInterval = setInterval(() => {
    initProductCards();
    retryCount++;
    if (retryCount >= maxRetries) {
      clearInterval(retryInterval);
    }
  }, 500);
  
  window.addEventListener('load', initProductCards);
})();

