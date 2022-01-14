const confirmBut = document.querySelector('#success-btn');
const cancelBut = document.querySelector('#cancel-btn');
const statusBar = document.querySelector('.status-table')
const productRow = document.querySelector('#product-row')


confirmBut.addEventListener('click', async (e) => {
  const newStatus = 'CONFIRM'
  const orderId = Number(productRow.data.orderId)
  const response = await fetch('/orders', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newStatus, orderId }),
  })

  if (response.status !== 200) {
    return alert('Ошибочка')
  }

  statusBar.innerText = 'Подтвержден'

})

cancelBut.addEventListener('click', async (e) => {
  const newStatus = 'CANCEL'
  const orderId = Number(productRow.data.orderId)
  const response = await fetch('/orders', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newStatus, orderId }),
  })

  if (response.status !== 200) {
    return alert('Ошибочка')
  }

  statusBar.innerText = 'Отменен'

})
