(function () {
  const searchInput = document.getElementById("searchInput");
  const upcomingGrid = document.getElementById("upcomingGrid");
  const pastGrid = document.getElementById("pastGrid");
  const brandBadge = document.getElementById("brandBadge");

  const allCards = () => [
    ...Array.from(upcomingGrid.querySelectorAll(".card")),
    ...Array.from(pastGrid.querySelectorAll(".card")),
  ];

  const filterBtn = document.getElementById("filterBtn");
  const filtersPanel = document.getElementById("filtersPanel");

  // Get all radio buttons with the name "adminLevelFilter"
  const adminLevelFilters = document.querySelectorAll(
    'input[name="adminLevelFilter"]'
  );

  function normalize(text) {
    return (text || "").toString().toLowerCase().trim();
  }

  function applyFilters() {
    const term = normalize(searchInput.value);

    // Find the currently selected admin level (radio button)
    const selectedAdminLevelElement = document.querySelector(
      'input[name="adminLevelFilter"]:checked'
    );
    const selectedAdminLevel = selectedAdminLevelElement
      ? parseInt(selectedAdminLevelElement.value, 10)
      : null;

    let visibleCardsCount = 0;

    allCards().forEach((card) => {
      const name = normalize(card.getAttribute("data-name"));
      const adminLevel = parseInt(card.getAttribute("data-admin-level"), 10);

      const matchesText = !term || name.includes(term);

      // If no admin level is selected (shouldn't happen with default, but good for robustness)
      // or if the card's admin level matches the selected one.
      const matchesAdminLevel =
        selectedAdminLevel === null || adminLevel === selectedAdminLevel;

      const isVisible = matchesText && matchesAdminLevel;
      card.style.display = isVisible ? "" : "none";

      if (isVisible) {
        visibleCardsCount++;
      }
    });

    // Update the brand badge with the selected admin level, or default to "10" if nothing is checked
    brandBadge.textContent = selectedAdminLevelElement
      ? selectedAdminLevelElement.value
      : "10";
  }

  // Attach event listeners for all admin level radio buttons
  adminLevelFilters.forEach((radio) => {
    radio.addEventListener("change", applyFilters);
  });

  searchInput.addEventListener("input", applyFilters);

  filterBtn.addEventListener("click", () => {
    filtersPanel.classList.toggle("visible");
  });

  // Initial application of filters to show events for default "10" and set badge
  applyFilters();

  // --- Modal and Image Slider Logic ---
  (function () {
    const modal = document.getElementById("eventModal");
    const modalBody = document.getElementById("modalBody");
    const closeBtn = modal.querySelector(".close");

    const modalTitle = modalBody.querySelector(".modal-title");
    const modalImage = modalBody.querySelector(".modal-image");
    const modalFullDescription = modalBody.querySelector(
      ".modal-full-description"
    );
    const modalMetaDetails = modalBody.querySelector(".modal-meta-details");
    const modalBookBtn = modalBody.querySelector(".modal-cta .btn-book");
    const sliderPrevBtn = modalBody.querySelector(".slider-prev");
    const sliderNextBtn = modalBody.querySelector(".slider-next");
    const sliderDotsContainer = modalBody.querySelector(".slider-dots");

    let currentImageIndex = 0;
    let currentImages = [];

    function updateSlider() {
      if (currentImages.length === 0) {
        modalImage.src = "";
        modalImage.style.display = "none";
        sliderPrevBtn.style.display = "none";
        sliderNextBtn.style.display = "none";
        sliderDotsContainer.innerHTML = "";
        return;
      }

      modalImage.style.display = "block";
      modalImage.src = currentImages[currentImageIndex];

      sliderDotsContainer.innerHTML = "";
      if (currentImages.length > 1) {
        currentImages.forEach((_, index) => {
          const dot = document.createElement("div");
          dot.classList.add("slider-dot");
          if (index === currentImageIndex) {
            dot.classList.add("active");
          }
          dot.addEventListener("click", () => {
            currentImageIndex = index;
            updateSlider();
          });
          sliderDotsContainer.appendChild(dot);
        });
        sliderPrevBtn.style.display = "block";
        sliderNextBtn.style.display = "block";
      } else {
        sliderPrevBtn.style.display = "none";
        sliderNextBtn.style.display = "none";
      }
    }

    sliderPrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentImageIndex =
        (currentImageIndex - 1 + currentImages.length) % currentImages.length;
      updateSlider();
    });

    sliderNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex + 1) % currentImages.length;
      updateSlider();
    });

    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        const title = card.querySelector(".title").textContent;
        const fullDescription = card.getAttribute("data-full-description");
        const imagesString = card.getAttribute("data-images");

        const metaItemsToClone = Array.from(
          card.querySelectorAll(".meta-item")
        ).filter((item) => {
          const label = item
            .querySelector(".label")
            .textContent.trim()
            .toUpperCase();
          return label !== "TIME" && label !== "COST";
        });

        modalTitle.textContent = title;
        modalFullDescription.textContent = fullDescription;

        currentImages = imagesString ? imagesString.split(",") : [];
        currentImageIndex = 0;
        updateSlider();

        modalMetaDetails.innerHTML = "";
        metaItemsToClone.forEach((item) => {
          const clone = item.cloneNode(true);
          modalMetaDetails.appendChild(clone);
        });

        modalBookBtn.onclick = (e) => {
          e.stopPropagation();
          alert(`Booking for "${title}" feature coming soon!`);
        };

        modal.style.display = "block";
      });
    });

    closeBtn.onclick = () => {
      modal.style.display = "none";
    };

    window.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };
  })();

  // --- Bubble Background Animation for Events Header ---
  (function () {
    const canvas = document.getElementById("events-header-canvas");
    if (!canvas) {
      console.warn("Events header canvas element not found.");
      return;
    }
    const ctx = canvas.getContext("2d");
    let bubbles = [];
    const bubbleCount = 15; // Number of bubbles

    // Function to resize canvas
    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;

      // Re-initialize bubbles on resize
      bubbles = [];
      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push(new Bubble());
      }
    }

    // Bubble class
    class Bubble {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // Start at random height
      }

      reset() {
        this.radius = Math.random() * 30 + 10; // Bubble size between 10-40px
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.radius; // Start below the canvas
        this.speed = Math.random() * 1 + 0.5; // Speed between 0.5-1.5
        this.opacity = Math.random() * 0.3 + 0.1; // Opacity between 0.1-0.4
        this.wobble = Math.random() * 2; // Wobble effect
        this.wobbleSpeed = Math.random() * 0.05 + 0.02;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.wobble) * 0.5; // Gentle side-to-side movement
        this.wobble += this.wobbleSpeed;

        // If bubble goes above top, reset it to bottom
        if (this.y < -this.radius) {
          this.reset();
        }
      }

      draw() {
        // Bubble glow/shadow
        ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
        ctx.shadowBlur = 10;

        // Bubble fill
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Bubble highlight
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.2})`;
        ctx.beginPath();
        ctx.arc(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }

    // Initialize bubbles
    function init() {
      resizeCanvas();
      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push(new Bubble());
      }
      animate();
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw all bubbles
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].draw();
      }
    }

    // Event listener for window resize
    window.addEventListener("resize", resizeCanvas);

    // Start the animation when the page loads
    window.addEventListener("load", init);

    // Also start if the canvas is already loaded
    if (canvas.complete) {
      init();
    }
  })();
})();
