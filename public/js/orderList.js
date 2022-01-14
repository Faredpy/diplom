const statusBar = document.querySelector('.status-table')
const productRow = document.querySelector('#product-row')
const table = document.querySelector('.table')


table.addEventListener('click', async (e) => {
  if (e.target.type !== "button") {
    return
  }
  let newStatus;
  let newStatusText

  if (e.target.dataset.type === 'confirm') {
    newStatus = 'CONFIRM'
    newStatusText = 'Подтвержден'
  } else if (e.target.dataset.type === 'cancel') {
    newStatus = 'CANCEL'
    newStatusText = 'Отменен'
  }



  const orderId = Number(e.target.dataset.orderid)
  console.log(orderId);
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

  statusBar.innerText = newStatusText

  confirmBut.remove()
  cancelBut.remove()
})
