const formLog = document.querySelector("#formLog")

formLog.addEventListener("submit", async(event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({email, password})
    })
    const statham = await response.json()
    if(response.status === 400) {
        alert('Некорректный логин или пароль')
    }else if(response.status === 402) {
        alert('Пользователя с такой почтой не существует')
    }else if(response.status === 403) {
        alert('Неверный пароль')
    }else if(response.status === 500) {
        alert(`Ошибка ${statham.error}`)
    }


    window.location = ('/users')
})