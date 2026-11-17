// FoulFoxHacks Packages: small, dependency-free page script.
// Everything on the page is rendered in HTML by the listing build; this only adds
// the one-click VCC link, copy buttons and the package filter.

const listingUrl = (document.getElementById('listingUrl')?.textContent ?? '').trim();

// "Add to VCC" opens the Creator Companion's add-repository handler. Without JS the links
// fall back to the manual steps (#how).
if (listingUrl) {
  const vccLink = `vcc://vpm/addRepo?url=${encodeURIComponent(listingUrl)}`;
  document.querySelectorAll('.js-vcc').forEach((a) => { a.href = vccLink; });
}

document.querySelectorAll('.copy').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = button.dataset.copy ?? '';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard blocked: select the URL next to the button so it can be copied by hand
      const code = button.parentElement?.querySelector('code');
      if (code) window.getSelection()?.selectAllChildren(code);
      return;
    }
    const label = button.textContent;
    button.textContent = 'Copied';
    button.classList.add('is-done');
    setTimeout(() => { button.textContent = label; button.classList.remove('is-done'); }, 1400);
  });
});

const search = document.getElementById('searchInput');
const cards = [...document.querySelectorAll('.pkg')];
const noResults = document.getElementById('noResults');
search?.addEventListener('input', () => {
  const q = search.value.trim().toLowerCase();
  let shown = 0;
  cards.forEach((card) => {
    const hit = !q || (card.dataset.search ?? '').toLowerCase().includes(q);
    card.hidden = !hit;
    if (hit) shown++;
  });
  if (noResults) noResults.hidden = shown > 0;
});
