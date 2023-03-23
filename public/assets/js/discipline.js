var idDiscipline = localStorage.getItem('idDisciplineStorege');
listDisciplines();

async function listDisciplines() {
    idDiscipline = localStorage.getItem('idDisciplineStorege');
    await axios.get(`${URL_BASE}/${URIS.discipline.list}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            document.getElementById('li_disciplines').innerHTML = list(data)
            document.getElementById('amount_disciplines').innerHTML = `  + ${data.length}`
            showDisciplines(idDiscipline)
        }
        )
        .catch(error => console.log(error))

}

function list(data) {

    let li = ''
    if (data) {
        data.forEach((elem, indice) => {
            li += `<li><a class="dropdown-item" href="#" onclick="showDisciplines(${elem.id})">${indice + 1} - ${elem.description}</a></li>`
        })

    }

    return li;

}


async function showDisciplines(idDiscipline) {

    await axios.get(`${URL_BASE}/${URIS.discipline.show}/${idDiscipline}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            if (data) {
                //Chama o modal
                //editDisciplineModal.show();
                //Define os dados no formulário
                //document.getElementById('idDisciplineEdit').value = data.id
                document.getElementById('description').innerText = data.description
                document.getElementById('abbreviation').innerText = data.abbreviation
                document.getElementById('amount').innerText = writeZero(data.amount)
                document.getElementById('icone').innerHTML = `<img class="w-25 position-relative z-index-2 pt-4 mb-3" src="../public/assets/img/${data.icone}" alt="rocket">`
                document.getElementById('action').innerHTML = `<a class="btn btn-link text-dark px-3 mb-0" href="#" onclick="editDiscipline(${data.id})"  data-bs-toggle="modal" data-bs-target="#editDisciplineModal">
                                                                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Editar
                                                           </a>
                                                           <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="#" onclick="delDiscipline(${data.id})" data-bs-toggle="modal" data-bs-target="#deleteDisciplineModal">
                                                                <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Excluir
                                                           </a>`

            }
        })
        .catch(error => console.log(error))
}


const addDisciplineForm = document.getElementById('addDisciplineForm');

if (addDisciplineForm) {
    addDisciplineForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        //load();
        const dataForm = new FormData(addDisciplineForm);
        await axios.post(`${URL_BASE}/${URIS.discipline.create}`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.error) {
                    console.log(response.data)
                    document.getElementById('msgAlertErrorDiscipline').innerHTML = response.data.msg
                    validateErros(response.data.msgs.description, 'fieldAlertErrorDescriptionDiscipline')
                    validateErros(response.data.msgs.abbreviation, 'fieldAlertErrorAbbreviation')
                    validateErros(response.data.msgs.amount, 'fieldAlertErrorAmount')
                    validateErros(response.data.msgs.icone, 'fieldAlertErrorIcone')

                } else {

                    //addDisciplineModal.hide();
                    addDisciplineForm.reset();
                    localStorage.setItem('idDisciplineStorege', response.data.id)
                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    listDisciplines();

                }
            })
            .catch(error => console.log(error))
    })
}


const editDisciplineModal = new bootstrap.Modal(document.getElementById('editDisciplineModal'));

//Função para editar disciplina
async function editDiscipline(idDiscipline) {

    //Limpa os alert de erro do formulário
    document.getElementById('msgAlertErrorDisciplineEdit').innerHTML = ''
    document.getElementById('fieldAlertErrorDescriptionDisciplineEdit').innerHTML = ''
    document.getElementById('fieldAlertErrorAbbreviationDisciplineEdit').innerHTML = ''
    document.getElementById('fieldAlertErrorAmountDisciplineEdit').innerHTML = ''

    // Faz a chamada para buscar os dados pelo id
    await axios.get(`${URL_BASE}/${URIS.discipline.show}/${idDiscipline}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            if (data) {
                //Chama o modal
                editDisciplineModal.show();
                //Define os dados no formulário
                document.getElementById('idDisciplineEdit').value = data.id
                document.getElementById('descriptionDisciplineEdit').value = data.description
                document.getElementById('abbreviationDisciplineEdit').value = data.abbreviation
                document.getElementById('amountDisciplineEdit').value = data.amount               
                
            }
        })
        .catch(error => console.log(error))
}

const editDisciplineForm = document.getElementById('editDisciplineForm');

if (editDisciplineForm) {
    editDisciplineForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dataForm = new FormData(editDisciplineForm);
        //Faz chamada para editar os dados
        await axios.post(`${URL_BASE}/${URIS.discipline.update}`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                
                if (response.data.error) {                   
                    //Exibe os erros no preechimento do formulário
                    document.getElementById('msgAlertErrorDisciplineEdit').innerHTML = response.data.msg                                
                    validateErros(response.data.msgs.description, 'fieldAlertErrorDescriptionDisciplineEdit')
                    validateErros(response.data.msgs.abbreviation, 'fieldAlertErrorAbbreviationDisciplineEdit')
                    validateErros(response.data.msgs.amount, 'fieldAlertErrorAmountDisciplineEdit') 
                } else {
                    //Remove o modal da tela
                    editDisciplineForm.reset();
                    editDisciplineModal.hide();
                    //Carrega o alert toast
                    localStorage.setItem('idDisciplineStorege', dataForm.get('id'))
                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    listDisciplines();

                }
            })
            .catch(error => console.log(error))
    })
}



const delDisciplineModal = new bootstrap.Modal(document.getElementById('deleteDisciplineModal'));

async function delDiscipline(idDiscipline) {
    await axios.get(`${URL_BASE}/${URIS.discipline.show}/${idDiscipline}`)
        .then(response => {
            const data = response.data;
            if (data) {
                console.log(data);
                //delDisciplineModal.show();
                document.getElementById('idDisciplineDel').value = data.id
                document.getElementById('dataDelDiscipline').innerHTML = `<div class="m-1 p-2 text-center" style="background-color:#2e5b8e; color:white; border-radius: 5px;">
                <div>
                    <img src="../public/assets/img/${data.icone}" width="32px" class="me-3 border-radius-lg m-2" alt="logo">
                </div>
                <div class="my-auto">
                    <h3 class="mb-1 text-sm font-weight-bold" style="color:white; font-weight:bold"> ${data.description}</h3>
                    
                </div>                    
            </div>` 

            }
        })
        .catch(error => console.log(error))    
}

const delDisciplineForm = document.getElementById('deleteDisciplineForm');

if (delDisciplineForm) {

    delDisciplineForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dataForm = new FormData(delDisciplineForm);

        await axios.post(`${URL_BASE}/${URIS.discipline.delete}`, dataForm, {

            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(response => {
                if (response.data.error) {
                    document.getElementById('msgAlertErrorDisciplineDelete').innerHTML = response.data.msg                  
                } else {

                    
                    delDisciplineForm.reset();
                    delDisciplineModal.hide()
                    localStorage.setItem('idDisciplineStorege', response.data.idEnd)
                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    listDisciplines();

                }
            })
            .catch(error => console.log(error))
    })
}
