const getConfiguration = async (id_year_school) => {

    try{
        await axios.get(`${URL_BASE}/config/${id_year_school}`,{}, {

            headers: {
            "Content-Type": "application/json"
        }})
        .then(response => {
            localStorage.setItem('startDayWeek', response.data[0].start_dayWeek);            
            localStorage.setItem('endDayWeek', response.data[0].end_dayWeek);            
            localStorage.setItem('qtdePosition', response.data[0].qtde_position);            
            //document.querySelector("#tb_series_schedule > thead > tr").innerHTML = `${getRowHeader(response.data)}`;
        })
        .catch(
            error => {
                loadToast(typeError,titleError,messageError)
                console.log(error)
            })

    } catch (error) {

    }
}

const defineRowsTable = (startDayWeek, endDayWeek, qtdePosition,target) => {

    document.querySelector(target).innerHTML = `${getRowHeader(startDayWeek, endDayWeek, qtdePosition)}`;

}

function getRowHeader(startDayWeek, endDayWeek, qtdePosition) {
    let row = "";

    row += `<th class="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Dias|Aulas</th>`

    for (let i = startDayWeek; i <= endDayWeek; i++) {
        row += `
        <th class="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">${convertDayWeek(i,true)}</th>`
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
getConfiguration(1)