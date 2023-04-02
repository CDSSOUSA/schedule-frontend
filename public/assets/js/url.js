const URL_BASE = 'http://localhost/gerenciador-horario/public';
const URL_FRONT = 'http://localhost/schedule-frontend/public';

const URIS = {
    login: {
        in: "login",
        out: "logout",
        validate: "login/validate"
    },
    logout: "logout",
    teacher: {
        create: "teacher/create",
        update: "teacher/update",
        delete: "teacher/del",
        list: "teacher/list",
        listOff: "teacher/listOff",
        show: "teacher/show"
    },
    schedule: {
        delete: "horario/api/del",
        listDiscipline: 'horario/api/listDisciplines',
        listSeries: "horario/api/listSeries",
        replace: "horario/api/replace"
        
    },
    discipline: {
        create: "discipline/create",
        update: "discipline/update",
        list: "discipline/list",
        show: "discipline/show",
        delete: "discipline/del",
    },
    series: {
        create: "series/create",
        update: "series/update",
        show: "series/show",
        active: "series/active",
        list: {
            shift:"series/list/shift"
        }
    },
    report: {
        series: "report/series"
    }
}

const loadLogin = () => {
    window.location.href = `${URL_FRONT}`
}