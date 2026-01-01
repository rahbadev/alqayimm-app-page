const themeBtn = document.getElementById('themeToggle');
const body = document.body;
const galleryImg = document.getElementById('galleryImg');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const indicators = document.getElementById('indicators');
const skeletonLoader = document.getElementById('skeletonLoader');
const images = [
    'screens/1.png', 'screens/2.png', 'screens/3.png', 'screens/4.png',
    'screens/5.png', 'screens/6.png', 'screens/7.png', 'screens/8.png'
];
let idx = 0, autoPlay;

function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    themeBtn.firstElementChild.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('appPageTheme', theme);
}
themeBtn.onclick = () => setTheme(body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
setTheme(localStorage.getItem('appPageTheme') || 'light');

function showImg(i) {
    idx = (i + images.length) % images.length;

    // إظهار skeleton loader
    skeletonLoader.classList.add('active');

    galleryImg.src = images[idx];
    indicators.childNodes.forEach((btn, j) => btn.classList.toggle('active', j === idx));
}
prevBtn.onclick = () => { showImg(idx - 1); resetAuto(); };
nextBtn.onclick = () => { showImg(idx + 1); resetAuto(); };

images.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.onclick = () => { showImg(i); resetAuto(); };
    indicators.appendChild(btn);
});
showImg(0);

function auto() { autoPlay = setInterval(() => showImg(idx + 1), 4000); }
function resetAuto() { clearInterval(autoPlay); auto(); }

galleryImg.onerror = () => {
    galleryImg.style.display = 'none';
    skeletonLoader.classList.remove('active');
};

galleryImg.onload = () => {
    galleryImg.style.display = '';
    skeletonLoader.classList.remove('active');

    // تأثير دخول سلس للصورة
    galleryImg.style.opacity = '0';
    galleryImg.style.transform = 'scale(0.95)';
    setTimeout(() => {
        galleryImg.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
        galleryImg.style.opacity = '1';
        galleryImg.style.transform = 'scale(1)';
    }, 50);
};

auto();
galleryImg.parentElement.onmouseenter = () => clearInterval(autoPlay);
galleryImg.parentElement.onmouseleave = resetAuto;

// تأثير Parallax 3D للمعرض
const galleryWrapper = document.querySelector('.gallery-wrapper');
if (galleryWrapper) {
    galleryWrapper.addEventListener('mousemove', (e) => {
        const rect = galleryWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        galleryWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    galleryWrapper.addEventListener('mouseleave', () => {
        galleryWrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// تأثير Parallax للشعار
const appLogo = document.querySelector('.app-logo');
if (appLogo) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        appLogo.style.transform = `translate(${x}px, ${y}px)`;
    });
}