const continueButton = document.querySelector('#continueButton')
const productSelector = document.querySelector('#productSelect')
const tagsInput = document.querySelector('#exampleDataList')
const scopeInput = document.querySelector('#exampleFormControlInput1')
const orderForm = document.querySelector('#orderForm')
const managerList = document.querySelector('#managerList')
const descriptionInput = document.querySelector('#exampleFormControlTextarea1')

let idTag

function generateHTML(arr) {
  let result = ``;
  arr.forEach((el, index) => {
    result += `<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault${index}" value="${el.id}">
      <label class="form-check-label" for="flexRadioDefault1">
        <div class="card" style="width: 18rem;">
  <img src="/img/icons8-manager-100.png" class="card-img-top" alt="..." style="width:50%">
  <div class="card-body">
    <h5 class="card-title">${el.firstName} ${el.lastName}</h5>
    <p class="card-text">${el.email}<br>${el.phoneNumber}
    </p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${arr[0].tagTitle}</li>
  </ul>
</div>
      </label>`
  });
  return result
}

continueButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const tagsInputValue = tagsInput.value
  const response = await fetch('/managers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tagsInputValue }),
  })

  const statham = await response.json()
  if (response.status !== 200) {
    return alert('Error');
  }
  console.log(statham.managersRaw);
  idTag = statham.managersRaw[0].tagId
  const resultHTML = generateHTML(statham.managersRaw)
  const submitButton = `<button type="submit" class="btn btn-primary">Отправить</button>`
  managerList.insertAdjacentHTML('afterbegin', resultHTML)
  managerList.insertAdjacentHTML('afterend', submitButton)

  continueButton.remove()

})


orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log(e.target);
  const objAll = {}
  objAll.currTag = idTag
  objAll.currProd = Number(e.target.changeProduct.value)
  objAll.currScope = e.target.Scope.value
  objAll.currDescr = e.target.description.value
  objAll.currManag = Number(e.target.flexRadioDefault.value)

  const response = await fetch('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objAll),
  })
  if (response.status !== 200) {
    return alert('error')
  }
  window.location = ('/')
})