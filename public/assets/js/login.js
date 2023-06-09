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
        console.log(dataForm.get('token'))

        try {
            await axios.post(`${URL_BASE}/${URIS.login.in}`, dataForm, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    console.log(response.data)
                    //if (response.data.error) {

                       // console.log('errro')
                        //document.getElementById('msgAlert').innerHTML = response.data.message.msg
                        //document.getElementById('msgAlertToken').textContent = response.data.message.msgs.token
                        

                    //} //else {
                        axios.post(`${URL_BASE}/${URIS.login.validate}`, {}, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": response.data.tokenNew,
                            }
                        }
                        )
                            .then(res => {

                                loadMain(response.data.tokenNew);
                                //return
                                console.log(res.data)

                            })
                            .catch(error => {
                                console.log(error)

                                //loadToast(typeError,titleError,messageError)
                                loadToast(typeError, titleError, new Message(error.response.data.message).getMessage());
                               
                                //redirectLogin()
                            })

                        //redirectLogin()

                    }
                )
                .catch (
                    error => {
                        //loadToast(typeError,titleError,messageError)
                        //console.log(error.response.data.error)

                        if(error.response.data.error == 400) {                            
                           
                            loadToast(typeError, titleError, new Message(error.response.data.messages.msgs.token).getMessage());
                            document.getElementById('msgAlert').innerHTML = error.response.data.messages.msg
                            document.getElementById('msgAlertToken').innerHTML = error.response.data.messages.msgs.token

                        } else {

                            loadToast(typeError, titleError, new Message(error.response.data.messages.error).getMessage());
                        }
                       
                        // //validateErros(error.response.data.messages.msgs.token, 'msgAlertToken')
                        // //console.log(error)                
                        // 

                    })
        } catch (error) {

        }
    })
}

const logout = ()=> {
    redirectLogin();
}

const loadMain = (token) => {
    window.location.href = `${URL_FRONT}/home?token=${token}`
}
const redirectLogin = () => {
    window.location.href = `${URL_FRONT}/${URIS.login.out}`
} 
var typeError = 'error';
var titleError = '<strong class="me-auto">OPS!</strong>';
var messageError = '<i class="bi bi-hand-thumbs-down-fill"></i> Ocorreu um erro, tente novamente.';

const loadToast = (type, title, message) => {

    // let toast = {
    //     title: title,
    //     message: body,
    //     status: status,
    //     timeout: 8000
    // }
    // Toast.create(toast);
    // Toast.setPlacement(TOAST_PLACEMENT.MIDDLE_CENTER);
    // Toast.setTheme(TOAST_THEME.DARK);
    // Toast.enableTimers(false);
    // $('.toast').on('hidden.bs.toast', e => {
    //     $(e.currentTarget).remove();
    //     //location.reload();
    //     //listYearSchool();
    //     //stopLoad();
    // });
    // new bootstrap.Toast(document.querySelector('#basicToast'), {
    //     animation: true,
    //     autohide: true,
    //     delay: 2000,        
    //   }).show();
    //$('#basicToast').toast('show',{delay: 2000});
    // $('#basicToast').toast('show');

    cuteAlert({
        type: type,
        title: title,
        message: message,
        buttonText: false,
        timer: 3000
    })
}