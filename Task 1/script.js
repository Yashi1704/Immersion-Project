const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');

addBtn.addEventListener('click', () => {
  const progressBar = document.createElement('div');
  progressBar.classList.add('progress-bar');

  const fill = document.createElement('div');
  fill.classList.add('fill');
  progressBar.appendChild(fill);
  container.appendChild(progressBar);

  let progress = 0;
  const interval = setInterval(() => {
    progress++;
    fill.style.width = progress + '%';
    if (progress >= 100) clearInterval(interval);
  }, 20);
});
