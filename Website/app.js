// FoulFoxHacks Packages: small, dependency-free page script.
// Everything on the page is rendered in HTML by the listing build; this only adds
// the one-click VCC link, copy button and the package filter.

const listingUrl = (document.getElementById('listingUrl')?.value ?? '').trim();

// "Add to VCC" opens the Creator Companion's add-repository handler. Without JS the links
// open the manual instructions (#help).
if (listingUrl) {
  const vccLink = `vcc://vpm/addRepo?url=${encodeURIComponent(listingUrl)}`;
  document.querySelectorAll('.js-vcc').forEach((a) => { a.href = vccLink; });
}

document.querySelectorAll('.copy').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? '');
    } catch {
      // clipboard blocked: select the URL so it can be copied by hand
      document.getElementById('listingUrl')?.select();
      return;
    }
    const label = button.textContent;
    button.textContent = 'Copied';
    button.classList.add('is-done');
    setTimeout(() => { button.textContent = label; button.classList.remove('is-done'); }, 1400);
  });
});

const search = document.getElementById('searchInput');
const rows = [...document.querySelectorAll('.pkg')];
const noResults = document.getElementById('noResults');
search?.addEventListener('input', () => {
  const q = search.value.trim().toLowerCase();
  let shown = 0;
  rows.forEach((row) => {
    const hit = !q || (row.dataset.search ?? '').toLowerCase().includes(q);
    row.hidden = !hit;
    if (hit) shown++;
  });
  if (noResults) noResults.hidden = shown > 0;
});
