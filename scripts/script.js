document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.navbar');
  const footer = document.querySelector('.footer');

  Promise.all([
    fetch('../components/navbar.html').then(res => res.text()),
    fetch('../components/footer.html').then(res => res.text())
  ])
  .then(data => {
    nav.innerHTML = data[0];
    footer.innerHTML = data[1];
  })
  .catch(error => console.error('Error fetching components:', error));
});

