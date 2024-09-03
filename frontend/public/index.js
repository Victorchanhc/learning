window.onload = async function loadPersonal() {
	const res = await fetch('/getUser')
	const detail = await res.json()
	const personalBtn = document.querySelector('.personalBtn')
	const personalContent = document.querySelector('.modalContainer')

	console.log(detail)
	if (detail == 'Please Log in !') {
		console.log('')
	} else {
		personalBtn.innerHTML = `<div class="dropdown">
            <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Hi ! ${detail[0].name}
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
		personalContent.innerHTML = `<div class="modal fade" id="myAccountModal" tabindex="-1" aria-labelledby="myAccountModalLabel" aria-hidden="true">
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
                                    value="${detail[0].email}" required>
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating mb-4">
                                <input name="password" type="" class="newPassword form-control" id="floatingPassword"
                                    value="${detail[0].password}" required>
                                <label for="floatingPassword">Password</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input name="name" type="name" class="newName form-control" id="floatingInput"
                                    value="${detail[0].name}" required>
                                <label for="floatingInput">Username</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input class="newDateOfBirth form-control" id="floatingInput"
                                    value="${detail[0].date_of_birth.substring(0, 10)}" required>
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
        </div>`

		const editSubmitBtn = document.querySelector('.editSubmit')
		editSubmitBtn.addEventListener('click', async () => {
			const updateEmail = document.querySelector('.newEmail')
			const updatePassword = document.querySelector('.newPassword')
			const updateName = document.querySelector('.newName')
			const updateDateOfBirth = document.querySelector('.newDateOfBirth')

			const res = await fetch(`/editUser`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: updateEmail.value,
					password: updatePassword.value,
					name: updateName.value,
					date_of_birth: updateDateOfBirth.value
				})
			})
			window.location.reload()
		})
	}
}

const input = document.getElementById('formFileMultiple')
input.addEventListener('change', handleFilesImage, false)

function handleFilesImage() {
	const fileData = this.files
	const reader = new FileReader()
	reader.addEventListener('load', (file) => {
		const img = document.getElementById('Im_image')
		img.src = file.target.result
	})
	reader.readAsDataURL(fileData[0])
}

document
	.querySelector('#contact-form')
	.addEventListener('submit', async function (event) {
		event.preventDefault()

		// Serialize the Form afterwards
		const form = event.target
		const formData = new FormData(form)

		// Submit FormData(), no need to add "Content-Type": "application/json"
		const res = await fetch('/find', {
			method: 'POST',
			body: formData
		})
		const result = (await res.json()).data // { success: true }
		let clubName = ''
		const result_data = document.querySelector('#contact-result')
		if (result[0].probability < 0.65) {
			result_data.innerHTML = `<div>Sorry!! I can't find it! Please take a photo again!</div>`
		} else {
			clubName = result[0].name
			result_data.innerHTML = `<h1>${result[0].name}</h1>`
		}
		// const result_answer =
		const result_detail = document.querySelector('#result-detail')
		if (clubName === 'Manchester United') {
			const clubId = 1

			result_detail.innerHTML = `<div>曼徹斯特聯足球俱樂部簡稱曼聯，是一家位於英國大曼徹斯特郡特拉福德的足球俱樂部，前身為成立於1878年的「紐頓希斯LYR」，1902年改名為曼徹斯特聯。目前於英格蘭超級足球聯賽比賽。球隊主場為老特拉福球場。 曼聯是英格蘭其中一個足球俱樂部，共擁有67項冠軍獎盃，並同時保持英格蘭頂級聯賽及英格蘭社區盾最多冠軍的紀錄。
        <a class="ruhjFe NJLBac fl" href="https://zh.wikipedia.org/zh-tw/%E6%9B%BC%E5%BE%B9%E6%96%AF%E7%89%B9%E8%81%AF%E8%B6%B3%E7%90%83%E4%BF%B1%E6%A8%82%E9%83%A8" data-ved="2ahUKEwiduLuW8dSHAxXlVkEAHdZdKwoQmhN6BAgbEAI" ping="/url?sa=t&amp;source=web&amp;rct=j&amp;opi=89978449&amp;url=https://zh.wikipedia.org/zh-tw/%25E6%259B%25BC%25E5%25BE%25B9%25E6%2596%25AF%25E7%2589%25B9%25E8%2581%25AF%25E8%25B6%25B3%25E7%2590%2583%25E4%25BF%25B1%25E6%25A8%2582%25E9%2583%25A8&amp;ved=2ahUKEwiduLuW8dSHAxXlVkEAHdZdKwoQmhN6BAgbEAI">
          <span>維基百科</span>
        </a>
        <div class="saveControlContainer d-flex justify-content-center">
          <div class="pt-3">
            <div class="text-center">Save to History ?</div>
            <input type="text" name="fileName" id="fileNameInPut" value="${result[0].file_name}" hidden>
            <input type="text" name="clubId" id="clubIdInPut" value="${clubId}" hidden>
            <button class="btn btn-secondary me-2" id="saveBtn">SAVE</button>
            <button class="btn btn-secondary ms-2" id="deleteBtn">DELETE</button>
          </div>
        </div>
      </div>`
		} else if (clubName === `Liverpool`) {
			const clubId = 2

			result_detail.innerHTML = `<div>利物浦足球俱樂部是一家位於英國英格蘭西北部默西賽德郡港口城市利物浦的英格蘭非職業足球俱樂部。俱樂部成立於1892年6月3日，次年加入英格蘭足球聯賽，自成立以來一直以安菲爾德球場作為主場。 
        <a class="ruhjFe NJLBac fl" href="https://zh.wikipedia.org/zh-tw/%E5%88%A9%E7%89%A9%E6%B5%A6%E8%B6%B3%E7%90%83%E4%BF%B1%E4%B9%90%E9%83%A8" data-ved="2ahUKEwic1dGv8dSHAxVyTEEAHRypNkoQmhN6BAgjEAI" ping="/url?sa=t&amp;source=web&amp;rct=j&amp;opi=89978449&amp;url=https://zh.wikipedia.org/zh-tw/%25E5%2588%25A9%25E7%2589%25A9%25E6%25B5%25A6%25E8%25B6%25B3%25E7%2590%2583%25E4%25BF%25B1%25E4%25B9%2590%25E9%2583%25A8&amp;ved=2ahUKEwic1dGv8dSHAxVyTEEAHRypNkoQmhN6BAgjEAI">
          <span>維基百科</span>
        </a>
        <div class="saveControlContainer d-flex justify-content-center">
          <div class="">
            <div class="text-center">Save to History ?</div>
            <input type="text" name="fileName" id="fileNameInPut" value="${result[0].file_name}" hidden>
            <input type="text" name="clubId" id="clubIdInPut" value="${clubId}" hidden>
            <button class="btn btn-secondary me-2" id="saveBtn">SAVE</button>
            <button class="btn btn-secondary ms-2" id="deleteBtn">DELETE</button>
          </div>
        </div>
      </div>`
		} else if (clubName === 'Manchester City') {
			const clubId = 3

			result_detail.innerHTML = `<div>曼徹斯特城足球俱樂部，簡稱曼城，是一家位於英國曼徹斯特的足球俱樂部，前身為成立於1880年的「聖馬可的西戈頓」，1887年改名為阿德維克足球俱樂部，1894年改名為「曼徹斯特城」。同年，曼城正式採用天藍色作主場球衣顏色，這也是他們被稱為藍月亮的第一個賽季。目前於英格蘭超級聯賽比賽。球隊主場為阿提哈德球場。 
        <a class="ruhjFe NJLBac fl" href="https://zh.wikipedia.org/zh-tw/%E6%9B%BC%E5%BD%BB%E6%96%AF%E7%89%B9%E5%9F%8E%E8%B6%B3%E7%90%83%E4%BF%B1%E4%B9%90%E9%83%A8" data-ved="2ahUKEwiar76f6dSHAxXjQUEAHQg9ML0QmhN6BAggEAI" ping="/url?sa=t&amp;source=web&amp;rct=j&amp;opi=89978449&amp;url=https://zh.wikipedia.org/zh-tw/%25E6%259B%25BC%25E5%25BD%25BB%25E6%2596%25AF%25E7%2589%25B9%25E5%259F%258E%25E8%25B6%25B3%25E7%2590%2583%25E4%25BF%25B1%25E4%25B9%2590%25E9%2583%25A8&amp;ved=2ahUKEwiar76f6dSHAxXjQUEAHQg9ML0QmhN6BAggEAI">
          <span>維基百科</span>
        </a>
        <div class="saveControlContainer d-flex justify-content-center">
          <div class="">
            <div class="text-center">Save to History ?</div>
            <input type="text" name="fileName" id="fileNameInPut" value="${result[0].file_name}" hidden>
            <input type="text" name="clubId" id="clubIdInPut" value="${clubId}" hidden>
            <button class="btn btn-secondary me-2" id="saveBtn">SAVE</button>
            <button class="btn btn-secondary ms-2" id="deleteBtn">DELETE</button>
          </div>
        </div>
      </div>`
		} else {
			result_detail.innerHTML = `<div></div>`
		}
		document
			.querySelector('#saveBtn')
			.addEventListener('click', async () => {
				const fileName = document.querySelector('#fileNameInPut')
				const clubId = document.querySelector('#clubIdInPut')

				const res = await fetch(`/savePhoto`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						file_name: fileName.value,
						club_id: clubId.value
					})
				})
				window.location.reload()
			})

		document
			.querySelector('#deleteBtn')
			.addEventListener('click', async () => {
				console.log('deeee')
				const fileName = document.querySelector('#fileNameInPut')
				const res = await fetch(`/deletePhoto`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ file_name: fileName.value })
				})
				window.location.reload()
			})
	})

document.getElementById('switchToDark').addEventListener('click', () => {
	if (document.documentElement.getAttribute('data-bs-theme') == 'light') {
		document.documentElement.setAttribute('data-bs-theme', 'dark')
	} else {
		document.documentElement.setAttribute('data-bs-theme', 'dark')
	}
})

document.getElementById('switchToLight').addEventListener('click', () => {
	if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
		document.documentElement.setAttribute('data-bs-theme', 'light')
	} else {
		document.documentElement.setAttribute('data-bs-theme', 'light')
	}
})
