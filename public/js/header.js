const homeButton = document.querySelector('#home')
const signInButton = document.querySelector("#signin")
const signUpButton = document.querySelector("#signup")
const logoutButton = document.querySelector("#logout")
const ticketsButton = document.querySelector("#tickets")


if(signInButton) {
    homeButton.addEventListener("click", () => {
        window.location = ('/')
    })
    signInButton.addEventListener("click", () => {
        window.location = ('/users/login')
    })
    signUpButton.addEventListener("click", () => {
        window.location = ('/users/registration')
    })
}

if(logoutButton){
    logoutButton.addEventListener("click", async () => {
        const response = await fetch('/logout', {
            method: 'DELETE'
        })
        if(response.status !== 200) {
            alert('сессия отсутсвует')
        }

        window.location = ('/users')
    })
}

if(ticketsButton) {
    ticketsButton.addEventListener("click", async () => {
        window.location = ('/tickets')
    })
}