// Header scroll hide/show functionality
(function() {
  let lastScroll = 0;
  const header = document.querySelector('.site-header');
  const delta = 5;

  if (!header) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (Math.abs(lastScroll - currentScroll) <= delta) return;

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down, hide header
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up or near top, show header
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

  // Ensure header is visible on page load
  header.style.transform = 'translateY(0)';
  header.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
})();

