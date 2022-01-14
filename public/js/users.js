const btnProf = document.querySelector('#btnProf')
const tagsArr = []
const role = document.querySelector('#role').innerText
if(role === 'Менеджер' || role === 'Администратор') {
    document.querySelector('.manager-div').hidden = true
    document.querySelector('.footer-div').style = "margin-top:50px"
}
if(role === 'Администратор') {

}

if (document.querySelector("#tagButton")) {
    const tagButton = document.querySelector("#tagButton")
    tagButton.addEventListener("click", (event) => {
        let tag = document.querySelector('#tags').value
        if (tag.length > 0) {
            tagsArr.push(tag)
            const skills = document.querySelector("#skills")
            const progress = document.querySelector("#progress")
            document.querySelector("#tags").value = ''
            skills.insertAdjacentHTML("beforeend", `<span class="label label-primary mr5 mb10 ib lh15" style="background-color:#babdbf">${tag}</span> `)
            progress.insertAdjacentHTML("beforeend", `
                                                                        
                                                                        <p>${tag}</p>
                                                                        <div class="progress mb-3" style="height: 5px">
                                                                            <div class="progress-bar bg-success" role="progressbar" style="width: 10%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                                                                        </div>
                                                                    `)
        }
    })
}


btnProf.addEventListener("click", async (event) => {

    const id = document.querySelector('#idH').value
    const email = document.querySelector('#email').value
    const firstName = document.querySelector('#firstName').value
    const lastName = document.querySelector('#lastName').value
    const phoneNumber = document.querySelector('#phoneNumber').value
    const role = document.querySelector('#role').innerText
    let objUpdate = {}
    if (id) objUpdate.id = id
    if (email) objUpdate.email = email
    if (firstName) objUpdate.firstName = firstName
    if (lastName) objUpdate.lastName = lastName
    if (phoneNumber) objUpdate.phoneNumber = phoneNumber





    if (role === 'Пользователь') {

    }else if(role === 'Менеджер'){
        if(tagsArr.length > 0) objUpdate.tags = tagsArr
        // const aria = document
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
    if (response.status !== 200) {
        alert('Ошибонька')
    }


    const nameAndLast = document.querySelector("#headOne")
    console.log(firstName)
    console.log(lastName)
    nameAndLast.textContent = `${firstName} ${lastName}`

})


