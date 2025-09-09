const themeBtn = document.getElementById('themeToggle');
const body = document.body;
const galleryImg = document.getElementById('galleryImg');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const indicators = document.getElementById('indicators');
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
galleryImg.onerror = () => { galleryImg.style.display = 'none'; };
galleryImg.onload = () => { galleryImg.style.display = ''; };
auto();
galleryImg.parentElement.onmouseenter = () => clearInterval(autoPlay);
galleryImg.parentElement.onmouseleave = resetAuto;