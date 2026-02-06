
    // 1) Smooth scroll gombokhoz
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-scroll]");
      if (!btn) return;

      const sel = btn.getAttribute("data-scroll");
      const el = document.querySelector(sel);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // 2) data-img -> valódi háttérkép beállítása (ha később berakod a fájlokat)
    function applyDataBg(root = document) {
      root.querySelectorAll("[data-img]").forEach((node) => {
        const url = node.getAttribute("data-img");
        if (!url) return;

        // img-card esetén a belső .img-re tesszük
        if (node.classList.contains("img-card")) {
          const inner = node.querySelector(".img");
          if (inner) inner.style.backgroundImage = `url("${url}")`;
        } else {
          // pl. .news-card .top
          node.style.backgroundImage = `url("${url}")`;
          node.style.backgroundSize = "cover";
          node.style.backgroundPosition = "center";
        }
      });
    }
    applyDataBg();

    // 3) Finom belépő animáció
    const io = new IntersectionObserver((entries) => {
      for (const ent of entries) {
        if (ent.isIntersecting) {
          ent.target.classList.add("in");
          io.unobserve(ent.target);
        }
      }
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // 4) Demo kattintás a kártyákra (ne dobjon fel üres hivatkozást)
    document.querySelectorAll("a.img-card").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const title = a.getAttribute("data-title") || "Kártya";
        alert(title + " – ide jöhet aloldal / modal / navigáció.");
      });
    });
