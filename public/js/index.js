
const tbody = document.querySelector("#tbody")
async function fetchGo() {
    const response = await fetch ('/orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'FetchReq': "1"
        }
    })

    const statham = await response.json()
    const resultHTML = render(statham.allOrders)
    tbody.insertAdjacentHTML("afterbegin", resultHTML)
    console.log(tbody)
}

function render (arr) {
    let result = ``
    arr.forEach(el => {
        result += `
                    <tr>
                        <th scope="row" id="product-row" data-orderId="${el.id}">${el.Product.title}</th>
                        <td>${el.Tag.title}</td>
                        <td>${el.scopeOfWork}</td>
                        <td>${el.description}</td>
                        <td>${el.UserManager.User.firstName}
                            ${el.UserManager.User.lastName}<br>${el.UserManager.User.email}<br>${el.UserManager.User.phoneNumber}
                        </td>
                        <td class="status-table">${el.Status.title}</td>
                        <td>${el.createdAt}</td>
                    </tr>
                    `
    })
    return result
}

fetchGo()

