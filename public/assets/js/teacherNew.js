var divLoad = document.querySelector('#load');
var divLoader = document.querySelector('#loader');
// var typeSuccess = 'success';
// var titleSuccess = '<strong class="me-auto">Parabéns!</strong>';
// var messageSuccess = '<i class="bi bi-hand-thumbs-up-fill"></i> Operação realizada com sucesso!';

var idTeacherStorege = localStorage.getItem('idTeacher')


if (idTeacherStorege == null) {
    localStorage.setItem('idTeacher', localStorage.getItem('idEndTeacher'))
}


//var idTeacheDiscipline = 11;

// const btnListAllocation = `<a href="#" class="btn btn-dark btn-sm" onclick="listAllocationTeacherDiscipline(${idTeacheDiscipline})">
// <i class="fa fa-list" aria-hidden="true"></i> Alocação</a>`


// listTeacDisc();

// async function listTeacDisc() {
//     await axios.get(`http://localhost/nw-templ/soft-ui-dashboard-main/pages//teacher/list`)
//         .then(response => {
//             const data = response.data;
//             console.log(data);
//             document.querySelector("#tb_teacher > tbody").innerHTML = `${loadDataTeacher(data)}`;
//             //loadDataTable(data)
//         }
//         )
//         .catch(error => console.log(error))
// }




listDisciplinesTeacher(localStorage.getItem('idTeacher'));


async function listDisciplinesTeacher(idTeacher) {
    showLoading()
    await axios.get(`${URL_BASE}/teacher/listDisciplinesByTeacher/${idTeacher}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            if (data) {
                getDataTeacher(idTeacher, 'nameTeacher')
                document.getElementById('disc').innerHTML = `${listRowDisciplines(data, idTeacher)}`
            }
            getDataTeacher(idTeacher, 'nameTeacherButton')
            listAllocationTeacherDiscipline(idTeacher)

            listTeachers()

            //listTeacher = response.data;
            //document.getElementById('li_teacher').innerHTML = list(listTeacher.data)
            //document.getElementById('amount_teachers').innerHTML = `  + ${listTeacher.length}`

            //list
            listAllocationTeacherDisciplineAll(idTeacher)
            hideLoading()
            listDisciplines()


        }).catch(error => console.log(error))
}

/* depois remover para o arquivo em discipline.js*/

async function listDisciplines() {
    await axios.get(`${URL_BASE}/discipline/list`)
        .then(response => {
            const data = response.data;
            console.log(data);
            document.querySelector("#disciplines").innerHTML = `${loadDataDisciplines(data, 'disciplines')}`;
            document.querySelector("#disciplinesTeacher").innerHTML = `${loadDataDisciplines(data, 'disciplinesTeacher')}`;

            // data.forEach((elem)=>{

            // })
        }
        )
        .catch(error => console.log(error))
}




//getElementById('nameTeacherButton').innerText = nameTeacher

async function listTeachers() {
    await axios.get(`${URL_BASE}/${URIS.teacher.list}`)
        .then(response => {
            const data = response.data;
            //return data
            // const data = response.data;
            // console.log(data);
            // console.log(data.length)
             document.getElementById('li_teacher').innerHTML = list(data)
             document.getElementById('amount_teachers').innerHTML = `  + ${data.length}`
            //document.querySelector("#tb_teacher > tbody").innerHTML = `${loadDataTeacher(data)}`;
            //loadDataTable(data)
        }
        )
        .catch(error => console.log(error))
}

function list(data) {

    let li = ''
    if (data) {
        data.forEach((elem, indice) => {
            li += `<li><a class="dropdown-item" href="#" onclick="listDisciplinesTeacher(${elem.id})">${indice + 1} - ${elem.name}</a></li>`
        })

    }

    return li;

}

function listRowDisciplines(data, idTeacher) {
    let row = '';
    let amount = 0;

    if (data.length >= 1) {
        console.log('aqui tem data');
        console.log(data)
        data.forEach(e => {
            row += ` <button style="width:100%; background-color:${e.color};" class="btn text-white" onclick="editTeacherDiscipline(${e.id})" data-bs-toggle="modal" data-bs-target="#editTeacherDisciplineModal">
            
            
            
            <div class="text-center" style="display:flex; justify-content: center; width:100%;">
                <div>
                    <img src="${URL_BASE}/assets/img/${e.icone}" width="32px" class="me-3 border-radius-lg p-1" alt="spotify">
                </div>
                <div>                
                    ${e.description}<br> ${writeZero(e.amount)} aula(s)
                </div>
            </div>
           
        </button><br>`
            document.getElementById('action').innerHTML = `
            <a class="btn btn-link text-dark px-3 mb-0" href="#" onclick="editTeacher(${idTeacher})" data-bs-toggle="modal" data-bs-target="#editTeacherModal">
                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Editar
            </a>
            <a class="btn btn-link text-danger disabled text-gradient px-3 mb-0" href="#">
                <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Excluir
            </a>
            <a class="btn btn-link text-dark px-3 mb-0" href="#" onclick="replaceTeacher(${idTeacher})" data-bs-toggle="modal" data-bs-target="#replaceTeacherModal">
                <i class="fa fa-refresh text-dark me-2" aria-hidden="true"></i>Substituir
            </a>`
            document.getElementById('disciplineOption').innerHTML = `<a class="btn btn-link text-dark px-3 mb-0" href="#" onclick="addTeacherDiscipline(${idTeacher})"  data-bs-toggle="modal" data-bs-target="#addTeacherDisciplineModal"><i class="fas fa-plus text-dark me-2" aria-hidden="true"></i>Disciplina</a>
    <a class="btn btn-link text-dark text-gradient px-3 mb-0" href="#" onclick="addAllocationTeacher(${idTeacher})" data-bs-toggle="modal" data-bs-target="#addAllocationTeacherModal"><i class="fas fa-plus me-2" aria-hidden="true"></i>Disponibilidade</a>
    
    `
            amount = + e.amount + amount
        })
    } else {
        row = `
        <div style="width:100%; background-color:#C5CCC7; border-radius:5px;color:white;font-weight:bold">
            <div class="rounded m-1 p-2">
                SEM <br> DISCIPLINA 
            </div>
        </div>`
        document.getElementById('action').innerHTML = `<a class="btn btn-link text-dark px-3 mb-0" href="#" onclick="editTeacher(${idTeacher})"  data-bs-toggle="modal" data-bs-target="#editTeacherModal"><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Editar</a>
        <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="#" onclick="delTeacher(${idTeacher})" data-bs-toggle="modal" data-bs-target="#deleteTeacherModal"><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Excluir</a>`
        document.getElementById('disciplineOption').innerHTML = `<a class="btn btn-link text-dark px-3 mb-0" href="#" onclick="addTeacherDiscipline(${idTeacher})"  data-bs-toggle="modal" data-bs-target="#addTeacherDisciplineModal"><i class="fas fa-plus text-dark me-2" aria-hidden="true"></i>Disciplina</a>`

    }

    document.getElementById('totalAmount').textContent = writeZero(amount)

    localStorage.setItem('amountTotalTeacher', amount)


    return row;
}
function listRowDisciplinesInput(data, idTeacher) {
    let row = '';
    if (data.length >= 1) {
        console.log('aqui tem data');
        console.log(data)
        data.forEach(e => {
            row += `
            <div class="form-check-inline radio-toolbar text-white  m-1 p-0" style="border-radius: 5px; margin: 5px; width: 150px;">
                <input class="form-check-inline" onclick="eraseAlert('fieldAlertErrorDisciplinesAllocation');" name="disciplinesTeacher" value="${e.id}" type="radio" id="disciplinesAllocation${e.id}">
                <label class="form-check-label" for="disciplinesAllocation${e.id}">
                <div class="d-flex">
                    <div>
                    <img src="../public/assets/img/${e.icone}" width="28px" class="me-2 border-radius-lg p-1" alt="">
                    </div>
                    <div class="my-auto">
                    <h6 class="mb-0 text-sm text-white font-weight-bolder"> ${e.abbreviation}<br> ${writeZero(e.amount)} aula(s)</h6>
                    </div>
                </div> 
                </label>        
            </div>`

        })
    }
    return row;
}


const listAllocationTeacherDiscipline = async (idTeacher) => {

    //listAllocationModal.show();
    console.log(idTeacher);

    await axios.get(`${URL_BASE}/allocation/showTeacher/${idTeacher}`)

        .then(response => {
            const data = response.data;

            console.log(data.length);
            let total = data.length;
            localStorage.setItem('amountAllocation', total)
            if (data) {
                //editModal.show();
                //document.getElementById('idEdit').value = data[0].id
                //document.getElementById('disc').innerHTML = `${listRowDisciplines(data)}`
                document.querySelector("#tb_allocationa > tbody").innerHTML = `${loadDataSchedule(data)}`;
                //document.getElementById('id_discipline').value = data[0].description
                //document.getElementById('numeroAulas').value = data[0].amount
                //document.getElementById('corDestaque').value = data[0].color
                document.getElementById('totalAllocation').textContent = `${writeZero(total)} de`

                document.getElementById('btn_print').setAttribute('onclick', `printReportTeacher(${idTeacher})`)

                //document.getElementById('totalAllocation').value = total;
                //getDataTeacher(id, 'nameDisciplineAllocation');
                //getDataTeacherDiscipline(id);
                //document.getElementById('btn_print').setAttribute('onclick', `printReportTeacher(${id})`)

            }

            if (data.length == 0) {
                document.getElementById('btn_print').classList.remove('btn-primary')
                document.getElementById('btn_print').classList.add('disabled', 'btn-outline-primary')
            }
            else {
                document.getElementById('btn_print').classList.add('btn-primary')
                document.getElementById('btn_print').classList.remove('disabled', 'btn-outline-primary')

            }
        })
        .catch(error => console.log(error))


}
const listAllocationTeacherDisciplineAll = async (idTeacher) => {

    //listAllocationModal.show();
    console.log(idTeacher);

    await axios.get(`${URL_BASE}/allocation/getTotalAllocationTeacher/${idTeacher}`)

        .then(response => {
            const data = response.data;

            console.log(data);
            if (data) {
                console.log('total é ' + data)
                //editModal.show();
                //document.getElementById('idEdit').value = data[0].id
                //document.getElementById('disc').innerHTML = `${listRowDisciplines(data)}`
                //document.querySelector("#tb_allocation_teacher_del > tbody").innerHTML = `${loadDataAllocationChecked(data)}`;
                //document.getElementById('id_discipline').value = data[0].description
                //document.getElementById('numeroAulas').value = data[0].amount
                //document.getElementById('corDestaque').value = data[0].color
                //document.getElementById('buttonRemoveAllocation').setAttribute('onclick', `delAllocationTeacher(${idTeacher})`)
                //document.getElementById('totalAllocation').value = total;
                //getDataTeacher(id, 'nameDisciplineAllocation');
                //getDataTeacherDiscipline(id);
                //document.getElementById('btn_print').setAttribute('onclick', `printReportTeacher(${id})`)
                document.getElementById('disciplineOption').innerHTML += `<a class="btn btn-link text-danger text-gradient px-3 mb-0" href="#" onclick="delAllocationTeacher(${idTeacher})" data-bs-toggle="modal" data-bs-target="#delAllocationTeacherModal"><i class="fas fa-trash me-2" aria-hidden="true"></i>Disponibilidade</a>`
                //alert('aqui é disponibilidade')

            } else {
                document.getElementById('disciplineOption').innerHTML += ''
                //alert('merda')
            }
        })
        .catch(error => console.log(error))

    // if(localStorage.getItem('amountAllocation') >= localStorage.getItem('amountTotalTeacher')) {
    //     document.getElementById('check').classList.remove('text-danger') 
    //     document.getElementById('check').classList.add('text-success') 

    // } else {

    //     document.getElementById('check').classList.remove('text-success') 
    //     document.getElementById('check').classList.add('text-danger') 
    // }


}
const listAllocationTeacherDisciplineChecked = async (idTeacher) => {

    //listAllocationModal.show();
    console.log(idTeacher);

    await axios.get(`${URL_BASE}/allocation/showTeacherChecked/${idTeacher}`)

        .then(response => {
            const data = response.data;

            console.log(data);
            let total = data.length;
            if (data) {
                //editModal.show();
                //document.getElementById('idEdit').value = data[0].id
                //document.getElementById('disc').innerHTML = `${listRowDisciplines(data)}`
                document.querySelector("#tb_allocation_teacher_del > tbody").innerHTML = `${loadDataAllocationChecked(data)}`;
                //document.getElementById('id_discipline').value = data[0].description
                //document.getElementById('numeroAulas').value = data[0].amount
                //document.getElementById('corDestaque').value = data[0].color

                //document.getElementById('totalAllocation').value = total;
                //getDataTeacher(id, 'nameDisciplineAllocation');
                //getDataTeacherDiscipline(id);
                //document.getElementById('btn_print').setAttribute('onclick', `printReportTeacher(${id})`)

            }
        })
        .catch(error => console.log(error))


}

function loadDataAllocationChecked(data) {

    console.log(data)

    let row = "";




    // let dayShow = '';
    // let rowColor = '';
    for (let ps = 1; ps < 7; ps++) {
        row += `<tr>
        <td class="align-middle text-center"><span class="text-gray">${ps}ª aula</span>
        </td>`

        // let dayShow = ps === 1 ? convertDayWeek(dw) : '';           
        // let rowColor = dw % 2 === 0 ? 'table-secondary' : 'table-success'

        for (let dw = 2; dw < 7; dw++) {
            row += `<td style="" class="text-center align-middle">`

            //row += `<th scope="row">${dw}${ps}</th>`

            //if (dw && ps) {
            data.forEach((elem, indice) => {
                if (elem.dayWeek == dw && elem.position == ps && elem.situation == 'L') {
                    row += ` <div class="form-check form-switch">                                
                            <input class="form-check-input" onclick="eraseAlert('msgAlertErrorTeacherAllocationDel')" checked="true" name="nIdsAllocation[]" value="${elem.id}" type="checkbox" role="switch" id="dayWeek${ps}${dw}${elem.shift}${elem.abbreviation}">
                            <label class="form-check-label" for="dayWeek${ps}${dw}${elem.shift}${elem.abbreviation}">${elem.shift} - ${elem.abbreviation}</label>
                          </div>`
                }
            })

            //} 

            row += `</td>`
        }
        row += `</tr>`
    }

    return row;
}
function loadDataSchedule(data) {

    let row = "";

    // let dayShow = '';
    // let rowColor = '';
    for (let ps = 1; ps < 7; ps++) {
        row += `<tr>
           <td scope="row" class="text-center align-middle w-120">
           ${ps}ª aula <p class="text-sm text-gray">${translateSchedule(ps, 'M')} 
           <br>ou<br>
          ${translateSchedule(ps, 'T')}</p>
           
           </td>`

        // let dayShow = ps === 1 ? convertDayWeek(dw) : '';           
        // let rowColor = dw % 2 === 0 ? 'table-secondary' : 'table-success'

        for (let dw = 2; dw < 7; dw++) {
            row += `<td style="" class="text-center align-middle">`
            //row += `<th scope="row">${dw}${ps}</th>`

            data.forEach((elem, indice) => {
                if (elem.dayWeek == dw && elem.position == ps) {

                    row += `<div class="avatar-group mt-2 text-center">
                                <a href="#" onclick="delScheduleTeacher(${elem.id_schedule})" data-bs-toggle="modal" data-bs-target="#delScheduleTeacherModal" style="background-color:${elem.color};" class="btn text-white">
                                    ${elem.nameDiscipline}<br>
                                    ${elem.description}ª${elem.classification} - ${convertShift(elem.shift)}
                                </a>
                            </div>`

                }
            })
            row += `</td>`
        }
        row += `</tr>`
    }
    return row;
}

async function getDataTeacher(id, locale) {

    await axios.get(`${URL_BASE}/teacher/show/${id}`)
        .then(response => {
            const data = response.data;

            console.log(data);
            if (data) {
                //editModal.show();
                //document.getElementById('idEdit').value = data[0].id
                document.getElementById(locale).innerText = data.name
                //document.getElementById(locale).innerHTML = data.amount
                //document.getElementById('id_discipline').value = data[0].description
                //document.getElementById('numeroAulas').value = data[0].amount
                //document.getElementById('corDestaque').value = data[0].color
            }
        })
        .catch(error => console.log(error))
}



const addTeacherModal = new bootstrap.Modal(document.getElementById('addTeacherModal'));


const addTeacherForm = document.getElementById('addTeacherForm');
console.log(addTeacherForm);
const myInput = document.getElementById('nameTeacherAdd');


function addTeacher() {

    //addTeacherModal.show();

    document.getElementById('msgAlertError').innerHTML = ''
    document.getElementById('fieldlertErrorname').innerHTML = ''
    document.getElementById('fieldlertErroramount').innerHTML = ''
    document.getElementById('fieldlertErrordisciplines').innerHTML = ''
    document.getElementById('fieldlertErrorcolor').innerHTML = ''

    console.log(Cookies.get("token"));

    addTeacherForm.reset();

    $('#addTeacherModal').on('shown.bs.modal', function () {
        $('#nameTeacherAdd').trigger('focus');
    });

    // addTeacherModal.addEventListener('shown.bs.modal', () => {
    //     myInput.trigger('focus')
    // })

}


if (addTeacherForm) {
    addTeacherForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        //load();
        const dataForm = new FormData(addTeacherForm);

        dataForm.set('token', Cookies.get("token"));

        await axios.post(`${URL_BASE}/${URIS.teacher.create}`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log(response.data.id)
                if (response.data.error) {

                    if (response.data.code == 500) {

                        addTeacherForm.reset();
                        addTeacherModal.hide();
                        loadToast(typeError, titleError, messageError);
                        listDisciplinesTeacher(localStorage.getItem('idTeacher'))

                    }
                    console.log(response.data)
                    document.getElementById('msgAlertError').innerHTML = response.data.msg

                    const er = response.data.msgs;
                    console.log(er)
                    // er.forEach( (e,indice) => {

                    //     validateErros(e, 'fieldlertError' + indice);
                    // })
                    validateErros(response.data.msgs.name, 'fieldlertErrorname')
                    validateErros(response.data.msgs.amount, 'fieldlertErroramount')
                    validateErros(response.data.msgs.disciplines, 'fieldlertErrordisciplines')
                    validateErros(response.data.msgs.color, 'fieldlertErrorcolor')
                    //loadToast(titleSuccess, bodySuccess, statusSuccess);
                    //if(response.data.msgs.description){
                    //     document.getElementById('fieldlertErrorDescription').innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ${response.data.msgs.description}!`
                    // } else {
                    //     document.getElementById('fieldlertErrorDescription').innerHTML ='';
                    // }

                } else {
                    // load();
                    // //console.log(response.data)
                    // location.reload();
                    addTeacherModal.hide();
                    addTeacherForm.reset();
                    //loadToast(titleSuccess, bodySuccess, success);
                    //loadDataTable(response.data)
                    //loada();
                    //listSeries();
                    //location.reload();
                    //listTeacDisc();
                    localStorage.removeItem('idEndTeacher');
                    localStorage.setItem('idEndTeacher', response.data.id)
                    localStorage.setItem('idTeacher', response.data.id)
                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    listDisciplinesTeacher(localStorage.getItem('idTeacher'))

                }
            })
            .catch(error => console.log(error))
    });
}


const editTeacherModal = new bootstrap.Modal(document.getElementById('editTeacherModal'));

async function editTeacher(idTeacher) {

    await axios.get(`${URL_BASE}/teacher/edit/${idTeacher}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            if (data) {
                editTeacherModal.show()
                document.getElementById('idTeacherEdit').value = idTeacher
                document.getElementById('nameEdit').value = data.name
                document.getElementById('msgAlertErrorEditTeacher').innerText = ''
                document.getElementById('fieldAlertErrorEditName').innerText = ''
            }
        })
        .catch()

}


const editTeacherForm = document.getElementById('editTeacherForm');
console.log(editTeacherForm);

if (editTeacherForm) {
    editTeacherForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dataForm = new FormData(editTeacherForm);
        await axios.post(`${URL_BASE}/${URIS.teacher.update}`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log(response.data);
                if (response.data.error) {
                    document.getElementById('msgAlertErrorEditTeacher').innerHTML = response.data.msg
                    validateErros(response.data.msgs.name, 'fieldAlertErrorEditName')
                } else {
                    editTeacherModal.hide();

                    localStorage.removeItem('idEndTeacher');
                    localStorage.setItem('idEndTeacher', dataForm.get('id'))
                    localStorage.setItem('idTeacher', dataForm.get('id'))
                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    listDisciplinesTeacher(localStorage.getItem('idTeacher'))
                }
            })
            .catch(error => console.log(error))

    })
}

const addTeacherDisciplineModal = new bootstrap.Modal(document.getElementById('addTeacherDisciplineModal'));
const addFormTeacDisc = document.getElementById('addTeacherDisciplineForm');
async function addTeacherDiscipline(idTeacher) {
    document.getElementById('msgAlertErrorTeacDisc').innerHTML = '';
    document.getElementById('fieldAlertErrorAmountTechDisc').innerHTML = ''
    document.getElementById('fieldAlertErrorDisciplinesTechDisc').innerHTML = ''
    document.getElementById('fieldAlertErrorColorTechDisc').innerHTML = ''


    //document.getElementById('fieldlertError').textContent = '';


    addFormTeacDisc.reset();
    //addTeacherDisciplineModal.show();
    document.getElementById('idTeac').value = idTeacher
    getDataTeacher(idTeacher, 'nameTeacherDisciplineAdd');
    //getDataTeacherDiscipline(idTeacher)

    // document.getElementById('disciplines').innerHTML = listDisciplines()
    // document.querySelector('.abc').classList.add("form-switch");
    // console.log(addForm);
    // $('#addTeacherDisciplineModal').on('shown.bs.modal', function () {
    //     $('#amount').trigger('focus');
    // });

    $('#addTeacherDisciplineModal').on('shown.bs.modal', function () {
        $('#amountDiscipline').trigger('focus');
    });


}

if (addFormTeacDisc) {
    addFormTeacDisc.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dataForm = new FormData(addFormTeacDisc);
        await axios.post(`${URL_BASE}/teacDisc/create`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log(response.data.id_teacher);
                if (response.data.error) {
                    console.log(response.data.msg)
                    document.getElementById('msgAlertErrorTeacDisc').innerHTML = response.data.msg
                    //document.getElementById("msgAlertSuccess").innerHTML = "";
                    //document.getElementById('idTeac').value = id
                    //document.getElementById('msgAlertError').innerHTML = response.data.msg
                    //loadToast('oi','oila','danger');

                    //validateErros(response.data.msgs.name, 'fieldlertErrorname')
                    // if(response.data.error.code == 1062){
                    //     validateErros(response.data.msgs.disciplinesTeacher, 'fieldlertErrordisciplinesTechDisc')
                    // }
                    validateErros(response.data.msgs.amount, 'fieldAlertErrorAmountTechDisc')
                    validateErros(response.data.msgs.disciplinesTeacher, 'fieldAlertErrorDisciplinesTechDisc')
                    validateErros(response.data.msgs.color, 'fieldAlertErrorColorTechDisc')

                    //addForm.reset()


                } else {
                    document.getElementById('msgAlertError').innerHTML = '';
                    addFormTeacDisc.reset();
                    addTeacherDisciplineModal.hide();
                    //document.getElementById('msgAlertSuccess').innerHTML = response.data.msg

                    localStorage.removeItem('idEndTeacher');
                    localStorage.setItem('idEndTeacher', dataForm.get('id_teacher'))
                    localStorage.setItem('idTeacher', dataForm.get('id_teacher'))
                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    listDisciplinesTeacher(localStorage.getItem('idTeacher'))


                }
            })
            .catch(error => console.log(error))
    })
}




const editTeacherDisciplineModal = new bootstrap.Modal(document.getElementById('editTeacherDisciplineModal'));
async function editTeacherDiscipline(idTeacherDiscipline) {
    await axios.get(URL_BASE + '/teacDisc/edit/' + idTeacherDiscipline)
        .then(response => {
            const data = response.data;
            console.log(data);
            if (data) {
                //editTeacherDisciplineModal.show();
                document.getElementById('idTeacherDisciplineEdit').value = data[0].id
                document.getElementById('nameTeacherEdit').textContent = data[0].name
                document.getElementById('idTeacherEditDiscipline').value = data[0].id_teacher
                document.getElementById('descriptionDisciplineEdit').value = data[0].description
                document.getElementById('amountEdit').value = data[0].amount
                document.getElementById('colorEdit').value = data[0].color
                // document.getElementById('headerModal').style.backgroundColor = data[0].color
                // document.getElementById('headerModal').style.color = '#FFF'
                if (data[0].amount_allocation == 0) {
                    document.getElementById('btn-delete').innerHTML = `<p class="mb-4 mx-auto">Deseja excluir a disciplina ? 
                    <a href="#" class="text-primary text-gradient font-weight-bold" onclick="delTeacherDiscipline(${idTeacherDiscipline})" data-bs-toggle="modal" data-bs-target="#delTeacherDisciplineModal">
                        <i class="fa fa-trash"></i> Clique aqui!
                    </a>
                    </p>`
                } else {
                    document.getElementById('btn-delete').innerHTML = ''
                }
            }
        })
        .catch(error => console.log(error))

}

const editTeacherDisciplineForm = document.getElementById('editTeacherDiscipline');
console.log(editTeacherDisciplineForm);

if (editTeacherDisciplineForm) {

    editTeacherDisciplineForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dataForm = new FormData(editTeacherDisciplineForm);
        await axios.post(`${URL_BASE}/teacDisc/update`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log(response.data.id_teacher);
                if (response.data.error) {
                    document.getElementById('msgAlertErrorTeacherDisciplineEdit').innerHTML = response.data.msg
                    //document.getElementById('fieldAlertErrorAmountEdit').textContent = response.data.error
                    validateErros(response.data.msgs.nNumeroAulas, 'fieldAlertErrorAmountEdit')
                    //document.getElementById("msgAlertSuccess").innerHTML = "";
                } else {

                    document.getElementById('msgAlertErrorTeacherDisciplineEdit').innerHTML = '';
                    document.getElementById('fieldAlertErrorAmountEdit').textContent = '';
                    //document.getElementById('msgAlertSuccess').innerHTML = response.data.msg
                    //location.reload();
                    editTeacherDisciplineModal.hide();

                    localStorage.removeItem('idEndTeacher');
                    localStorage.setItem('idEndTeacher', dataForm.get('id_teacher'))
                    localStorage.setItem('idTeacher', dataForm.get('id_teacher'))
                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    listDisciplinesTeacher(localStorage.getItem('idTeacher'))

                }
            })
            .catch(error => console.log(error))
    })
}

const addAllocationModal = new bootstrap.Modal(document.getElementById('addAllocationTeacherModal'));

const addAllocationForm = document.getElementById('addAllocationForm');
console.log(addAllocationForm)

async function addAllocationTeacher(idTeacher) {

    //addAllocationModal.show();
    //addAllocationForm.reset();
    addAllocationForm.reset();
    document.getElementById('idTeacherAllocation').value = idTeacher
    getDataTeacher(idTeacher, 'nameTeacherAllocationAdd');
    //document.getElementById('disc').innerHTML = `${listRowDisciplines(data,idTeacher)}`
    getDataTeacherDiscipline(idTeacher)
    // usar aqui document.querySelector("#disc").innerHTML = `${listRowDisciplines(csa)}`
    document.getElementById('msgAlertErrorTeacherAllocationAdd').innerHTML = '';
    document.getElementById('fieldAlertErrorDayWeekAllocation').innerHTML = '';
    // document.getElementById('fieldlertErrorPosition').innerHTML = ''
    document.getElementById('fieldAlertErrorDisciplinesAllocation').innerHTML = ''
    document.getElementById('fieldAlertErrorShiftAllocation').innerHTML = ''

    //listAllocationTeacherDisciplineChecked(idTeacher)

    //document.querySelector("#tb_allocation_teacher > tbody").innerHTML = `${loadDataSchedule(data)}`;


    // document.getElementById('msgAlertError').innerHTML = ''
    // document.getElementById('fieldlertErrorname').innerHTML = ''
    // document.getElementById('fieldlertErroramount').innerHTML = ''
    // document.getElementById('fieldlertErrordisciplines').innerHTML = ''
    // document.getElementById('fieldlertErrorcolor').innerHTML = ''


    // $('#addAllocationModal').on('shown.bs.modal', function () {
    //     $('#name').trigger('focus');
    // });

}

if (addAllocationForm) {
    addAllocationForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        // adicionar o toast
        /*$('#toast-place').append(`
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
            <div class="toast-header">
            <strong class="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close">
              <span aria-hidden">&time</span>;
              </button>
              </div>
              <div class="toast-body">
              Hello, world! This is a toast message.
            </div>
          </div>
          `);*/

        //$('.toast').toast('show');



        const dataForm = new FormData(addAllocationForm);
        await axios.post(`${URL_BASE}/allocation/create`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log(response.data.id_teacher);
                if (response.data.error) {
                    console.log(response.data.msg)
                    document.getElementById('msgAlertErrorTeacherAllocationAdd').innerHTML = response.data.msg
                    //document.getElementById("msgAlertSuccess").innerHTML = "";
                    //document.getElementById('idTeac').value = id
                    //document.getElementById('msgAlertError').innerHTML = response.data.msg
                    //loadToast('oi','oila','danger');

                    //validateErros(response.data.msgs.name, 'fieldlertErrorname')
                    // if(response.data.error.code == 1062){
                    //     validateErros(response.data.msgs.disciplinesTeacher, 'fieldlertErrordisciplinesTechDisc')
                    // }
                    validateErros(response.data.msgs.nDayWeek, 'fieldAlertErrorDayWeekAllocation')
                    validateErros(response.data.msgs.disciplinesTeacher, 'fieldAlertErrorDisciplinesAllocation')
                    //validateErros(response.data.msgs.nPosition, 'fieldlertErrorPosition')
                    validateErros(response.data.msgs.nShift, 'fieldAlertErrorShiftAllocation')

                    //addForm.reset()


                } else {
                    document.getElementById('msgAlertErrorTeacherAllocationAdd').innerHTML = '';
                    addAllocationForm.reset();
                    addAllocationModal.hide();
                    //document.getElementById('msgAlertSuccess').innerHTML = response.data.msg

                    localStorage.removeItem('idEndTeacher');
                    localStorage.setItem('idEndTeacher', dataForm.get('id_teacher'))
                    localStorage.setItem('idTeacher', dataForm.get('id_teacher'))
                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    listDisciplinesTeacher(localStorage.getItem('idTeacher'))


                }
            })
            .catch(error => console.log(error))
    })
}

const delAllocationTeacherModel = new bootstrap.Modal(document.getElementById('delAllocationTeacherModal'));

async function delAllocationTeacher(idTeacher) {

    //addAllocationModal.show();
    //addAllocationForm.reset();
    //addAllocationForm.reset();
    document.getElementById('idTeacherAllocationDel').value = idTeacher
    getDataTeacher(idTeacher, 'nameTeacherAllocationDel');
    //document.getElementById('disc').innerHTML = `${listRowDisciplines(data,idTeacher)}`
    //getDataTeacherDiscipline(idTeacher)
    // usar aqui document.querySelector("#disc").innerHTML = `${listRowDisciplines(csa)}`
    //document.getElementById('msgAlertErrorTeacherAllocationAdd').innerHTML = '';
    //document.getElementById('fieldAlertErrorDayWeekAllocation').innerHTML = '';
    // document.getElementById('fieldlertErrorPosition').innerHTML = ''
    //document.getElementById('fieldAlertErrorDisciplinesAllocation').innerHTML = ''
    //document.getElementById('fieldAlertErrorShiftAllocation').innerHTML = ''

    listAllocationTeacherDisciplineChecked(idTeacher)

    //document.querySelector("#tb_allocation_teacher > tbody").innerHTML = `${loadDataSchedule(data)}`;


    // document.getElementById('msgAlertError').innerHTML = ''
    // document.getElementById('fieldlertErrorname').innerHTML = ''
    // document.getElementById('fieldlertErroramount').innerHTML = ''
    // document.getElementById('fieldlertErrordisciplines').innerHTML = ''
    // document.getElementById('fieldlertErrorcolor').innerHTML = ''


    // $('#addAllocationModal').on('shown.bs.modal', function () {
    //     $('#name').trigger('focus');
    // });

}

const delAllocationTeacherForm = document.getElementById('delAllocationTeacherForm');
if (delAllocationTeacherForm) {

    delAllocationTeacherForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dataForm = new FormData(delAllocationTeacherForm);

        console.log(dataForm.get('id_teacher'));
        //console.log(dataForm.get('id'));
        //const id = dataForm.get('id');

        await axios.post(`${URL_BASE}/allocation/del`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.data.error) {
                    //document.getElementById('msgAlertError').innerHTML = response.data.msg
                    //document.getElementById('fieldlertError').textContent = 'Preenchimento obrigatório!'
                    //document.getElementById("msgAlertSuccess").innerHTML = "";
                    document.getElementById('msgAlertErrorTeacherAllocationDel').innerHTML = response.data.msg
                } else {
                    // console.log('deu certo')
                    // document.getElementById('msgAlertError').innerHTML = '';
                    // document.getElementById('fieldlertError').textContent = '';
                    // //editModal.hide();
                    // document.getElementById('msgAlertSuccess').innerHTML = response.data.msg
                    document.getElementById('msgAlertErrorTeacherAllocationDel').innerHTML = ''
                    delAllocationTeacherModel.hide();
                    localStorage.removeItem('idEndTeacher');
                    localStorage.setItem('idEndTeacher', dataForm.get('id_teacher'))
                    localStorage.setItem('idTeacher', dataForm.get('id_teacher'))
                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    listDisciplinesTeacher(localStorage.getItem('idTeacher'))
                }
            })
            .catch(error => console.log(error))

    });



}

async function getDataTeacherDiscipline(idTeacher) {
    totalWorkload = 0;
    await axios.get(`${URL_BASE}/teacher/listDisciplinesByTeacher/${idTeacher}`)
        .then(response => {
            const data = response.data;

            console.log(data);
            if (data) {
                //editModal.show();
                // document.getElementById('heardAlocationModel').style.backgroundColor = data[0].color
                // document.getElementById('heardAlocationModel').style.color = '#FFF'
                document.getElementById('disciplineTeacherAll').innerHTML = `${listRowDisciplinesInput(data, idTeacher)}`

                //data.forEach((elements, indice) => {
                //  totalWorkload = + elements.amount + totalWorkload
                //})
                //document.getElementById('id_discipline').value = data[0].description

                //document.getElementById('corDestaque').value = data[0].color
                //let totalAulaAlocada = document.getElementById('totalAllocation').value

                //alert (totalAulaAlocada)
                //alert(totalWorkload)
                //let newSpan = document.getElementById('totalAulaAllocation')
                //newSpan.innerHTML = ''
                //newSpan.innerHTML = writeZero(totalAulaAlocada)
                //if(totalAulaAlocada < totalWorkload) {
                // newSpan.classList.add("inconplete-schedule","font-bold")

                //} else {
                //  newSpan.classList.remove("inconplete-schedule")

                //}
                //let a = totalWorkload.toString();
                //document.getElementById('totalWorkload').innerHTML = writeZero(a)
                //console.log(typeof totalWorkload);
            }
        })
        .catch(error => console.log(error))
}


function loadDataDisciplines(data, term) {
    //let ticket = '';
    let row = '';

    data.forEach((element, indice) => {

        // ticket = `<a href="#" class="btn btn-outline-dark" onclick="editDiscipline(${element.id})" title="Editar"><i class="fa fa-pen" aria-hidden="true"></i></a> `;

        // //Define botão de excluir
        // if (!element.teacDisc) {
        //     ticket += `<a href="#" class="btn btn-outline-dark" onclick="delDiscipline(${element.id})" title="Excluir"><i class="fa fa-trash" aria-hidden="true"></i></a>`
        // } else {
        //     ticket += `<a href="#" class="btn btn-outline-dark disabled" title="Excluir"><i class="fa fa-trash" aria-hidden="true"></i></a>`

        // }
        row +=
            ` <div class="radio-toolbar" style="width:150px;">
             <input class="form-check-inline" onclick="eraseAlert(['fieldAlertErrorDisciplinesTechDisc','fieldlertErrordisciplines']);" name="${term}" value="${element.id}" type="radio" id="disciplines${element.id}${term}">
            <label class="form-check-label" for="disciplines${element.id}${term}">

              <div class="d-flex">
                <div>
                  <img src="../public/assets/img/${element.icone}" width="28px" class="me-2 border-radius-lg p-1" alt="">
                </div>
                <div class="my-auto">
                  <h6 class="mb-0 text-sm text-white font-weight-bolder">${element.abbreviation}</h6>
                </div>
              </div>
              

            </label>
          </div>`;

    });
    return row;
}

const deleteModal = new bootstrap.Modal(document.getElementById('delTeacherDisciplineModal'));
async function delTeacherDiscipline(idTeacherDiscipline) {
    await axios.get(URL_BASE + '/teacDisc/delete/' + idTeacherDiscipline)
        .then(response => {
            //console.log('idDisciplinaTeachr: '+id)
            const data = response.data;
            if (data) {
                console.log(data);
                //deleteModal.show();
                document.getElementById('idTeacherDisciplineDel').value = idTeacherDiscipline
                document.getElementById('idTeacherDel').value = data[0].id_teacher

                document.getElementById('dataDeleteTeacDisc').innerHTML = `
                           
                            <div class="m-1 p-2 text-center" style="background-color:${data[0].color}; color:white; border-radius: 5px;">
                                <div>
                                    <img src="${URL_BASE}/assets/img/${data[0].icone}" width="32px"  class="me-3 border-radius-lg m-2" alt="logo">
                                </div>
                                <div class="my-auto">
                                    <h6 class="mb-0 text-sm font-weight-bold" style="color:white; font-weight:bold"> ${data[0].description}</h6>
                                    <span class="mb-0 text-sm font-weight-bold">${writeZero(data[0].amount)} - Aula(s) </span>
                                </div>                    
                            </div>
                        `

            }
        })
        .catch(error => console.log(error))
    //deleteModal.show()
}

const deleteForm = document.getElementById('deleteTeacherDisciplineForm');
console.log(deleteForm);


if (deleteForm) {

    deleteForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dataForm = new FormData(deleteForm);
        console.log(dataForm);
        console.log(dataForm.get('idTeacher'));


        await axios.post(`${URL_BASE}/teacDisc/del`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {

                if (response.data.error) {
                    // document.getElementById('msgAlertError').innerHTML = response.data.msg
                    // document.getElementById('fieldlertError').textContent = 'Preenchimento obrigatório!'
                    // document.getElementById("msgAlertSuccess").innerHTML = "";
                } else {

                    // document.getElementById('msgAlertError').innerHTML = '';
                    // document.getElementById('fieldlertError').textContent = '';
                    deleteModal.hide();
                    editTeacherDisciplineModal.hide();
                    //document.getElementById('msgAlertSuccess').innerHTML = response.data.msg
                    //location.reload();
                    localStorage.removeItem('idEndTeacher');
                    localStorage.setItem('idEndTeacher', dataForm.get('idTeacher'))
                    localStorage.setItem('idTeacher', dataForm.get('idTeacher'))

                    loadToast(typeSuccess, titleSuccess, messageSuccess);
                    listDisciplinesTeacher(localStorage.getItem('idTeacher'))

                }
            })
            .catch(error => console.log(error))
    })
}

const deleteTeacherModal = new bootstrap.Modal(document.getElementById('deleteTeacherModal'));
async function delTeacher(idTeacher) {
    // await axios.get(URL_BASE + '/teacher/delete/' + id)
    //     .then(response => {
    //         const data = response.data;
    //         if (data) {
    //             console.log(data);

    //deleteTeacherModal.show();
    document.getElementById('id-teacher-del').value = idTeacher
    getDataTeacher(idTeacher, 'nameTeacherDelete')
    //          </div>`

    //         }
    //     })
    //     .catch(error => console.log(error))
    // //deleteModal.show()
}

const deleteTeacherForm = document.getElementById('deleteTeacherForm');

if (deleteTeacherForm) {

    deleteTeacherForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dataForm = new FormData(deleteTeacherForm);

        await axios.post(`${URL_BASE}/${URIS.teacher.delete}`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {

                //const idLast = response.data.idEnd
                const idLast = response.data.idEnd
                console.log(idLast)
                console.log(response.data.idEnd)

                if (response.data.error) {
                    // document.getElementById('msgAlertError').innerHTML = response.data.msg
                    // document.getElementById('fieldlertError').textContent = 'Preenchimento obrigatório!'
                    // document.getElementById("msgAlertSuccess").innerHTML = "";
                } else {

                    // document.getElementById('msgAlertError').innerHTML = '';
                    // document.getElementById('fieldlertError').textContent = '';
                    deleteTeacherModal.hide();
                    //document.getElementById('msgAlertSuccess').innerHTML = response.data.msg
                    //location.reload();

                    localStorage.removeItem('idEndTeacher');
                    localStorage.setItem('idEndTeacher', idLast)
                    localStorage.setItem('idTeacher', idLast)

                    loadToast(typeSuccess, titleSuccess, messageSuccess);
                    listDisciplinesTeacher(localStorage.getItem('idTeacher'))

                }
            })
            .catch(error => console.log(error))
    })
}

// console.log(addTeacherForm);
// if (addTeacherForm) {
//     addTeacherForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         //load();
//         const dataForm = new FormData(addTeacherForm);
//         await axios.post(`${URL_BASE}/teacher/create`, dataForm, {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//             .then(response => {
//                 console.log(response.data)
//                 if (response.data.error) {
//                     console.log(response.data)
//                     document.getElementById('msgAlertError').innerHTML = response.data.msg
//                     const er = response.data.msgs;
//                     console.log(er)
//                     // er.forEach( (e,indice) => {

//                     //     validateErros(e, 'fieldlertError' + indice);
//                     // })
//                     validateErros(response.data.msgs.name, 'fieldlertErrorname')
//                     validateErros(response.data.msgs.amount, 'fieldlertErroramount')
//                     validateErros(response.data.msgs.disciplines, 'fieldlertErrordisciplines')
//                     validateErros(response.data.msgs.color, 'fieldlertErrorcolor')
//                     //if(response.data.msgs.description){
//                     //     document.getElementById('fieldlertErrorDescription').innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ${response.data.msgs.description}!`
//                     // } else {
//                     //     document.getElementById('fieldlertErrorDescription').innerHTML ='';
//                     // }

//                 } else {
//                     // load();
//                     // //console.log(response.data)
//                     // location.reload();
//                     addTeacherModal.hide();
//                     addTeacherForm.reset();
//                     loadToast(titleSuccess, bodySuccess, success);
//                     //loadDataTable(response.data)
//                     //loada();
//                     //listSeries();
//                     //location.reload();
//                     listTeacDisc();

//                 }
//             })
//             .catch(error => console.log(error))
//     });
// }
const deleteScheduleModal = new bootstrap.Modal(document.getElementById('delScheduleTeacherModal'));

async function delScheduleTeacher(id) {
    await axios.get(`${URL_BASE}/horario/api/delete/${id}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            if (data) {
                //deleteScheduleModal.show();
                document.getElementById('idDelete').value = data.id
                document.getElementById('disciplineDel').innerHTML = `${data.name} <br> <span>${data.abbreviation}</span> - <span id="idSerieDel">${getSeries(data.id_series, 'idSerieDel')}</span>`
                    ;
                document.getElementById('positonDel').innerText = `${data.position} ª AULA - `
                document.getElementById('dayWeekDel').innerText = `${convertDayWeek(data.dayWeek, true)}`
                document.getElementById('shiftDel').value = data.shift
                document.getElementById('idScheduleTeacherDel').value = data.id_teacher
                document.getElementById('color').style.backgroundColor = data.color
                //document.getElementById('headerScheduleRemove').style.backgroundColor = data.color
                //document.getElementById('headerScheduleRemove').style.color = '#FFF'
                document.getElementById('image-disc').innerHTML = ` <img src="${URL_BASE}/assets/img/${data.icone}" width="28px" class="me-3 border-radius-lg m-2" alt="spotify">`
            }
        })
        .catch(error => console.log(error))

}

const deleteScheduleForm = document.getElementById('deleteScheduleForm');

if (deleteScheduleForm) {

    deleteScheduleForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dataForm = new FormData(deleteScheduleForm);

        await axios.post(`${URL_BASE}/${URIS.schedule.delete}`, dataForm, {

            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.data.error) {
                    // document.getElementById('msgAlertError').innerHTML = response.data.msg
                    // document.getElementById('fieldlertError').textContent = 'Preenchimento obrigatório!'
                    // document.getElementById("msgAlertSuccess").innerHTML = "";
                } else {
                    // console.log('deu certo')
                    // document.getElementById('msgAlertError').innerHTML = '';
                    // document.getElementById('fieldlertError').textContent = '';
                    // //editModal.hide();
                    // document.getElementById('msgAlertSuccess').innerHTML = response.data.msg
                    deleteScheduleModal.hide();
                    localStorage.removeItem('idEndTeacher');
                    localStorage.setItem('idEndTeacher', dataForm.get('idTeacher'))
                    localStorage.setItem('idTeacher', dataForm.get('idTeacher'))

                    loadToast(typeSuccess, titleSuccess, messageSuccess);
                    listDisciplinesTeacher(localStorage.getItem('idTeacher'))

                }
            })
            .catch(error => console.log(error))

    });



}

async function getSeries(id, locale) {

    await axios.get(`${URL_BASE}/series/show/${id}`)
        .then(response => {
            console.log(response.data)
            document.getElementById(locale).innerText = `${response.data[0].description}º${response.data[0].classification} - ${convertShift(response.data[0].shift)}`
        })
        .catch(error => console.log(error))
}

function printReportTeacher(id) {
    //listAllocationModal.hide();

    window.open(`${URL_BASE}/report/teacher/${id}`);
}

const replaceTeacherModal = new bootstrap.Modal(document.getElementById('replaceTeacherModal'));

const replaceTeacherForm = document.getElementById('replaceTeacherForm');

async function replaceTeacher(idTeacher) {

    document.getElementById('msgAlertErrorTeacherReplace').innerHTML = '';
    console.log("id do teacher: "+ idTeacher)
    replaceTeacherForm.reset()

    document.getElementById('idTeacherReplace').value = idTeacher


    let select = document.querySelector('#newTeacher');    
    
    while(select.length){
        select.remove(0);
    }
    select = document.querySelector('#newTeacher'); 
   
    getDataTeacher(idTeacher, 'nameTeacherReplace')    
    
    
    select.options[select.options.length] = new Option('Selecione ...', '');
    await axios.get(`${URL_BASE}/${URIS.teacher.listOff}/${idTeacher}`)
    .then(response => {
        response.data.forEach((el,index)=>{
            
            select.options[select.options.length] = new Option(`${index + 1} - ${el.name}`, el.id);
        })
       
    })
    .catch(error => console.log(error))   

}

if (replaceTeacherForm) {

    replaceTeacherForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dataForm = new FormData(replaceTeacherForm);

        await axios.post(`${URL_BASE}/${URIS.schedule.replace}`, dataForm, {

            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            console.log(response.data)
            if (response.data.error) {
                document.getElementById('msgAlertErrorTeacherReplace').innerHTML = response.data.msg
                // document.getElementById('fieldlertError').textContent = 'Preenchimento obrigatório!'
                // document.getElementById("msgAlertSuccess").innerHTML = "";
            } else {
                // console.log('deu certo')
                 document.getElementById('msgAlertErrorTeacherReplace').innerHTML = '';
                // document.getElementById('fieldlertError').textContent = '';
                // //editModal.hide();
                // document.getElementById('msgAlertSuccess').innerHTML = response.data.msg
                replaceTeacherModal.hide();
                //localStorage.removeItem('idEndTeacher');
                //localStorage.setItem('idEndTeacher', dataForm.get('idTeacher'))
               // localStorage.setItem('idTeacher', dataForm.get('idTeacher'))

                loadToast(typeSuccess, titleSuccess, messageSuccess);
                listDisciplinesTeacher(localStorage.getItem('idTeacher'))

            }
        })
        .catch(error => {
            console.log(error)
        })
        console.log(dataForm.get('newTeacher'))
        console.log(dataForm.get('idTeacher'))
    })
}