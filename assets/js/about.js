// تأثيرات الظهور عند التمرير
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// تهيئة تأثيرات الظهور
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Video functionality - Fixed version

// Video functionality - Complete version with working controls
const setupVideo = () => {
    const videoPlayer = document.querySelector('.video-player');
      const video = videoPlayer.querySelector('video');
      const playButton = videoPlayer.querySelector('.play-button');
      const videoOverlay = videoPlayer.querySelector('.video-overlay');
      const playPauseBtn = videoPlayer.querySelector('.play-pause-btn');
      const progressBar = videoPlayer.querySelector('.progress-bar');
      const progress = videoPlayer.querySelector('.progress');
      const volumeBtn = videoPlayer.querySelector('.volume-btn');
      const fullscreenBtn = videoPlayer.querySelector('.fullscreen-btn');

      video.removeAttribute('controls');

      const updateProgress = () => {
        if (video.duration) {
          const percent = (video.currentTime / video.duration) * 100;
          progress.style.width = `${percent}%`;
        }
      };

      const updatePlayPauseIcon = () => {
        const icon = playPauseBtn.querySelector('i');
        icon.className = video.paused ? 'fas fa-play' : 'fas fa-pause';
      };

      const updateVolumeIcon = () => {
        const icon = volumeBtn.querySelector('i');
        if (video.muted || video.volume === 0) {
          icon.className = 'fas fa-volume-mute';
        } else if (video.volume < 0.5) {
          icon.className = 'fas fa-volume-down';
        } else {
          icon.className = 'fas fa-volume-up';
        }
      };

      const playVideo = () => {
        video.play();
        videoOverlay.classList.add('hidden');
        videoPlayer.classList.add('playing');
        updatePlayPauseIcon();
      };

      const pauseVideo = () => {
        video.pause();
        videoOverlay.classList.remove('hidden');
        videoPlayer.classList.remove('playing');
        updatePlayPauseIcon();
      };

      const togglePlayPause = () => {
        if (video.paused) playVideo(); else pauseVideo();
      };

      const toggleVolume = () => {
        video.muted = !video.muted;
        updateVolumeIcon();
      };

      const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
          videoPlayer.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      };

      const seekVideo = (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
      };

      // Events
      playButton.addEventListener('click', playVideo);
      videoOverlay.addEventListener('click', playVideo);
      video.addEventListener('click', togglePlayPause);
      playPauseBtn.addEventListener('click', togglePlayPause);
      progressBar.addEventListener('click', seekVideo);
      volumeBtn.addEventListener('click', toggleVolume);
      fullscreenBtn.addEventListener('click', toggleFullscreen);

      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('play', () => { updatePlayPauseIcon(); updateVolumeIcon(); });
      video.addEventListener('pause', updatePlayPauseIcon);
      video.addEventListener('volumechange', updateVolumeIcon);

      // Initialize
      updatePlayPauseIcon();
      updateVolumeIcon();
    };

    document.addEventListener("DOMContentLoaded", setupVideo);
//end Video


// كاروسيل فريق العمل مع خاصية العودة للبداية
const setupTeamCarousel = () => {
    const carousel = document.querySelector('.team-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const teamMembers = document.querySelectorAll('.team-member');
    
    if (!carousel || teamMembers.length === 0) return;
    
    const memberWidth = teamMembers[0].offsetWidth + 30;
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -memberWidth,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        const currentScroll = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        if (currentScroll >= maxScroll - 10) {
            // العودة للبداية
            carousel.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            // التمرير العادي
            carousel.scrollBy({
                left: memberWidth,
                behavior: 'smooth'
            });
        }
    });
};

// كاروسيل فريق التطوير مع خاصية العودة للبداية
const setupDevTeamCarousel = () => {
    const carousel = document.querySelector('.dev-team-carousel');
    const prevBtn = document.querySelector('.dev-prev-btn');
    const nextBtn = document.querySelector('.dev-next-btn');
    const devMembers = document.querySelectorAll('.dev-member');
    
    if (!carousel || devMembers.length === 0) return;
    
    const memberWidth = devMembers[0].offsetWidth + 30;
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -memberWidth,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        const currentScroll = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        if (currentScroll >= maxScroll - 10) {
            // العودة للبداية
            carousel.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            // التمرير العادي
            carousel.scrollBy({
                left: memberWidth,
                behavior: 'smooth'
            });
        }
    });
};

// دالة لإنشاء صورة بالأحرف الأولى
const createInitialsImage = (name, size = 300) => {
    // استخراج الأحرف الأولى من الاسم
    const getInitials = (fullName) => {
        return fullName
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2); // أخذ أول حرفين فقط
    };
    
    const initials = getInitials(name);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // خلفية متدرجة جميلة
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#02B6ED');
    gradient.addColorStop(1, '#0288D1');
    
    // رسم الخلفية
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // نص الأحرف الأولى
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size/3}px Poppins, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, size/2, size/2);
    
    return canvas.toDataURL();
};

// Modal functionality
const setupModal = () => {
    const modal = document.getElementById('teamModal');
    const closeBtn = document.querySelector('.close-btn');
    const teamMembers = document.querySelectorAll('.team-member');
    
    // Team member data
    const teamData = [
        {
            name: 'Mohammad Swilem',
            role: 'President',
    bio: `Key Responsibilities:
• Strategic Planning & Policy Development
• Board Governance & Role Definition  
• Financial Oversight & Coordination
• Performance Evaluation & Auditing
• Operational Excellence & Quality Control
• Team Management & Development`,
            email: 'mohammad.swilem141@gmail.com',
            social: [
                { platform: 'envelope', url: 'mailto:m.swilem@ain.org' }
            ]
        },
        {
            name: 'Mohammad Daraghmeh',
            role: 'Vice President',
    bio: `The Vice President plays a vital role in balancing strong leadership with active listening. Working closely with the President, 
    they support the organization’s vision, ensure continuity in the President’s absence, and contribute to effective decision-making and teamwork that drive the association’s success.
    Key Responsibilities:
• Financial & Administrative Oversight
• Activity Monitoring & Compliance  
• Branch Strategy Development
• Administrative Coordination
• Executive Liaison & Collaboration
`,           
            social: [
                { platform: 'envelope', url: 'mailto:m.daraghmeh@ain.org' }
            ]
        },
        {
            name: 'Sadeel Daraghmeh',
            role: 'PR & Outreach',
            bio: `Key Responsibilities:
• Partnership Management
• Media Relations
• Communications Strategy
• Event Coordination`,
            email: 'sadeelabuhelweh@gmail.com',
            social: [
                { platform: 'envelope', url: 'mailto:s.daraghmeh@ain.org' }
            ]
        },
        {
            name: 'Ghaida Saify',
            role: 'Technical Solutions Chair',
            bio: `Key Responsibilities:
• Website Design & Development
• Technical Maintenance & Issue Resolution
• Digital Systems & Platform Management`,           
            social: [
                { platform: 'envelope', url: 'mailto:g.saify@ain.org' }
            ]
        },
        {
            name: 'Tala Alhendi',
            role: 'Technical Solutions Chair',
            bio: `Key Responsibilities:
• Website Design & Development
• Technical Maintenance & Issue Resolution
• Digital Systems & Platform Management`,            
            social: [
                { platform: 'envelope', url: 'mailto:t.alhendi@ain.org' }
            ]
        },
        {
            name: 'Hamza Abdulsalam',
            role: 'Membership Chair',
            bio: `Key Responsibilities:
• Member Engagement & Motivation
• Membership Growth & Development
• Activity Coordination & Quality Assurance
• Member Support & Feedback Management`,       
      email: 'hamzasalam554@gmail.com',
            social: [
                { platform: 'envelope', url: 'mailto:h.abdulsalam@ain.org' }
            ]
        },
        {
            name: 'Mosab Haddad',
            role: 'Activity Coordinator',
            bio: `Key Responsibilities:
• Event Planning
• Activity Coordination  
• Logistics Management
• Program Developmentt`, 
            email: 'mosabalhaddad18@gmail.com',
            social: [
                { platform: 'envelope', url: 'mailto:m.haddad@ain.org' }
            ]
        },
        {
            name: 'Shadi Salous',
            role: 'Photographer',
            bio: `Key Responsibilities:
• Event Photography
• Video Production
• Media Documentation
• Creative Editing`, 
            email: 'shadisalam205@gmail.com',
            social: [
                { platform: 'envelope', url: 'mailto:s.salous@ain.org' }
            ]
        },
        {
            name: 'Teeba Qusai',
            role: 'Designer',
            bio: `Key Responsibilities:
• Visual Design
• Multimedia Production
• Digital Innovation
• Project Management`,
            email: 'teeba.qusai2021@gmail.com',
            social: [
                { platform: 'envelope', url: 'mailto:t.qusai@ain.org' }
            ]
        },
                {
            name: 'Meera Sorady',
            role: 'Designer',
            bio: `Key Responsibilities:
• Visual Design
• Multimedia Production
• Digital Innovation
• Project Management`,
            email: 'meerasorady21@gmail.com',
            social: [
                { platform: 'envelope', url: 'mailto:n.khazendar@ain.org' }
            ]
        },

        {
            name: 'Najwa Khazendar',
            role: 'Treasurer',
            bio: `Key Responsibilities:
• Financial Management
• Budget Planning
• Revenue Collection
• Logistics Support`,
            email: 'najwakhazndar@gmail.com',
            social: [
                { platform: 'envelope', url: 'mailto:n.khazendar@ain.org' }
            ]
        },
        {
            name: 'Asmaa Abd Alhadi',
            role: 'Media Chair',
            bio: `Key Responsibilities:
• Content Management
• Social Media Strategy
• Digital Platform Oversight
• Audience Engagement`,
            email: 'abdalhadiasmaa@gmail.com',
            social: [
                { platform: 'envelope', url: 'mailto:a.abdAlhadi@ain.org' }
            ]
        }
    ];

    // Add click event to each team member
    teamMembers.forEach((member, index) => {
        member.addEventListener('click', () => {
            const memberData = teamData[index];
            
            // Set modal content
            document.getElementById('modalName').textContent = memberData.name;
            document.getElementById('modalRole').textContent = memberData.role;
            document.getElementById('modalBio').textContent = memberData.bio;
            document.getElementById('modalEmail').textContent = memberData.email;
            
            // Set modal image
            const modalImage = document.getElementById('modalImage');
            const memberImage = member.querySelector('img');
            modalImage.src = memberImage.src;
            modalImage.alt = memberData.name;
            

            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
};

// Scroll to top function for gallery items
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// تهيئة الصور والتأثيرات
const initializePage = () => {
    // إعداد الفيديو
    setupVideo();
    
    // تهيئة الصور التوضيحية للفريق
    const teamImages = document.querySelectorAll('.team-member img');
    const teamData = {
        0: { name: 'Mohammad Swilem', image: 'MohammadSwilem.jpg' },
        1: { name: 'Mohammad Daraghmeh', image: 'MohammadDaraghmeh.jpg' },
        2: { name: 'Sadeel Daraghmeh', image: 'SadeelDaraghmeh.jpg' },
        3: { name: 'Ghaida Saify', image: 'GhaidaSaify.jpg' },
        4: { name: 'Tala Alhendi', image: 'TalaAlhendi.jpg' },
        5: { name: 'Hamza Abdulsalam', image: 'HamzaAbdulsalam.jpg' },
        6: { name: 'Mosab Haddad', image: 'MosabHaddad.jpg' },
        7: { name: 'Shadi Salous', image: 'ShadiSalous.jpg' },
        8: { name: 'Teeba Qusai', image: 'TeebaQusai.jpg' },
        9: { name: 'Meera Sorady', image: 'Meera Sorady.jpg' },
       10: { name: 'Najwa Khazendar', image: 'NajwaKhazendar.jpg' },
       11: { name: 'Asmaa Abd Alhadi', image: 'AsmaaAbdAlhadi.jpg' }
        
    };

    teamImages.forEach((img, index) => {
        const member = teamData[index];
        
        if (member && member.image) {
            img.src = `image/${member.image}`;
            img.alt = member.name;
            
            img.onerror = function() {
                // إذا فشل تحميل الصورة، أنشئ صورة بالأحرف الأولى
                this.src = createInitialsImage(member.name, 300);
                console.log(`Using initials image for ${member.name}`);
            };
        } else {
            // استخدام صورة افتراضية إذا لم توجد بيانات
            const fallbackName = `Team Member ${index + 1}`;
            img.src = createInitialsImage(fallbackName, 300);
            img.alt = fallbackName;
        }
    });

    // إضافة الصور لفريق التطوير
    const devImages = document.querySelectorAll('.dev-card-front img');
    const devTeamData = {
        0: { name: 'Dana Zaben', image: 'dana.jpg' },
        1: { name: 'Sadeel Daraghmeh', image: 'SadeelDaraghmeh.jpg' },
        2: { name: 'Andreh Khouri', image: 'Andreh.jpg' },
        3: { name: 'Tala Alhendi', image: 'TalaAlhendi.jpg' },
        4: { name: 'Ghaida Saify', image: 'GhaidaSaify.jpg' },
        5: { name: 'Jana Abuturabi', image: 'JanaAbuturabi.jpg' },
        6: { name: 'Hamza Abdulsalam', image: 'HamzaAbdulsalam.jpg' }
    };

    devImages.forEach((img, index) => {
        const member = devTeamData[index];
        
        if (member && member.image) {
            img.src = `image/${member.image}`;
            img.alt = member.name;
            
            img.onerror = function() {
                // إذا فشل تحميل الصورة، أنشئ صورة بالأحرف الأولى
                this.src = createInitialsImage(member.name, 300);
                console.log(`Using initials image for ${member.name}`);
            };
        } else {
            // استخدام صورة افتراضية إذا لم توجد بيانات
            const fallbackName = `Developer ${index + 1}`;
            img.src = createInitialsImage(fallbackName, 300);
            img.alt = fallbackName;
        }
    });

    // إضافة الصور التوضيحية للمعرض
    const galleryImages = document.querySelectorAll('.gallery-image');
    const galleryImageUrls = [
        'image/EOY.jpg',
        'image/Exhibition.jpg',
        'image/Hackathon.jpg'
    ];
    
    galleryImages.forEach((img, index) => {
        if (galleryImageUrls[index]) {
            img.src = galleryImageUrls[index];
            img.alt = `Gallery Image ${index + 1}`;
            
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/500x300/02B6ED/ffffff?text=AIN+Project';
            };
        }
    });
    
    // إضافة تأثيرات إضافية للبطاقات
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-15px) scale(1.02)';
            item.style.boxShadow = '0 20px 40px rgba(2, 182, 237, 0.25)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '0 8px 20px rgba(2, 182, 237, 0.15)';
        });
    });
    
    // إضافة تأثيرات للبطاقات (بدون تدوير)
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'scale(1.03)';
            member.style.transition = 'transform 0.3s ease';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'scale(1)';
        });
    });
    
    // إضافة تأثيرات لفريق التطوير (بدون تدوير)
    document.querySelectorAll('.dev-member').forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'scale(1.03)';
            member.style.transition = 'transform 0.3s ease';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'scale(1)';
        });
    });
};

// Update the DOMContentLoaded event to include video setup
document.addEventListener('DOMContentLoaded', () => {
    // تأثيرات الظهور
    fadeInOnScroll();
    
    // إعداد الفيديو
    setupVideo();
    
    // إعداد الكاروسيل لفريق الهوية
    setupTeamCarousel();
    
    // إعداد الكاروسيل لفريق التطوير
    setupDevTeamCarousel();
    
    // إعداد المودال
    setupModal();
    
    // تهيئة الصور والتأثيرات
    initializePage();
});

