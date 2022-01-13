const btnProf = document.querySelector('#btnProf')

btnProf.addEventListener("click", async (event) => {
    const email = document.querySelector('#email').value
    const firstName = document.querySelector('#firstName').value
    const lastName = document.querySelector('#lastName').value
    const phoneNumber = document.querySelector('#phoneNumber').value
    const role = document.querySelector('#role').innerText
    let objUpdate = {}
    if(email) objUpdate.email = email
    if(firstName) objUpdate.firstName = firstName
    if(lastName) objUpdate.lastName = lastName
    if(phoneNumber) objUpdate.phoneNumber = phoneNumber

    if(role === 'Пользователь'){

    }else if(role === 'Менеджер'){

    }else if(role === 'Администратор'){

    }

    const response = await fetch('/users', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(objUpdate)
    })
    const statham = await response.json()
    console.log(statham)
    if(response.status !== 200) {
        alert('Ошибонька')
    }

    // window.location = ('/users')

})