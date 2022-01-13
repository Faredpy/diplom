const ticketForm = document.querySelector('#ticketForm');

ticketForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const description = event.target.description.value;
  const title = event.target.title.value

  const response = await fetch('/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description, title }),
  });

  const statham = await response.json();
  console.log(response);
  if (response.status === 200) {
    window.location = '/';
  }
  if (response.status === 500) {
    alert(`На сервере произошла беда(`);
  }
});