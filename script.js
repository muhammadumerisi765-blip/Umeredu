const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const themeToggle = document.getElementById('themeToggle');
const backTop = document.getElementById('backTop');

menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const savedTheme = localStorage.getItem('nova-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
themeToggle.textContent = document.body.classList.contains('dark') ? '☀' : '☾';

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  localStorage.setItem('nova-theme', dark ? 'dark' : 'light');
  themeToggle.textContent = dark ? '☀' : '☾';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projects.forEach(project => {
      project.style.display = filter === 'all' || project.dataset.category === filter ? '' : 'none';
    });
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
  backTop.classList.toggle('show', window.scrollY > 500);
});

backTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const output = document.getElementById('formMessage');

  if (!name || !email || !subject || !message) {
    output.textContent = 'Please fill in all fields.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    output.textContent = 'Please enter a valid email address.';
    return;
  }
  output.textContent = '✓ Message submitted successfully! (Demo form)';
  e.target.reset();
});
