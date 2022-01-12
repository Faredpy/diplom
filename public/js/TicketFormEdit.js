const cardsContainer = document.querySelector('.card-container');

cardsContainer.addEventListener('click', async (event) => {



  if (event.target.type !== "button") {
    return
  }

  if (event.target.dataset.type === 'edit') {
    const currentDiv = document.querySelector(`#id${event.target.name}`)
    if (currentDiv.children.length > 1) {
      const temp = document.querySelector(`#div-input-${event.target.name}`)
      console.log(temp);
      return temp.remove()
    }
    currentDiv.insertAdjacentHTML('beforeend', `<div id=div-input-${event.target.name} class="input-group mb-3">
  <input id="answer-${event.target.name}" type="text" class="form-control" placeholder="Введите ответ" aria-label="Recipient's username" aria-describedby="button-addon2">
  <button name="${event.target.name}" class="btn btn-outline-secondary" type="button" data-type="send" id="button-addon2">Отправить</button>
</div>`)
  }





  if (event.target.dataset.type === 'delete') {
    const ticketId = event.target.name
    const response = await fetch('/tickets', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticketId }),
    })

    if (response.status !== 200) {
      return alert('Error!')
    } else {
      document.querySelector(`#id${event.target.name}`).remove();
    }
  }





  if (event.target.dataset.type === 'send') {
    const input = document.querySelector(`#answer-${event.target.name}`)
    const inputValue = input.value
    console.log(inputValue);
    if (inputValue < 1) {
      return alert('Поле ввода пустое')
    }
    const ticketId = event.target.name
    const response = await fetch('/tickets', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticketId, inputValue }),
    })

    if (response.status !== 200) {
      return alert('Error!')
    } else {
      document.querySelector(`#div-input-${event.target.name}`).remove();
      document.querySelector(`#id${event.target.name}`).remove();
    }
  }
})
