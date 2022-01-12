const formLog = document.querySelector("#formLog")

formLog.addEventListener("submit", async(event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJyZWRAcmVkIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2NDIwMDQ5MzcsImV4cCI6MTY0MjA5MTMzN30.oPqGT-7intp9khCI-Y9pZ0VUhHtFeFA5Xvb50oBsM3E`
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