// about.js - JavaScript for About Page with Carousel Functionality

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
    gradient.addColorStop(0, '#4a90e2');
    gradient.addColorStop(1, '#6ba8e9');
    
    // رسم الخلفية
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // إضافة تأثير دائري
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2 - 10, 0, Math.PI * 2);
    ctx.clip();
    
    // نص الأحرف الأولى
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size/3}px Poppins, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, size/2, size/2);
    
    return canvas.toDataURL();
};

// تهيئة الصور والتأثيرات
const initializePage = () => {
    
    // تهيئة الصور التوضيحية للفريق
    const teamImages = document.querySelectorAll('.team-member img');
    const teamData = {
        0: { name: 'Mohammad Swilem', image: 'MohammadSwilem.jpg' },
        1: { name: 'Mohammad Daraghmeh', image: 'MohammadDaraghmeh.jpg' },
        2: { name: 'Sadeel Abuhelweh', image: 'SadeelAbuhelweh.jpg' },
        3: { name: 'Ghaida Saify', image: 'GhaidaSaify.jpg' },
        4: { name: 'Tala Alhindi', image: 'TalaAlhindi.jpg' },
        5: { name: 'Hamza Abdulsalam', image: 'HamzaAbdulsalam.jpg' }
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
        0: { name: 'Dana Zaben', image: 'DanaZaben.jpg' },
        1: { name: 'Sadeel Abuhelweh', image: 'SadeelAbuhelweh.jpg' },
        2: { name: 'Andreh Khouri', image: 'AndrehKhouri.jpg' },
        3: { name: 'Hamza Abdulsalam', image: 'HamzaAbdulsalam.jpg' },
        4: { name: 'Ghaydaa Saify', image: 'GhaydaaSaify.jpg' },
        5: { name: 'Jana Abuturabi', image: 'JanaAbuturabi.jpg' },
        6: { name: 'Tala Alhindi', image: 'TalaAlhindi.jpg' }
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
                this.src = 'https://via.placeholder.com/500x300/4a90e2/ffffff?text=AIN+Project';
            };
        }
    });
    
    // إضافة تأثيرات إضافية للبطاقات
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 15px 30px rgba(74, 144, 226, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 8px 20px rgba(74, 144, 226, 0.15)';
        });
    });
    
    // إضافة تأثيرات للبطاقات ثلاثية الأبعاد (لفريق الهوية فقط)
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'scale(1.02)';
            member.style.transition = 'transform 0.3s ease';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'scale(1)';
        });
    });
    
    // إضافة تأثيرات لفريق التطوير (بدون تدوير)
    document.querySelectorAll('.dev-member').forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'scale(1.02)';
            member.style.transition = 'transform 0.3s ease';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'scale(1)';
        });
    });
};

// تهيئة جميع الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // تأثيرات الظهور
    fadeInOnScroll();
    
    // إعداد الكاروسيل لفريق الهوية
    setupTeamCarousel();
    
    // إعداد الكاروسيل لفريق التطوير
    setupDevTeamCarousel();
    
    // تهيئة الصور والتأثيرات
    initializePage();
});