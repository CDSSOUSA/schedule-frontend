console.log('carregando o arquivo')

listYear()

async function listYear() {
    showLoading()  
    getYearActive()  
    
    await axios.get(`${URL_BASE}/${URIS.year.list}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            //document.querySelector("#tb_series > tbody").innerHTML = `${loadDataSeries(data)}`;
            document.querySelector("#tb_year > tbody").innerHTML = `${loadDataYear(data)}`;
            
            //showSeries(idSerie)
            hideLoading();
        }
        )
        .catch(error => console.log(error))
}

async function getYearActive()
{
    try{
        await axios.get(`${URL_BASE}/${URIS.year.active}`)
            .then(response => {
                const data = response.data;
                console.log(data);
                //document.querySelector("#tb_series > tbody").innerHTML = `${loadDataSeries(data)}`;
                document.getElementById('idYearActive').value = data[0].id            
                    
            }
            )
            .catch(error => console.log(error))
    } catch (error) {

    }
   

}

function loadDataYear(data) {

    let row = ''
    let display = ''
    let color = 'text-white'
    //if (data) {
        data.forEach((elem, indice) => {
            if(elem.status == 'I') {
                display = 'disabled'
                color = 'text-secondary'
            }
            row += `<tr class="text-center align-middle">
                        <td scope="row" class="text-center align-middle">
                            <h5 class="text-sm ${color}">${elem.description}</h5>
                        </td>
                        <td scope="row" class="text-center align-middle">
                            <h5 class="text-sm ${color} font-weight-bold p-1">${convertStatus(elem.status)}</h5>                
                        </td>
                        <td scope="row" class="text-center align-middle">
                            <a class="btn btn-link ${display} text-white px-3 mb-0" href="#" onclick="editYear(${elem.id})" data-bs-toggle="modal" data-bs-target="#editYearModal"><i
                                class="fas fa-pencil-alt text-white me-2" aria-hidden="true"></i>Editar</a>
                        </td>                       
                    </tr>`
                   
        })

    //}

    return row;

}

const addYearForm = document.getElementById('addYearForm');


if (addYearForm) {
    addYearForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        //load();
        const dataForm = new FormData(addYearForm);
        await axios.post(`${URL_BASE}/${URIS.year.create}`, dataForm, {
            headers: {
                "Content-Type": "application/json",
                //"Authorization": Cookies.get("token"),
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.error) {
                    
                    console.log(response.data)
                    document.getElementById('msgAlertErrorYear').innerHTML = response.data.msg
                    validateErros(response.data.msgs.description, 'fieldAlertErrorDescriptionYear')   

                } else {

                    //addSeriesModal.hide();

                    addYearForm.reset();
                    //localStorage.setItem('idSeriesStorege', response.data.id)
                    loadToast(typeSuccess, titleSuccess, messageSuccess);
                    listYear();

                }
            })
            .catch(error => console.log(error))
    })
}



async function editYear(id) {

    eraseAlert(['msgAlertErrorYearEdit','fieldAlertErrorDescriptionYearEdit'])  

    try{
        await axios.get(`${URL_BASE}/${URIS.year.show}/${id}`)
            .then(response => {
                const data = response.data;
                console.log(data);
                //document.querySelector("#tb_series > tbody").innerHTML = `${loadDataSeries(data)}`;
                document.getElementById('idYear').value = data.id            
                document.getElementById('descriptionYearEdit').value = data.description            
            }
            )
            .catch(error => console.log(error))
    } catch (error) {

    }
   
}

const editYearForm = document.getElementById('editYearForm');
const editYearModal = new bootstrap.Modal(document.getElementById('editYearModal'));


if (editYearForm) {
    editYearForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        //load();
        const dataForm = new FormData(editYearForm);
        await axios.post(`${URL_BASE}/${URIS.year.update}`, dataForm, {
            headers: {
                "Content-Type": "application/json",
                //"Authorization": Cookies.get("token"),
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.error) {
                   
                    console.log(response.data)
                    document.getElementById('msgAlertErrorYearEdit').innerHTML = response.data.msg
                    validateErros(response.data.msgs.description, 'fieldAlertErrorDescriptionYearEdit')                    

                } else {

                    //addSeriesModal.hide();

                    editYearForm.reset();
                    editYearModal.hide()
                    //localStorage.setItem('idSeriesStorege', response.data.id)
                    loadToast(typeSuccess, titleSuccess, messageSuccess);
                    listYear();

                }
            })
            .catch(error => console.log(error))
    })
}
