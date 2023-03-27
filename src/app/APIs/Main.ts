import { BaseUrl } from "src/config";

export const MainController ={
    "GetAllDoctors":BaseUrl + `api/Main/GetAllDoctors`,
    "GetDoctorById":BaseUrl + `api/Main/GetDoctorById`,
    "AddDoctor":BaseUrl + `api/Main/AddDoctor`,
    "GetClinicAllDoctors":BaseUrl + `api/Main/GetClinicAllDoctors`,

    "GetDoctorWorkingDays":BaseUrl + `api/Main/GetDoctorWorkingDays`,

    "GetDoctorWorkingDaySlots":BaseUrl + `api/Main/GetDoctorWorkingDaySlots`,
    

    "GetTodayDoctorAppointment":BaseUrl + `api/Main/GetTodayDoctorAppointment`,
    "GetDoctorAppointmentByDates":BaseUrl + `api/Main/GetDoctorAppointmentByDates`,

    "AddWorkingDay":BaseUrl + `api/Main/AddWorkingDay`,

    "AddAppointment":BaseUrl + `api/Main/AddAppointment`,
    "NumberOfPatientPerDoctor":BaseUrl + `api/Main/NumberOfPatientPerDoctor`,
    
}