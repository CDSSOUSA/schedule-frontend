const getConfiguration = async () => {

    try {
        await axios.get(`${URL_BASE}/config/show`, {}, {

            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {

                const data = response.data
                console.log(data)

                if (data.length >= 1) {

                    localStorage.setItem('startDayWeek', data[0].start_dayWeek);
                    localStorage.setItem('endDayWeek', data[0].end_dayWeek);
                    localStorage.setItem('qtdePosition', data[0].qtde_position);
                    localStorage.setItem('qtdeDayWeek', data[0].qtde_dayWeek);
                    localStorage.setItem('class_time', data[0].class_time);
                    localStorage.setItem('idConfiguration', data[0].id);
                    localStorage.setItem('shiftList', data[0].shift);

                    document.getElementById('qtdeDayWeek').value = data[0].qtde_dayWeek
                    document.getElementById('idConfiguration').value = data[0].id
                    document.getElementById('qtdePosition').value = data[0].qtde_position
                    document.getElementById('startDayWeek').value = data[0].start_dayWeek
                    document.querySelector('#shiftConfig').innerHTML = `${listShiftConfiguration(data[0].shift)}`
                    //document.getElementById('shift').value = data[0].start_dayWeek
                } else {
                    document.getElementById('qtdeDayWeek').value = ''
                    document.getElementById('qtdePosition').value = ''
                    document.getElementById('startDayWeek').value = ''
                    //document.querySelector('#shiftConfig').innerHTML = `${listShift(data[0].shift)}`
                }

                //document.querySelector("#tb_series_schedule > thead > tr").innerHTML = `${getRowHeader(response.data)}`;
            })
            .catch(
                error => {
                    loadToast(typeError, titleError, messageError)
                    console.log(error)
                })

    } catch (error) {

    }
}
getConfiguration()

// function defineTurno(target) {
//     document.querySelector(`#${target}`).innerHTML = `${listShift(shiftList)}`
// }

function listShiftConfiguration(shiftList) {

    const result = shiftList.split(';')

    let option = ''

    let checkManha = '';
    let checkTarde = '';
    let checkNoite = '';

    result.forEach((el) => {

        if(el === 'M') {
            checkManha = 'checked'
        } 
        if(el === 'T') {
            checkTarde = 'checked'
        }
        if(el === 'N') {
            checkNoite = 'checked'
        }
    })
        
        option += `
                <div class="form-check form-switch form-check-inline">
                    <input class="form-check-input" ${checkManha} onclick="eraseAlert('fieldlertErrorShiftConfiguration');"
                        name="shiftConfiguration[]" value="M" type="checkbox" role="switch" id="checboxShiftConfigM">
                    <label class="form-check-label font-weight-bold text-sm" for="checboxShiftConfigM">MANHÃ</label>
                    &nbsp;&nbsp;
                </div>
                <div class="form-check form-switch form-check-inline">
                    <input class="form-check-input" ${checkTarde} onclick="eraseAlert('fieldlertErrorShiftConfiguration');"
                        name="shiftConfiguration[]" value="T" type="checkbox" role="switch" id="checboxShiftConfigT">
                    <label class="form-check-label font-weight-bold text-sm" for="checboxShiftConfigT">TARDE</label>
                    &nbsp;&nbsp;
                </div>
                <div class="form-check form-switch form-check-inline">
                    <input class="form-check-input" ${checkNoite} onclick="eraseAlert('fieldlertErrorShiftConfiguration');"
                        name="shiftConfiguration[]" value="N" type="checkbox" role="switch" id="checboxShiftConfigN">
                    <label class="form-check-label font-weight-bold text-sm" for="checboxShiftConfigN">NOITE</label>
                    &nbsp;&nbsp;
                </div>
                `

    //})

    return option

}

const addConfigurationModal = new bootstrap.Modal(document.getElementById('addConfigurationModal'));

const addConfigurationForm = document.getElementById('addConfigurationForm');
console.log(addConfigurationForm)
addConfigurationForm.reset();

const addConfiguration = async () => {

    console.log('aqui')

   
    //document.querySelector('#shiftConfig').innerHTML = ''


    try {
        await axios.get(`${URL_BASE}/config/show`, {}, {

            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {

                const data = response.data
                console.log(data)

                if (data.length >= 1) {                  

                    document.getElementById('qtdeDayWeek').value = data[0].qtde_dayWeek
                    document.getElementById('idConfiguration').value = data[0].id
                    document.getElementById('qtdePosition').value = data[0].qtde_position
                    document.getElementById('startDayWeek').value = data[0].start_dayWeek
                    document.querySelector('#shiftConfig').innerHTML = `${listShiftConfiguration(data[0].shift)}`
                    //document.getElementById('shift').value = data[0].start_dayWeek
                } else{
                    document.getElementById('qtdeDayWeek').value = ''
                    document.getElementById('qtdePosition').value = ''
                    document.getElementById('startDayWeek').value = ''
                }

               
            })
            .catch(
                error => {
                    loadToast(typeError, titleError, messageError)
                    console.log(error)
                })

    } catch (error) {

    }

    console.log('addConfiguration')




   
//     // document.getElementById('qtdeDayWeek').value = localStorage.get('qtdeDayWeek')
//     // document.getElementById('idConfiguration').value =localStorage.get('idConfiguration')
//     // document.getElementById('qtdePosition').value = localStorage.get('qtdePosition')
//     // document.getElementById('startDayWeek').value = localStorage.get('startDayWeek')
//     // document.querySelector('#shiftConfig').innerHTML = `${listShiftConfiguration(localStorage.get('shiftList'))}`


    document.getElementById('msgAlertErrorConfiguration').innerHTML = ''
    document.getElementById('fieldlertErrorQtdeDayWeek').innerHTML = ''
    document.getElementById('fieldlertErrorQtdeLimite').innerHTML = ''
    document.getElementById('fieldlertErrorQtdePosition').innerHTML = ''
    document.getElementById('fieldlertErrorStartDayWeek').innerHTML = ''
    document.getElementById('fieldlertErrorShiftConfiguration').innerHTML = ''

    

}

if (addConfigurationForm) {
    addConfigurationForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dataForm = new FormData(addConfigurationForm);
        await axios.post(`${URL_BASE}/config/create`, dataForm, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {

                if (response.data.error) {
                    document.getElementById('msgAlertErrorConfiguration').innerHTML = response.data.msg
                    validateErros(response.data.msgs.error, 'fieldlertErrorQtdeLimite')
                    validateErros(response.data.msgs.qtdeDayWeek, 'fieldlertErrorQtdeDayWeek')
                    validateErros(response.data.msgs.qtdePosition, 'fieldlertErrorQtdePosition')
                    validateErros(response.data.msgs.startDayWeek, 'fieldlertErrorStartDayWeek')
                    validateErros(response.data.msgs.shiftConfiguration, 'fieldlertErrorShiftConfiguration')
                } else {

                    loadLogin()

                }

            })
            .catch(error => {
                console.log(error)
            })
    })
}




const defineRowsTable = (startDayWeek, endDayWeek, qtdePosition, target) => {

    document.querySelector(target).innerHTML = `${getRowHeader(startDayWeek, endDayWeek, qtdePosition)}`;

}

function getRowHeader(startDayWeek, endDayWeek, qtdePosition) {
    let row = "";

    row += `<th class="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Dias|Aulas</th>`

    for (let i = startDayWeek; i <= endDayWeek; i++) {
        row += `
        <th class="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">${convertDayWeek(i, true)}</th>`
    }

    // data.forEach(element => {

    //     row += `
    //     <th class="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Segunda</th>
    //     <th class="text-center text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Terça</th>
    //     <th class="text-center text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Quarta</th>
    //     <th class="text-center text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Quinta</th>
    //     <th class="text-center text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Sexta</th>`

    // });

    return row
}
