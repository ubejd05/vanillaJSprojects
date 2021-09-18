const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const openBtn = document.getElementById('open');
const modal = document.getElementById('modal');

// Toggle navigation
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('show-nav')
})

// Show modal
openBtn.addEventListener('click', () => modal.classList.add('show-modal'));
// Hide modal
closeBtn.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on outside click 
window.addEventListener('click', e => e.target == modal ?  modal.classList.remove('show-modal') : false)