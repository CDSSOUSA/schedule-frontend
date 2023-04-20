const URL_BASE = 'http://localhost/schedule-backend/public';
const URL_FRONT = 'http://localhost/schedule-frontend/public';
const URL_REPORT = 'http://localhost/schedule-report/public';

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
        delete: "teacher/delete",
        list: "teacher/list",
        listOff: "teacher/listOff",
        show: "teacher/show",
        listDiscipline:"teacher/listDisciplinesByTeacher",
        teacDisc: {
            create: "teacDisc/create",
            show: "teacDisc/show",
            update: "teacDisc/update",
            delete: "teacDisc/delete"
        },
        allocation: {
            create: "allocation/create",
            delete: "allocation/delete",
            showTeacherOcupation: "allocation/showTeacherOcupation",
            totalAllocationTeacher:"allocation/getTotalAllocationTeacher",
            showTeacherChecked:"allocation/showTeacherChecked"
        }
    },   
    schedule: {
        delete: "schedule/del",
        create: "schedule/create",
        listDiscipline: 'schedule/listDisciplines',
        listSeries: "schedule/listSeries",
        replace: "schedule/replace",
        list: "schedule/list",  
        allocation: "schedule/getAllocation",
        listDPS: "schedule/listDPS",  
        show: "schedule/show"
    },
    discipline: {
        create: "discipline/create",
        update: "discipline/update",
        list: "discipline/",
        show: "discipline/show",
        delete: "discipline/delete",
    },
    series: {
        create: "series/create",
        update: "series/update",
        show: "series/show",
        active: "series/active",
        list: {
            shift:"series/list/shift"
        },
        sendEmail :"series/sendEmail",
        send :"series/send"
    },
    year: {
        show:"year/show",
        active:"year/active",
        list:"year/",
        create:"year/create",
        update:"year/update"
    },
    report: {
        series: "report/series",
        teacher: "report/teacher",
        schedule: "report/schedule"
    }
}

const loadLogin = () => {

    loadToast(typeSuccess, titleSuccess, messageSuccess);
    window.location.href = `${URL_FRONT}`
}