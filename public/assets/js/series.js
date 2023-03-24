const addSeriesForm = document.getElementById('addSeriesForm');

if (addSeriesForm) {
    addSeriesForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        //load();
        const dataForm = new FormData(addSeriesForm);
        await axios.post(`${URL_BASE}/${URIS.series.create}`, dataForm, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookies.get("token"),
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.error) {
                    if(response.data.code == 500) {

                        addSeriesForm.reset();
                        //addSeriesModal.hide();
                        loadToast(typeError, titleError, messageError);
                        //listSeries();

                    }        
                    console.log(response.data)
                    document.getElementById('msgAlertErrorSeries').innerHTML = response.data.msg
                    validateErros(response.data.msgs.description, 'fieldAlertErrorDescriptionSeries')
                    validateErros(response.data.msgs.classification, 'fieldAlertErrorTurma')
                    validateErros(response.data.msgs.shift, 'fieldAlertErrorTurno')
                    validateErros(response.data.msgs.series, 'fieldAlertDuplicative') 

                } else {

                    //addSeriesModal.hide();
                   
                    addSeriesForm.reset();
                    localStorage.setItem('idSeriesStorege', response.data.id)
                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    //listSeries();

                }
            })
            .catch(error => console.log(error))
    })
}