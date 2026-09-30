import './style.css';

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden');
  menuBtn.setAttribute('aria-expanded', String(!open));
});
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.add('hidden'))
);

document.getElementById('year').textContent = new Date().getFullYear();
const orderNo = document.getElementById('orderNo');
if (orderNo) orderNo.textContent = String(Math.floor(40 + Math.random() * 60)).padStart(3, '0');

const form = document.getElementById('quoteForm');
const modal = document.getElementById('modal');
const modalName = document.getElementById('modalName');
const phoneError = document.getElementById('phoneError');

function openModal(name) {
  modalName.textContent = name || 'friend';
  modal.classList.remove('hidden');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();

  if (!name) {
    document.getElementById('fName').focus();
    return;
  }
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7) {
    phoneError.classList.remove('hidden');
    document.getElementById('fPhone').focus();
    return;
  }
  phoneError.classList.add('hidden');
  openModal(name);
  form.reset();
});

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalBackdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

/* ---------- header shadow ---------- */
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- reveal on scroll (subtle, staggered) ---------- */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal, .reveal-photo');
if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('in'));
} else if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

/* ---------- stamp slam when hero photos appear ---------- */
const stamp = document.getElementById('heroStamp');
if (stamp) {
  if (reduceMotion) {
    stamp.style.opacity = '1';
  } else if ('IntersectionObserver' in window) {
    const sio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stamp.classList.add('slam');
          sio.disconnect();
        }
      });
    }, { threshold: 0.4 });
    sio.observe(stamp);
  } else {
    stamp.classList.add('slam');
  }
}

/* ---------- hero tilt: physical, barely there (desktop only) ---------- */
const heroPhotos = document.getElementById('heroPhotos');
const heroTilt = document.getElementById('heroTilt');
const finePointer = window.matchMedia('(pointer: fine)').matches;
if (heroPhotos && heroTilt && finePointer && !reduceMotion) {
  let raf = null;
  heroPhotos.addEventListener('mouseenter', () => {
    heroTilt.style.transition = 'none';
  });
  heroPhotos.addEventListener('mousemove', (e) => {
    const r = heroPhotos.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      heroTilt.style.transition = 'none';
      heroTilt.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });
  });
  heroPhotos.addEventListener('mouseleave', () => {
    if (raf) cancelAnimationFrame(raf);
    heroTilt.style.transition = '';
    heroTilt.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}
