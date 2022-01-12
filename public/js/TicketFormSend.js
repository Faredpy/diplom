const ticketForm = document.querySelector('#ticketForm');

ticketForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const description = event.target.description.value;

  const response = await fetch('/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });

  const statham = await response.json();

  if (response.status === 500) {
    alert(`На сервере произошла беда(`);
  }

  window.location = '/';
});