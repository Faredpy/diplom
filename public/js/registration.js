const formReg = document.querySelector("#formReg")

formReg.addEventListener("submit", async(event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const checkUser = event.target.checkUser.checked
    const checkManager = event.target.checkManager.checked

    const response = await fetch('/users/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, checkUser, checkManager})
    })

    const statham = await response.json()
    if(response.status === 400) {
        alert ('Некорректный email или пароль.')
    }else if (response.status === 403) {
        alert(`Пользователь с таким email уже существует`)
    }else if (response.status === 500) {
        alert(`Ошибка на сервере: ${statham.error}`)
    }else if (response.status !== 200) {
        alert('Неизвестная ошибка')
    }

    window.location = ('/users')
})