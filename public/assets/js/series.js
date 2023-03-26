console.log('carregando o arquivo')



var idSerie = localStorage.getItem('idSeriesStorege');

console.log('carregando localstorage::' + idSerie)

let shiftGlobal

listSeries();

async function listSeries() {
    idSerie = localStorage.getItem('idSeriesStorege');
    console.log('carregando localstorage no lisSeries' + idSerie)
    await axios.get(`${URL_BASE}/series/list`)
        .then(response => {
            const data = response.data;
            console.log(data);
            //document.querySelector("#tb_series > tbody").innerHTML = `${loadDataSeries(data)}`;
            document.getElementById('li_series').innerHTML = list(data)
            document.getElementById('amount_series').innerHTML = `  + ${data.length}`
            showSeries(idSerie)
        }
        )
        .catch(error => console.log(error))
}


function list(data) {

    let li = ''
    if (data) {
        data.forEach((elem, indice) => {
            li += `<li><a class="dropdown-item" href="#" onclick="showSeries(${elem.id})">${elem.description}º ${elem.classification} - ${convertShift(elem.shift)}</a></li>`
        })

    }

    return li;

}
async function showSeries(idSerie) {

    let display = 'disabled'
    let title = 'Ativar'
    let icon = 'fa-check-double'
    let colorText = 'text-success'

    
    //await axios.get(`${URL_BASE}/${URIS.discipline.show}/${idDiscipline}`)
    await axios.get(`${URL_BASE}/${URIS.series.show}/${idSerie}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            if (data) {
                //Chama o modal
                //editDisciplineModal.show();
                //Define os dados no formulário
                //document.getElementById('idDisciplineEdit').value = data.id
                document.getElementById('descriptionSerie').innerText = `${data[0].description}º ${data[0].classification} - ${convertShift(data[0].shift)}`
                // document.getElementById('abbreviation').innerText = data.abbreviation
                // document.getElementById('amount').innerText = writeZero(data.amount)
                // document.getElementById('icone').innerHTML = `<img class="w-25 position-relative z-index-2 pt-4 mb-3" src="../public/assets/img/${data.icone}" alt="rocket">`

              
                let button = `<a class="btn btn-link text-dark px-3 mb-0 ${display}" href="#" onclick="editSeries(${data[0].id})"  data-bs-toggle="modal" data-bs-target="#editSeriesModal">
                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Editar
                </a>`

                if (data[0].status == 'A') {
                    display = ''
                    title = 'Desativar'
                    icon = 'fa-trash'
                    colorText = 'text-danger'
                    button += `
                    <a class="btn btn-link ${colorText} text-gradient px-3 mb-0" href="#" onclick="editSeriesStatus(${data[0].id}, '${data[0].status}')" data-bs-toggle="modal" data-bs-target="#editSeriesStatusModal"><i class="far ${icon} me-2" aria-hidden="true"></i>${title}</a>
                `
                } 
                // else {
                //     button += `<a class="btn btn-link text-success text-gradient px-3 mb-0" href="#" onclick="editSeriesStatus(${data[0].id}, '${data[0].status}')" data-bs-toggle="modal" data-bs-target="#editSeriesStatusModal"><i class="fa fa-check-double me-2" aria-hidden="true"></i>Ativar</a>`
              
                // }

                document.getElementById('action').innerHTML = `<a class="btn btn-link text-dark px-3 mb-0 ${display}" href="#" onclick="editSeries(${data[0].id})"  data-bs-toggle="modal" data-bs-target="#editSeriesModal">
                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Editar
                </a>
                <a class="btn btn-link ${colorText} text-gradient px-3 mb-0" href="#" onclick="editSeriesStatus(${data[0].id}, '${data[0].status}')" data-bs-toggle="modal" data-bs-target="#editSeriesStatusModal"><i class="fa ${icon} me-2" aria-hidden="true"></i>${title}</a>
                `

                //                                            getTotalScheduleByDiscipline(idDiscipline)
                // document.getElementById('nameDisciplineButton').innerHTML = data.description
                shiftGlobal = response.data[0].shift
                listScheduleSeries(idSerie)

            }
        })
        .catch(error => console.log(error))
}

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
                    if (response.data.code == 500) {

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

                    listSeries();

                }
            })
            .catch(error => console.log(error))
    })
}


const editSerieModal = new bootstrap.Modal(document.getElementById('editSeriesModal'));

const editSerieForm = document.getElementById('editSeriesForm');

async function editSeries(id) {

    await axios.get(`${URL_BASE}/${URIS.series.show}/${id}`)
        .then(response => {
            const data = response.data;
            console.log(data);

            if (data) {
                //editSerieModal.show()
                editSerieForm.reset()
                document.getElementById('idSerieEdit').value = id
                document.getElementById('descriptionEdit').value = data[0].description
                document.getElementById('classificationEdit').value = data[0].classification

                document.getElementById('msgAlertErrorEditSerie').innerHTML = '';
                document.getElementById('fieldAlertErrorDescriptionSeriesEdit').innerHTML = ''
                document.getElementById('fieldAlertDuplicativeEdit').innerHTML = ''
                document.getElementById('fieldAlertErrorTurmaEdit').innerHTML = ''

                const select = document.querySelector('#shift');
                const optionShift = data[0].shift;

                if (select.options.length > 1) {
                    document.querySelector('#shift option[value=M]').remove();
                    document.querySelector('#shift option[value=T]').remove();
                }
                if (optionShift === 'M') {
                    select.options[select.options.length] = new Option('Manhã', 'M');
                    select.options[select.options.length] = new Option('Tarde', 'T');


                } else {
                    select.options[select.options.length] = new Option('Tarde', 'T');
                    select.options[select.options.length] = new Option('Manhã', 'M');
                }

                // document.getElementById('nameEdit').value = data.name
                // document.getElementById('msgAlertErrorEditTeacher').innerText = ''
                // document.getElementById('fieldlertErrorEditName').innerText = ''
            }
        })
        .catch(error => console.log(error))

}

if (editSerieForm) {
    editSerieForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dataForm = new FormData(editSerieForm);
        await axios.post(`${URL_BASE}/${URIS.series.update}`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log(response.data);
                if (response.data.error) {
                    document.getElementById('msgAlertErrorEditSerie').innerHTML = response.data.msg
                    validateErros(response.data.msgs.description, 'fieldAlertErrorDescriptionSeriesEdit')
                    validateErros(response.data.msgs.classification, 'fieldAlertErrorTurmaEdit')
                    validateErros(response.data.msgs.series, 'fieldAlertDuplicativeEdit')
                    //validateErros(response.data.msgs.name, 'fieldlertErrorEditName')
                } else {
                    addSeriesForm.reset();
                    editSerieModal.hide()
                    //localStorage.setItem('idSeriesStorege', response.data.id)
                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    listSeries();
                }
            })

    })
}


const activeSeriesModal = new bootstrap.Modal(document.getElementById('editSeriesStatusModal'));

async function editSeriesStatus(idSerie, statusActual) {

    //activeSeriesModal.show();
    document.getElementById('idSerieStatus').value = idSerie;
    document.getElementById('statusEdit').innerText = `A série será ${convertStatusRotulo(statusActual)}!`
    document.getElementById('statusActual').value = statusActual
    getSeries(idSerie, 'dataEditSeries');

}

const activeSerieForm = document.getElementById('editSeriesStatusForm');

if (activeSerieForm) {

    activeSerieForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const dataForm = new FormData(activeSerieForm);
        await axios.post(`${URL_BASE}/${URIS.series.active}`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {

                console.log(response.data)
                if (response.data.error) {
                    console.log(response.data)
                    document.getElementById('msgAlertError').innerHTML = response.data.msg
                    document.getElementById('fieldlertError').innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ${response.data.msgs.description}!`

                } else {
                    // load();
                    // //console.log(response.data)
                    // location.reload();
                    activeSeriesModal.hide();
                    activeSerieForm.reset();
                    localStorage.setItem('idSeriesStorege', response.data.idEnd[0].id)

                    loadToast(typeSuccess, titleSuccess, messageSuccess);

                    //loadDataTable(response.data)
                    //loada();
                    listSeries();
                }

            })
            .catch(error => console.log(error))
    })


}


async function listScheduleSeries(idSerie) {

    //listScheduleSeriesModal.show();
    console.log(idSerie)

    getSeries(idSerie, 'descriptionSerieFake')


    //getSeries(idSerie, 'descriptionFake');

    await axios.get(`${URL_BASE}/${URIS.schedule.listSeries}/${idSerie}`)
        .then(response => {
            const data = response.data;
            console.log(data);

            document.querySelector("#tb_series_schedule > tbody").innerHTML = `${loadDataScheduleSerie(data)}`;
            document.getElementById('totalSchedule').textContent = writeZero(data.length)


            //document.querySelector("#tb_schedule > tbody").innerHTML = `${loadDataSchedule(data)}`;
            //loadDataTable(data)
            //document.getElementById('btn_print').setAttribute('href', `${URL_BASE}/report/series/${idSerie}`)

            if (data.length == 0) {
                document.getElementById('btn_print_series_schedule').classList.remove('btn-primary')
                document.getElementById('btn_print_series_schedule').classList.add('disabled', 'btn-outline-primary')
            }
            else {
                document.getElementById('btn_print_series_schedule').classList.add('btn-primary')
                document.getElementById('btn_print_series_schedule').classList.remove('disabled', 'btn-outline-primary')
                document.getElementById('btn_print_series_schedule').setAttribute('onclick', `printReport(${idSerie})`)

            }


            // if(data.length == 0 ){
            //     document.getElementById('btn_print_series_schedule').classList.add('disabled')
            // }
            // else {
            //     document.getElementById('btn_print_series_schedule').classList.remove('disabled')

            // }

            //onclick = "printReport()"
        }
        )
        .catch(error => console.log(error))

    console.log(idSerie)
}

function printReport(idSerie) {

    window.open(`${URL_BASE}/${URIS.report.series}/${idSerie}`);
}

function loadDataScheduleSerie(data) {

    let row = "";

    // let dayShow = '';
    // let rowColor = '';
    for (let ps = 1; ps < 7; ps++) {
        row += `<tr>
                    <td scope="row" class="text-center align-middle">
                            ${ps}ª aula <p class="text-sm text-gray">${translateSchedule(ps, shiftGlobal)}           
                    </td>`

        // let dayShow = ps === 1 ? convertDayWeek(dw) : '';           
        // let rowColor = dw % 2 === 0 ? 'table-secondary' : 'table-success'

        for (let dw = 2; dw < 7; dw++) {
            row += `<td class="text-center align-middle">`
            //row += `<th scope="row">${dw}${ps}</th>`

            data.forEach((elem, indice) => {
                if (elem.dayWeek == dw && elem.position == ps) {

                    row += ` <div class="w-150 text-center align-items-center" style="display: flex;
                    justify-content: center;"><div class="d-flex m-1 p-2 w-120 text-center" style="background-color:${elem.color}; color:white; border-radius: 5px;">
                                <div>
                                    <img src="${URL_BASE}/assets/img/${elem.icone}" width="28px" class="me-2 border-radius-lg m-1" alt="spotify">
                                </div>                    
                                <div class="my-auto text-start">
                                    <h6 class="mb-0 font-weight-bold font-size-11" style="color:white;">${elem.abbreviation}</h6>
                                    <span class="mb-0 font-weight-bold font-size-11"> ${elem.name.split(" ", 1)}</span>
                                </div>
                            </div></div>`

                }
            })
            row += `</td>`
        }
        row += `</tr>`
    }
    return row;


}

async function getSeries(id, locale) {

    await axios.get(`${URL_BASE}/${URIS.series.show}/${id}`)
        .then(response => {
            console.log(response.data)
            document.getElementById(locale).innerText = `${response.data[0].description}º${response.data[0].classification} - ${convertShift(response.data[0].shift)}`

            shiftGlobal = response.data[0].shift
        })
        .catch(error => console.log(error))
}