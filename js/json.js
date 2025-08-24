
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("gallery-container");
  const searchInput = document.getElementById("gallery-search");
  let items = [];
  let lightbox;

  async function loadGallery() {
    try {
      const res = await fetch("data/gallery.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      items = await res.json();
      render(items);
      initLightbox();
      initScrollAnimation();
    } catch (e) {
      container.innerHTML = `<div class="text-danger">Failed to load gallery: ${e.message}</div>`;
    }
  }

  function render(list) {
    container.innerHTML = "";
    if (!list.length) {
      container.innerHTML = `<div class="text-center text-muted py-5">No results found.</div>`;
      return;
    }
    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "gallery-card";
      card.innerHTML = `
        <a href="${item.image}" class="glightbox" data-gallery="gallery" data-title="${escapeHtml(item.title)}">
          <img src="${item.image}" alt="${escapeHtml(item.alt || item.title)}" loading="lazy">
          <div class="gallery-meta">${escapeHtml(item.title)}</div>
        </a>
      `;
      container.appendChild(card);
    });
  }

  function initLightbox() {
    if (lightbox) lightbox.destroy();
    lightbox = GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true
    });
  }

  // Search filter
  searchInput?.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    const filtered = !q ? items : items.filter(i => (i.title || "").toLowerCase().includes(q));
    render(filtered);
    initLightbox();
    initScrollAnimation();
  });

  // Scroll fade-in
  function initScrollAnimation() {
    const cards = document.querySelectorAll(".gallery-card");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach(card => observer.observe(card));
  }

  function escapeHtml(str = "") {
    return str.replace(/[&<>"']/g, s => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[s]));
  }

  loadGallery();
});

