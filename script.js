// 1. ระบบหิมะ/ดวงดาว
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
let width, height, snowflakes = [];

function initSnow() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    snowflakes = [];
    for (let i = 0; i < 150; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 0.5,
            d: Math.random() * 1
        });
    }
}

function drawSnow() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    snowflakes.forEach(p => {
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    });
    ctx.fill();
    updateSnow();
}

function updateSnow() {
    snowflakes.forEach(p => {
        p.y += Math.cos(p.d) + 1 + p.r / 2;
        if (p.y > height) p.y = -10;
    });
}

// 2. เอฟเฟกต์ Ripple เมื่อคลิกปุ่ม
document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.onmousedown = function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
});

window.addEventListener('resize', initSnow);
initSnow();
setInterval(drawSnow, 33);