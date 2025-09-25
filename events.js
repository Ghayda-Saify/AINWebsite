(function() {
  const searchInput = document.getElementById('searchInput');
  const upcomingGrid = document.getElementById('upcomingGrid');
  const pastGrid = document.getElementById('pastGrid');
  const allCards = () => [
    ...Array.from(upcomingGrid.querySelectorAll('.card')),
    ...Array.from(pastGrid.querySelectorAll('.card'))
  ];

  const filterBtn = document.getElementById('filterBtn');
  const filtersPanel = document.getElementById('filtersPanel');
  const filterFree = document.getElementById('filterFree');
  const filterPaid = document.getElementById('filterPaid');

  function normalize(text) {
    return (text || '').toString().toLowerCase().trim();
  }

  function applyFilters() {
    const term = normalize(searchInput.value);
    const wantFree = filterFree.checked;
    const wantPaid = filterPaid.checked;

    allCards().forEach(card => {
      const name = normalize(card.getAttribute('data-name'));
      const cost = normalize(card.getAttribute('data-cost'));

      const matchesText = !term || name.includes(term);
      const matchesCost = (wantFree || wantPaid)
        ? ((wantFree && cost === 'free') || (wantPaid && cost === 'paid'))
        : true;

      card.style.display = matchesText && matchesCost ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', applyFilters);
  filterFree.addEventListener('change', applyFilters);
  filterPaid.addEventListener('change', applyFilters);

  filterBtn.addEventListener('click', () => {
    filtersPanel.classList.toggle('visible');
  });

  applyFilters();
})();
