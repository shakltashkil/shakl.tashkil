const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.info-card, .service-card, .stat-card, .step, .adv-list article, .contact-card, .section-heading, .intro-panel, .dark-feature, .detail-banner, .chairman-text').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

const counters = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target);

    if (target === 24) {
      el.textContent = '24/7';
      obs.unobserve(el);
      return;
    }

    let current = 0;
    const duration = 900;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      el.textContent = `${current}%`;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    obs.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/* Contact form -> WhatsApp. No backend is required for the current static website. */
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const whatsappNumber = '966578749600';

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName')?.value.trim() || '';
    const phone = document.getElementById('clientPhone')?.value.trim() || '';
    const email = document.getElementById('clientEmail')?.value.trim() || '';
    const project = document.getElementById('projectType')?.value.trim() || '';
    const message = document.getElementById('clientMessage')?.value.trim() || '';

    const text = [
      'طلب جديد من موقع شكل وتشكيل',
      '',
      `الاسم: ${name}`,
      `رقم الجوال: ${phone}`,
      email ? `البريد الإلكتروني: ${email}` : '',
      project ? `نوع المشروع: ${project}` : '',
      `الرسالة: ${message}`
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (formMessage) {
      formMessage.textContent = 'سيتم فتح واتساب لإرسال طلبك مباشرة إلى الشركة.';
      formMessage.className = 'form-message success';
    }
  });
}

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});
