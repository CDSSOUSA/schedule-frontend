// var divLoad = document.querySelector('#load');
// var divLoader = document.querySelector('#loader');
// var typeSuccess = 'success';
// var titleSuccess = '<strong class="me-auto">Parabéns!</strong>';
// var messageSuccess = '<i class="fa fa-user"></i> Operação realizada com sucesso!';

var shiftLocalStorage = localStorage.getItem('shift')


 if (shiftLocalStorage == null) {
     localStorage.setItem('shift', 'M')
 }

//let shift = listSchedule(localStorage.getItem('shift'));
//localStorage.setItem('idTeacher', localStorage.getItem('idEndTeacher'))
//let shiftLocalStorage = localStorage.setItem('shift',shiftEscolha)/
//const shift = 

var shiftGlobal = '';
listSchedule(localStorage.getItem('shift'))

async function listSchedule(shift) {
    shiftGlobal = shift
    document.getElementById('define-shift-heard').textContent = convertShift(shift)
    document.getElementById('define-shift-menu').textContent = convertShift(shift)
    await axios.get(`${URL_BASE}/horario/api/list/${shift}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            listSeries(shift)
            document.querySelector("#tb_schedule > tbody").innerHTML = `${loadDataSchedule(data)}`;
            //document.querySelector("#tb_schedule > tbody").innerHTML = `${loadDataSchedule(data)}`;
            //loadDataTable(data)
            document.getElementById('btn_print_schedule').setAttribute('onclick', `printReportSchedule('${shift}')`)
        }
        )
        .catch(error => console.log(error))
}

const listScheduleSeriesModal = new bootstrap.Modal(document.getElementById('listScheduleSeriesModal'));

async function listScheduleSeries(idSerie) {

    //listScheduleSeriesModal.show();
    console.log(idSerie)

    getSeries(idSerie, 'descriptionSerieFake')
    //getSeries(idSerie, 'descriptionFake');

    await axios.get(`${URL_BASE}/horario/api/listSeries/${idSerie}`)
        .then(response => {
            const data = response.data;
            console.log(data);

            document.querySelector("#tb_series_schedule > tbody").innerHTML = `${loadDataScheduleSerie(data)}`;
            document.getElementById('totalSchedule').textContent = writeZero(data.length)
            
            
            //document.querySelector("#tb_schedule > tbody").innerHTML = `${loadDataSchedule(data)}`;
            //loadDataTable(data)
            //document.getElementById('btn_print').setAttribute('href', `${URL_BASE}/report/series/${idSerie}`)
         

            if(data.length == 0 ){
                document.getElementById('btn_print_series_schedule').classList.add('disabled')
            }
            else {
                document.getElementById('btn_print_series_schedule').setAttribute('onclick', `printReport(${idSerie})`)
                document.getElementById('btn_print_series_schedule').classList.remove('disabled')
                
            }

            //onclick = "printReport()"
        }
        )
        .catch(error => console.log(error))

    console.log(idSerie)
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

function printReportSchedule(shift) {
    listScheduleSeriesModal.hide();
    console.log(shift)
    window.open(`${URL_BASE}/report/schedule/${shift}`);
}
function printReport(idSerie) {
    listScheduleSeriesModal.hide();

    window.open(`${URL_BASE}/report/series/${idSerie}`);
}

function loadDataSchedule(data) {

    let row = "";
    // let dayShow = '';
    // let rowColor = '';
    for (let dw = 2; dw < 7; dw++) {
        for (let ps = 1; ps < 7; ps++) {

            let dayShow = ps === 3 ? convertDayWeek(dw) : '';
            let dayShowBorder = ps === 1 ? 'table-border-top' : '';
            let dayShowBorderBottom = ps === 6 ? 'table-border-bodttom' : '';
            let rowColor = dw % 2 === 0 ? 'table-secondary' : 'table-success'

            row += `<tr class="${rowColor}">
                        <td scope="row" class="fw-bold ${dayShowBorder} ${dayShowBorderBottom} table-border-left">${dayShow}</td>
                        <td scope="row" class="text-center align-middle table-border">${ps}ª aula <p class="text-sm text-gray">${translateSchedule(ps, shiftGlobal)}</p></td>`
                            data.forEach((elem, indice) => {                            
                                row += `<td id="row${ps}${dw}${elem.id}" class="text-center align-middle table-border">${listDPS(elem.id, dw, ps, elem.shift)}</td>`
                            })
            row += `</tr>`


        }
    }




    // data.forEach((element, indice) => {
    //     //console.log(data)

    //     let ticket = `<a href="#" class="btn btn-dark btn-sm" onclick="activeSeries(${element.id})"><i class="far fa-circle nav-icon" aria-hidden="true"></i> Ativar</a>`;

    //     if (element.status === "A") {
    //         console.log(element.status)
    //         ticket = `<a href="#" class="btn btn-dark btn-sm" onclick="activeSeries(${element.id})"><i class="fa fa-check-circle"></i> Desativar</a>`;
    //     }
    //     row +=
    //         `<tr>
    //             <td>${indice + 1}</td>
    //             <td>${element.description}º ${element.classification} - ${convertShift(element.shift)} </td>
    //             <td>${convertStatus(element.status)}</td>           
    //             <td>${ticket}</td>        
    //         </tr>`;

    // });
    return row;
}


function listDPS(idSerie, day, position, shift) {

    axios.get(`${URL_BASE}/horario/api/listDPS/${idSerie}/${day}/${position}/${shift}`)
        .then(response => {

            console.log(response);

            if (response.data == 'vago') {
                document.getElementById(`row${position}${day}${idSerie}`).innerHTML = `
                <div class="w-150 text-center align-items-center" style="display: flex;
                justify-content: center;">
            <div class="m-1 p-2 w-120" style="background-color: transparent; border: 1px solid #9a9a9c; color:black; border-radius: 5px; display: flex;
            justify-content: center;" data-toggle="tooltip" data-placement="top" title="Aguardando alocação!">
            <div>
                <img src="${URL_BASE}/assets/img/discipline-vague.png" width="28px" class="me-2 border-radius-lg m-1" alt="spotify">
            </div>
            <div class="my-auto">
                <h6 class="mb-0 text-sm font-weight-bold"> VAGO</h6>
            </div>
        </div></div>`
            } else if (response.data != 'livre') {             
                console.log(response.data);
                document.getElementById(`row${position}${day}${idSerie}`).innerHTML = `
            <div class="w-150 text-center align-items-center" style="display: flex;
            justify-content: center;">
                <a href="#" class="text-center align-items-center" onclick = "delScheduleTeacher(${response.data.id})" data-bs-toggle="modal" data-bs-target="#delScheduleTeacherModal" title="Clique para remover!">
                <div class="m-0 p-2 w-120" style="background-color: ${response.data.color}; color:white; border-radius: 5px; display: flex;
                justify-content: center; ">
                
                    <div>
                        <img src="${URL_BASE}/assets/img/${response.data.icone}" width="24px" class="me-2 border-radius-lg m-1" alt="spotify">
                    </div>
                    <div class="my-auto text-center">
                        <h6 class="mb-0 font-weight-bold font-size-11" style="color:white;"> ${response.data.name.split(" ", 1)}</h6>
                        <span class="mb-0 font-weight-bold text-sm">${response.data.abbreviation}</span>
                    </div>
                            </div>          
                </a>
            </div>`
                //loadDisc(response.data)
            } else {
                document.getElementById(`row${position}${day}${idSerie}`).innerHTML = `
                <div class="w-150 text-center align-items-center" style="display: flex;
                justify-content: center;">
                <a href="#" onclick = "addSchedule(${idSerie},${position},${day},'${shift}')" data-bs-toggle="modal" data-bs-target="#addScheduleTeacherModal" title="Clique para adicionar!">
            <div class="d-flex m-1 p-2 w-120" style="background-color: #343a40; color:white; border-radius: 5px;">
            <div>
                <img src="${URL_BASE}/assets/img/discipline-default.png" width="24px" class="me-3 border-radius-lg m-2" alt="spotify">
            </div>
            <div class="my-auto">
                <h6 class="mb-0 text-sm font-weight-bold" style="color:white;"> LIVRE</h6>
            </div>
        </div></a></div>`
            }


        })
        .catch(error => console.log(error))

      

}

// Adicionar horario
const addScheduleModal = new bootstrap.Modal(document.getElementById('addScheduleTeacherModal'));
async function addSchedule(idSerie, position, dayWeek, shift) {
    document.getElementById('msgAlertErrorAddSchedule').innerHTML = ''
    document.getElementById('fieldAlertErrorAddScheduleDiscipline').textContent = ''

    //addScheduleModal.show();
    document.getElementById('idSerie').value = idSerie
    document.getElementById('position').value = position
    document.getElementById('dayWeek').value = dayWeek
    document.getElementById('shift').value = shift
    //document.getElementById('shiftFake').innerText = convertShift(shift)
    document.getElementById('dayWeekFake').innerText = convertDayWeek(dayWeek, true)
    document.getElementById('positionFake').innerText = `${position}ª`
    const divOpcao = document.getElementById('divOpcao')
    divOpcao.innerHTML = ''

    // await axios.get(`${URL_BASE}/series/show/${idSerie}`)
    //     .then(response => {
    //         console.log(response.data)
    //         document.getElementById('idSerieFake').innerText = `${response.data[0].description}º ${response.data[0].classification}`
    //     })
    //     .catch(error => console.log(error))

    getSeries(idSerie, 'idSerieFake');

    await axios.get(`${URL_BASE}/horario/api/getAllocation/${idSerie}/${dayWeek}/${position}/${shift}`)
        .then(response => {
            const data = response.data;
            data.forEach(element => {
                divOpcao.innerHTML += `
                <div class="testando" style="width:160px; color:white">
             <input class="form-check-inline" onclick="eraseAlert(['fieldAlertErrorAddScheduleDiscipline','msgAlertErrorAddSchedule']);" name="nIdAlocacao" value="${element.id}" type="radio" id="gridCheck1${element.id}">
            <label style="background-color:${element.color};" class="form-check-label" for="gridCheck1${element.id}">

              <div class="d-flex">
                <div>
                  <img src="${URL_BASE}/assets/img/${element.icone}" width="28px" class="me-1 border-radius-lg p-1" alt="">
                </div>
                <div class="my-auto" style="color:white">
                  <h6 class="mb-0 font-weight-bold font-size-11" style="color:white">${element.name.split(" ", 1)}</h6>
                  <span class="mb-0 font-weight-bold font-size-11">${element.abbreviation}</span>
              </div>
              

            </label>
          </div>
                `
            });
        })
        .catch(error => console.log(error))
}

const addScheduleForm = document.getElementById('addScheduleForm');
console.log(addScheduleForm);

if (addScheduleForm) {
    addScheduleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        //load();
        const dataForm = new FormData(addScheduleForm);
        await axios.post(`${URL_BASE}/horario/api/create`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.data.error) {
                    //stopLoad();
                    console.log('errro')
                    document.getElementById('msgAlertErrorAddSchedule').innerHTML = response.data.msg
                    document.getElementById('fieldAlertErrorAddScheduleDiscipline').textContent = 'Escolha obrigatória!'

                } else {
                    // load();
                    // //console.log(response.data)
                    addScheduleModal.hide();
                    loadToast(typeSuccess, titleSuccess, messageSuccess);
                    //loada();
                    //location.reload();
                    listSchedule(dataForm.get('nShift'));
                }
            })
            .catch(error => console.log(error))
    })
}

// End adicionar horario


//const deleteScheduleModal = new bootstrap.Modal(document.getElementById('deleteScheduleModal'));

// async function deleteSchedule(id) {
//     await axios.get(`${URL_BASE}/horario/api/delete/${id}`)
//         .then(response => {
//             const data = response.data;
//             console.log(data);
//             if (data) {
//                 //deleteScheduleModal.show();
//                 document.getElementById('idDelete').value = data.id
//                 document.getElementById('disciplineDel').innerHTML = `${data.name.split(" ", 1)} - <span>${data.abbreviation}</span> - <span id="idSerieDel">${getSeries(data.id_series, 'idSerieDel')}</span>`
//                     ;
//                 document.getElementById('positonDel').innerText = `${data.position} ª AULA - `
//                 document.getElementById('dayWeekDel').innerText = `${convertDayWeek(data.dayWeek)} - `
//                 document.getElementById('shiftDel').innerText = convertShift(data.shift)
//                 //document.getElementById('nameDel').innerText = data.name.split(" ", 1)
//                 document.getElementById('color').style.backgroundColor = data.color
//                 document.getElementById('headerScheduleRemove').style.backgroundColor = data.color
//                 document.getElementById('headerScheduleRemove').style.color = '#FFF'
//                 document.getElementById('image-disc').innerHTML = ` <img src="${URL_BASE}/assets/img/${data.icone}" width="28px" class="me-3 border-radius-lg m-2" alt="spotify">`
//             }
//         })
//         .catch(error => console.log(error))

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
                    listSchedule(dataForm.get('shiftDel'))

                }
            })
            .catch(error => console.log(error))

    });



}

// const deleteScheduleForm = document.getElementById('deleteScheduleForm');

// if (deleteScheduleForm) {

//     deleteScheduleForm.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const dataForm = new FormData(deleteScheduleForm);

//         await axios.post(`${URL_BASE}/horario/api/del`, dataForm, {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//             .then(response => {
//                 if (response.data.error) {
//                     document.getElementById('msgAlertError').innerHTML = response.data.msg
//                     document.getElementById('fieldlertError').textContent = 'Preenchimento obrigatório!'
//                     document.getElementById("msgAlertSuccess").innerHTML = "";
//                 } else {
//                     // console.log('deu certo')
//                     // document.getElementById('msgAlertError').innerHTML = '';
//                     // document.getElementById('fieldlertError').textContent = '';
//                     // //editModal.hide();
//                     // document.getElementById('msgAlertSuccess').innerHTML = response.data.msg
//                     deleteScheduleModal.hide();
//                     loadToast(titleSuccess, bodySuccess, success);
//                     //loada();
//                     //location.reload();
//                     listSchedule();

//                 }
//             })
//             .catch(error => console.log(error))

//     });



// }

async function getSeries(id, locale) {

    await axios.get(`${URL_BASE}/series/show/${id}`)
        .then(response => {
            console.log(response.data)
            document.getElementById(locale).innerText = `${response.data[0].description}º${response.data[0].classification} - ${convertShift(response.data[0].shift)}`
            //document.getElementById(locale).innerText = `cu`
        })
        .catch(error => console.log(error))
}

async function listSeries(shift) {
    await axios.get(`${URL_BASE}/series/list/shift/${shift}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            document.querySelector("#tb_schedule > thead > tr").innerHTML = `${loadDataSeries(data)}`;
            //loadDataTable(data)
        }
        )
        .catch(error => console.log(error))
}

function loadDataSeries(data) {
    let row = "";
    row += `<td class="text-uppercase text-secondary text-xxs font-weight-bolder text-dark">Dias</td>
    <td class="text-uppercase text-secondary text-xxs font-weight-bolder text-dark ps-2">Aulas</td>`

    console.table(data)

    data.forEach((element, indice) => {
        

        row +=
            `<td class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
            <div class="text-center align-items-center" style="display: flex;
            justify-content: center;">
                <a href="#" onclick="listScheduleSeries(${element.id})" data-bs-toggle="modal" data-bs-target="#listScheduleSeriesModal" title="Imprimir"  class="btn btn-outline-primary">
                    <span class="font-weight-bold">
                        <i class="fa fa-users" aria-hidden="true"></i> ${element.description}º${element.classification}
                    </span>
                </a> </div>   
                
            </td>`;

    });
    return row;
}
