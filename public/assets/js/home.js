
function getTokenFromUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    const myParams = urlParams.get('token')
    return myParams
}

const logout = ()=> {
    window.location.href = `${URL_FRONT}/`
}

const redirectLogin = () => {
    window.location.href = `${URL_FRONT}}`
} 