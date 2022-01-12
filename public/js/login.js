const formLog = document.querySelector("#formLog")
console.log('привет')

formLog.addEventListener("submit", async(event) => {
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

    window.location = ('/')
})