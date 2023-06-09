var typeSuccess = 'success';
var titleSuccess = '<strong class="me-auto">Parabéns!</strong>';
var messageSuccess = '<i class="bi bi-hand-thumbs-up-fill"></i> Operação realizada com sucesso.';

var typeError = 'error';
var titleError = '<strong class="me-auto">OPS!</strong>';
var messageError = '<i class="bi bi-hand-thumbs-down-fill"></i> Ocorreu um erro, tente novamente.';


const urlParams = window.location.pathname.split('/');
//const shift = urlParams[5]
//const shift = 'T'
console.log(urlParams[3])

// if(urlParams[4] == 'schedule.php') {
//     document.getElementById('menu-schedule').classList.add('text-decoration-underline', 'fw-bold');
// } else {
//     document.getElementById('menu-teacher').classList.add('text-decoration-underline', 'fw-bold');
// }

// area.forEach((el)=>{
//     console.log(el)
// })

function showLoading(){
    const div = document.createElement("div")
    div.classList.add("loadOi");
    div.setAttribute("id","loadOi");
    div.style.display = "flex"
    
    const divi = document.createElement("div")
    divi.classList.add("ellipsis");

    const span = document.createElement("span")
    span.classList.add("loa")
    span.innerText = "Carregando ..."
    // const label = document.createElement("label");
    // label.innerText = "Carregando..."
    div.appendChild(divi);
    div.appendChild(span);
    document.body.appendChild(div)
    //const loadings = document.getElementsByClassName("page-loader-wrapper")
   // alert('oi')

/* <div class="loadOi" id="loadOi">
  <div class="ring">
  </div>
  <span class="loa"> Atualizando... </span>    
</div>   */

   //const load = document.getElementById('loadOi').style.display = "flex";
}

function hideLoading(){
    // const loadings = document.getElementsByClassName("page-loader-wrapper")
    // if(loadings.length) {
    //     loadings[0].remove()
    // }
    document.getElementById('loadOi').remove();
}

const loadMenu = () => {
    let area = [
        'teacher',
        'discipline',
        'series',
        'schedule',
        'year'
    ]
    area.forEach((el) => {
        document.getElementById(`menu-${el}`).setAttribute('href', `${URL_FRONT}/${el}`);
        
    })    
    document.getElementById('menu-home').setAttribute('href', `${URL_FRONT}/home`);
}

loadMenu()

const validateArea = (area) => {
    if (area) {
        //document.getElementById(`menu-${area}`).setAttribute('href', `${URL_FRONT}/${area}`);
        document.getElementById(`menu-${area}`).classList.add('text-decoration-underline', 'fw-bold','text-success');
        document.getElementById(`menu-${area}`).classList.remove('text-white');
    } else {
        document.getElementById('menu-home').classList.add('text-decoration-underline', 'fw-bold');
    }
}

validateArea(urlParams[3])

// document.getElementById('menu-teacher').setAttribute('href', `${URL_FRONT}/teacher`);
// document.getElementById('menu-teacher').classList.add('text-decoration-underline', 'fw-bold');

const gaInsertScript = () => {

    var ga = document.createElement('script')
    ga.type = 'text/javascript'
    ga.async = true
    ga.src = ('http://tiberiogeo.com.br')
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(ga, s)
}

var checkTodos = $(".checkTodos");
checkTodos.click(function () {
    document.querySelector('.tickets').textContent = ''
    if ($(this).is(':checked')) {
        $('input:checkbox').prop("checked", true);
        document.querySelector('.tickets').textContent = 'Desmarcar todos'
        eraseAlert('fieldAlertErrorDayWeekAllocation')
        eraseAlert('fieldAlertErrorShiftAllocation')
    } else {
        $('input:checkbox').prop("checked", false);
        document.querySelector('.tickets').textContent = 'Marcar todos'
    }
});

const eraseAlert = (option) => {

    if (typeof option == 'string') {
        document.getElementById(option).innerHTML = '';
    } else {
        option.forEach((e) => {
            document.getElementById(e).innerHTML = '';
        })
    }
}

// const checkAll = document.getElementById('checkAll');
// console.log(checkAll.checked);

// checkAll.addEventListener('click', () => {
//     $(".checkbox").each(
//         function () {
//             if (checkAll.checked == false) {
//                 //$(this).bootstrapSwitch('state', false);
//                 // checkAll.style.backgroundColor = '#FFF'
//                 // checkAll.style.color = '#000'
//                 alert('marcou')
//             } else {
//                 //$(this).bootstrapSwitch('state', true)
//                 // checkAll.style.backgroundColor = 'green'
//                 // checkAll.style.color = '#FFF'
//                 alert('desmarcou')
//             }
//         }
//     );
// });

// function marcaDesmarca(caller) {
//     var checks = document.querySelectorAll('input[type="checkbox"]');    
//     for(let i = 0; i < checks.length; i++) {
//       checks[i].checked = checks[i] == caller;   
//     }
//   }

// function marca(caller) {
//     var checks = document.querySelectorAll('input[type="checkbox"]');
//     for (let i = 0; i < checks.length; i++) {
//         checks[i].checked = checks[i] == caller;
//     }

//     //     checks.addEventListener('click', () => {   
//     //     $(":checkbox").each(
//     //         function() {
//     //             if ($(this).bootstrapSwitch('state')) {
//     //                 $(this).bootstrapSwitch('state', false);
//     //             } else {
//     //                 $(this).bootstrapSwitch('state',true)
//     //             }            
//     //         }
//     //     );
//     // }
//     ;

// }
// const URL_BASE = 'http://localhost/nw-templ/soft-ui-dashboard-main/pages/';
//const URL_BASE = 'http://localhost/gerenciador-horario/public';

const convertStatus = (status) => {
    let _shift = 'INATIVO'
    if (status === 'A')
        _shift = 'ATIVO'
    return _shift;
}
const convertStatusRotulo = (status) => {
    let _shift = 'ativada'
    if (status === 'A')
        _shift = 'desativada'
    return _shift;
}

const convertDayWeek = (dia, status) => {

    let day
    let data = [
        "SEG",
        "TER",
        "QUA",
        "QUI",
        "SEX",
        "SÁB"
    ]
    console.log(status);

    if (status === true) {
        data = [];
        data = [
            "SEGUNDA",
            "TERÇA",
            "QUARTA",
            "QUINTA",
            "SEXTA",
            "SÁBADO"
        ]
    }
    data.forEach((item, indice) => {
        if (dia == indice + 2) {
            day = item
        }
    });
    return day;
}

function translateSchedule(position, shift) {
    let textSchedule
    var schedule = [];
    schedule['M'] = [
        "07:00 - 07:45",
        "07:45 - 08:30",
        "08:30 - 09:15",
        "09:15 - 10:00",
        "10:00 - 10:45",
        "10:45 - 11:30",
        "11:30 - 12:15"
    ];
    schedule['T'] = [
        "13:00 - 13:45",
        "13:45 - 14:30",
        "14:30 - 15:15",
        "15:15 - 16:00",
        "16:00 - 16:45",
        "16:45 - 17:30",
        "17:30 - 18:15"
    ];

    //console.log(schedule)
    schedule[shift].forEach((item, ind) => {
        if (position == ind + 1) {
            //console.log(item)
            textSchedule = item
        }
    })
    return textSchedule


}



const convertShift = (turno) => {
    let shift = 'TARDE'
    if (turno === 'M')
        shift = 'MANHÃ'
    if(turno === 'N')
        shift = 'NOITE'
    return shift;
}

const convertShiftAbbreviation = (turno) => {
    let shift = 'Tar'
    if (turno === 'M')
        shift = 'Man'
    return shift;
}

const convertSituation = (situation) => {
    if (situation === 'L')
        return 'LIVRE';
    if (situation === 'O')
        return 'OCUPADO';
    return 'BLOQUEADO';
}

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
        timer: 10000
    })
}

const validateErros = (errors, locale) => {
    let r = document.getElementById(locale).innerHTML = '';
    if (errors) {
        r = document.getElementById(locale).innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ${errors}!`
    }
    return r;
}

const writeZero = (values) => {
    let value = String(values).length


    if (value <= 1) {
        return `0${values}`;
    }
    return values;

}

function printReportSerie(idSerie) {
    //listScheduleSeriesModal.hide();

    window.open(`${URL_BASE}/report/series/${idSerie}`);
}