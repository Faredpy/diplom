const signInButton = document.querySelector("#signin")
const signUpButton = document.querySelector("#signup")
const logoutButton = document.querySelector("#logout")
const profileButton = document.querySelector("#profile")
const requestButton = document.querySelector("#request")

if (requestButton) {
    requestButton.addEventListener("click", () => {
        window.location = ('/orders/form')
    })
}

if (signInButton) {
    signInButton.addEventListener("click", () => {
        window.location = ('/users/login')
    })
    signUpButton.addEventListener("click", () => {
        window.location = ('/users/registration')
    })
}

if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        const response = await fetch('/logout', {
            method: 'DELETE'
        })
        if (response.status !== 200) {
            alert('сессия отсутсвует')
        }

        window.location = ('/users')
    })
}

if (profileButton) {
    profileButton.addEventListener("click", () => {
        window.location = ('/users')
    })
}
