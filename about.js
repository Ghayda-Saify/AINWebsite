// Team carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.team-carousel');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const teamMembers = document.querySelectorAll('.team-member');
  
  let currentIndex = 0;
  let membersPerView = getMembersPerView();
  let autoRotateInterval;
  
  function getMembersPerView() {
    if (window.innerWidth >= 1200) return 4;
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }
  
  function updateCarousel() {
    const memberWidth = 100 / membersPerView;
    const translateX = -currentIndex * memberWidth;
    carousel.style.transform = `translateX(${translateX}%)`;
  }
  
  function nextSlide() {
    const maxIndex = teamMembers.length - membersPerView;
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // العودة للبطاقة الأولى
    }
    updateCarousel();
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = teamMembers.length - membersPerView; // الانتقال للبطاقة الأخيرة
    }
    updateCarousel();
  }
  
  // Event listeners for navigation buttons
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Handle window resize
  window.addEventListener('resize', function() {
    const newMembersPerView = getMembersPerView();
    if (newMembersPerView !== membersPerView) {
      membersPerView = newMembersPerView;
      currentIndex = 0;
      updateCarousel();
    }
  });
  
  // Auto-rotate carousel
  function startAutoRotate() {
    autoRotateInterval = setInterval(nextSlide, 5000);
  }
  
  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }
  
  // Pause auto-rotation on hover
  carousel.addEventListener('mouseenter', stopAutoRotate);
  carousel.addEventListener('mouseleave', startAutoRotate);
  
  // Initialize carousel
  updateCarousel();
  startAutoRotate();
  
  // Add click functionality for mobile devices
  teamMembers.forEach(member => {
    member.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        const inner = this.querySelector('.card-inner');
        inner.style.transform = inner.style.transform === 'rotateY(180deg)' ? 
          'rotateY(0deg)' : 'rotateY(180deg)';
      }
    });
  });
  
  // Add animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements with fade-in class
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});