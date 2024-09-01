
window.onload = async () => {
    loadHistory();
    loadAccount();
}

async function loadHistory() {

    const res = await fetch('/history')
    const details = await res.json()
    const LvContent = document.querySelector('.LiverpoolContent')
    const MuContent = document.querySelector('.ManchesterUnitedContent')
    const McContent = document.querySelector('.ManchesterCityContent')
    const personalBtn = document.querySelector('.personalBtn')

    console.log(details)
    if (details == 'Please Log in !') {

        console.log('Please Log In')

    } else {
        for (detail of details) {
            if (detail.name === 'Manchester United') {
                if (detail.photo_name === "") {
                    MuContent.innerHTML =
                        `<div class="d-flex flex-column text-light border border-warning rounded p-3">
                        <div class="d-flex justify-content-center">
                            <img src="uploads/null.jpg" class="clubPhoto w-25" alt="???" /></img>
                        </div>
                        <span>Manchester United</span>
                        <span>Added at: ???</span>
                        <div>
                            <a class="btn btn-warning btn-sm mt-2" href="/" role="button">Add</a>
                        </div>
                    </div>`
                } else {
                    MuContent.innerHTML =
                        `<div class="d-flex flex-column text-light border border-warning rounded p-3">
                        <div class="d-flex justify-content-center">
                            <img src="uploads/${detail.photo_name}" class="clubPhoto" width="100px" alt="???"/>
                        </div>
                        <span>Manchester United</span>
                        <span>Added at: ${detail.created_at.substring(0, 10)}</span>
                        <div>
                            <button class="${detail.id} ${detail.photo_name} delBtn btn btn-warning btn-sm mt-2">Delete</button>
                        </div>
                    </div>`
                }
            } else if (detail.name === 'Liverpool') {
                console.log('is Liverpool')
                if (detail.photo_name === "") {
                    LvContent.innerHTML =
                        `<div class="d-flex flex-column text-light border border-warning rounded p-3">
                        <div class="d-flex justify-content-center">
                            <img src="uploads/null.jpg" class="clubPhoto w-25" alt="???" /></img>
                        </div>
                        <span>Liverpool</span>
                        <span>Added at: ???</span>
                        <div>
                            <a class="btn btn-warning btn-sm mt-2" href="/" role="button">Add</a>
                        </div>
                    </div>`
                } else {
                    LvContent.innerHTML =
                        `<div class="d-flex flex-column text-light border border-warning rounded p-3">
                    <div class="d-flex justify-content-center">
                        <img src="uploads/${detail.photo_name}" class="clubPhoto" width="100px" alt="???"/>
                    </div>
                    <span>Liverpool</span>
                    <span>Added at: ${detail.created_at.substring(0, 10)}</span>
                    <div>
                       <button class="${detail.id} ${detail.photo_name} delBtn btn btn-warning btn-sm mt-2">Delete</button>
                    </div>  
                </div>`
                }
                console.log('finish change inner')
            } else if (detail.name === 'Manchester City') {
                if (detail.photo_name === "") {
                    McContent.innerHTML =
                        `<div class="d-flex flex-column text-light border border-warning rounded p-3">
                        <div class="d-flex justify-content-center">
                            <img src="uploads/null.jpg" class="clubPhoto w-25" alt="???" /></img>
                        </div>
                        <span>Manchester City</span>
                        <span>Added at: ???</span>
                        <div>
                            <a class="btn btn-warning btn-sm mt-2" href="/" role="button">Add</a>
                        </div>
                    </div>`
                } else {
                    McContent.innerHTML =
                        `<div class="d-flex flex-column text-light border border-warning rounded p-3">
                    <div class="d-flex justify-content-center">
                        <img src="uploads/${detail.photo_name}" class="clubPhoto" width="100px" alt="???"/>
                    </div>
                    <span>Manchester City</span>
                    <span>Added at: ${detail.created_at.substring(0, 10)}</span>
                    <div>
                        <button class="${detail.id} ${detail.photo_name} delBtn btn btn-warning btn-sm mt-2">Delete</button>
                    </div>  
                </div>`
                }
            }


            const deleteBtns = document.querySelectorAll('.delBtn')

            deleteBtns.forEach((deleteBtn, index) => {
                deleteBtn.addEventListener('click', async () => {

                    const res = await fetch(`/deleteClub`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: deleteBtn.classList[0], photo_name:deleteBtn.classList[1]})
                    });
                    window.location.reload()

                })
            })
        }
        personalBtn.innerHTML =
            `<div class="dropdown">
            <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Hi ! ${details[0].username}
            </button>
            <ul class="dropdown-menu">
            <li>
                <button type="button" class=" btn" data-bs-toggle="modal" data-bs-target="#myAccountModal">
                    My Account   
                </button>
            </li>
            <li><a class="dropdown-item" href="/logout">Log lout</a></li>
            </ul>
        </div>`

    }

}

async function loadAccount() {

    const res = await fetch('/getUser')
    const details = await res.json()
    const personalContent = document.querySelector('.modalContainer')

    if (details == 'Please Log in !') {

        console.log('Please Log In')

    } else {
        personalContent.innerHTML =
            `<div class="modal fade" id="myAccountModal" tabindex="-1" aria-labelledby="myAccountModalLabel" aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="myAccountModalLabel">My Account</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="px-3">
                                <div class="form-floating mb-3">
                                    <input name="email" type="email" class="newEmail form-control" id="floatingInput"
                                        value="${details[0].email}" required>
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div class="form-floating mb-4">
                                    <input name="password" type="" class="newPassword form-control" id="floatingPassword"
                                        value="${details[0].password}" required>
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input name="name" type="name" class="newName form-control" id="floatingInput"
                                        value="${details[0].name}" required>
                                    <label for="floatingInput">Username</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input class="newDateOfBirth form-control" id="floatingInput"
                                        value="${details[0].date_of_birth.substring(0, 10)}" required>
                                    <label for="floatingInput">Date Of Birth</label>
                                </div>
                                <div class="d-grid gap-2 mb-4">
                                    <button type="submit" class="editSubmit col btn btn-primary">Save</button>
                                    <!-- <a href="#">Forget password?</a> -->
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`;

        const editSubmitBtn = document.querySelector('.editSubmit')
        editSubmitBtn.addEventListener('click', async () => {

            const updateEmail = document.querySelector(".newEmail")
            const updatePassword = document.querySelector(".newPassword")
            const updateName = document.querySelector(".newName")
            const updateDateOfBirth = document.querySelector(".newDateOfBirth")

            const res = await fetch(`/editUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: updateEmail.value, password: updatePassword.value, name: updateName.value, date_of_birth: updateDateOfBirth.value })
            });
            window.location.reload()
        })
    }




}

document.getElementById('switchToDark').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') == 'light') {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
    else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
})

document.getElementById('switchToLight').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
    }
    else {
        document.documentElement.setAttribute('data-bs-theme', 'light')
    }
})


