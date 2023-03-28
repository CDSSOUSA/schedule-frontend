const URL_BASE = 'http://localhost/gerenciador-horario/public';
const URL_FRONT = 'http://localhost/schedule-frontend/public';

const URIS = {
    login: {
        in: "login",
        out: "logout"
    },
    teacher: "teacher"
}

const eraseAlert = (option) => {

    if (typeof option == 'string') {
        document.getElementById(option).innerHTML = '';
    } else {
        option.forEach((e) => {
            document.getElementById(e).innerHTML = '';
        })
    }
}

const loginForm = document.getElementById('loginForm');
console.log(loginForm)

if (loginForm) {

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const dataForm = new FormData(loginForm);

        try {
            await axios.post(`${URL_BASE}/${URIS.login.in}`, dataForm, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.data.error) {
                        
                        console.log('errro')
                        document.getElementById('msgAlert').innerHTML = response.data.msg
                        document.getElementById('msgAlertToken').textContent = response.data.msgs.token
    
                    } else{

                        loadMain();
                    }
                })
                .catch(error => console.log(error))
        } catch (error) {

        }
    })
}

const loadMain = () =>{
    window.location.href = `${URL_FRONT}/${URIS.teacher}`
} 