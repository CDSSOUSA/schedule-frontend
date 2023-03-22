var typeSuccess = 'success';
var titleSuccess = '<strong class="me-auto">Parabéns!</strong>';
var messageSuccess = '<i class="bi bi-hand-thumbs-up-fill"></i> Operação realizada com sucesso!';

const URL_BASE = 'http://localhost/gerenciador-horario/public';
const URL_FRONT = 'http://localhost/schedule-frontend/public';
const URIS = {
    teacher: {
        create: "teacher/create",
        update: "teacher/update",
        delete: "teacher/del"
    },
    schedule: {
        delete: "horario/api/del"
    }
}

const urlParams = window.location.pathname.split('/');
//const shift = urlParams[5]
//const shift = 'T'
console.log(urlParams[3])

// if(urlParams[4] == 'schedule.php') {
//     document.getElementById('menu-schedule').classList.add('text-decoration-underline', 'fw-bold');
// } else {
//     document.getElementById('menu-teacher').classList.add('text-decoration-underline', 'fw-bold');
// }

const loadMenu = () => {
    document.getElementById('menu-teacher').setAttribute('href', `${URL_FRONT}/teacher`);
    document.getElementById('menu-schedule').setAttribute('href', `${URL_FRONT}/schedule`);
}

loadMenu()

const validateArea = (area) => {
    if (area) {
        //document.getElementById(`menu-${area}`).setAttribute('href', `${URL_FRONT}/${area}`);
        document.getElementById(`menu-${area}`).classList.add('text-decoration-underline', 'fw-bold');
    } 
}

//     let trecho = area.split('.php', 1)
//     console.log(trecho[0])

//     if(trecho == 'schedule') {

//         document.getElementById('card-schedule').innerHTML = `
//         <div class="card bg-gradient-dark">
//         <div class="card-body p-3">
//             <div class="row">
//         <div class="col-8">
//             <div class="numbers">
//                 <div class="dropdown">
//                     <button class="btn bg-gradient-primary dropdown-toggle" type="button"
//                         id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
//                         <span>Quadro de horários</span>

//                     </button>
//                     <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                         <li><a class="dropdown-item" href="#" onclick="listSchedule('M')">Manhã</a></li>
//                         <li><a class="dropdown-item" href="#" onclick="listSchedule('T')">Tarde</a></li>
//                     </ul>
//                 </div>
//                 <h5 id="define-shift-menu" class="font-weight-bolder mb-0 text-success">
//                     30
//                 </h5>
//             </div>
//         </div>
//         <div class="col-4 text-end">
//             <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
//                 <i class="fas fa-th text-lg opacity-10" aria-hidden="true"></i>
//             </div>
//         </div>
//         </div>
//         </div>
//         </div>`


//         document.getElementById('menu-schedule').classList.add('text-decoration-underline', 'fw-bold');
//     } else if(trecho == 'teacher') {

//         document.getElementById('card-teacher').innerHTML = ` <div class="card bg-gradient-dark">
//         <div class="card-body p-3">
//             <div class="row">
//             <div class="col-8">
//         <div class="numbers">
//             <div class="dropdown">
//                 <button class="btn bg-gradient-primary dropdown-toggle position-relative" type="button"
//                     id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
//                     <span>Professor (a) </span>
//                     <span id="amount_teachers" class="badge text-bg-success position-absolute top-0 start-100 translate-middle rounded-pill">5</span>
//                 </button>
//                 <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="li_teacher">
//                 </ul>
//             </div>                            
//         </div>
//     </div>

//     <div class="col-4 text-end">
//         <a class="btn btn-icon btn-2 bg-gradient-primary" onclick="addTeacher()" data-bs-toggle="modal"
//             data-bs-target="#addTeacherModal">
//             <span class="btn-inner--icon" data-bs-toggle="tooltip" data-bs-title="Novo professor"><i class="fas fa-user"></i></span>    
//         </a>
//     </div>
//     <div class="row">
//         <h6 class="text-white font-weight-bolder mb-0">
//             <span id="nameTeacherButton" class="text-opacity-75 text-success">Atualizando . . . </span>
//             <span id="" class="text-success text-sm font-weight-bolder text-end"></span>
//         </h6>
//     </div></div></div></div>`


//         document.getElementById('menu-teacher').classList.add('text-decoration-underline', 'fw-bold');


//     }    
// }

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
    let _shift = 'Ativar'
    if (status === 'A')
        _shift = 'Desativar'
    return _shift;
}

const convertDayWeek = (dia, status) => {

    let day
    let data = [
        "SEG",
        "TER",
        "QUA",
        "QUI",
        "SEX"
    ]
    console.log(status);

    if (status === true) {
        data = [];
        data = [
            "SEGUNDA",
            "TERÇA",
            "QUARTA",
            "QUINTA",
            "SEXTA"
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
        "10:45 - 11:30"
    ];
    schedule['T'] = [
        "13:00 - 13:45",
        "13:45 - 14:30",
        "14:30 - 15:15",
        "15:15 - 16:00",
        "16:00 - 16:45",
        "16:45 - 17:30"
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
        timer: 2000
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