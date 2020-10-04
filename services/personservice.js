const {
    resolve
} = require('path');
var util = require('util');

module.exports = class PersonService {


    constructor(dbservice) {

        this.hanaservice = dbservice;


    }

    async getPersonalData(name) {

        var sql = `SELECT ID,NAME,DESC FROM D4A4022E7221468688718C057DEA728C.PERSONAL_DATA  WHERE NAME =\'${name}\'`;

        return await this.hanaservice.fetchrecordsbyquery(sql);
    }

    async getGeneralInfo(id) {

        var sql = `SELECT * FROM D4A4022E7221468688718C057DEA728C.GENERAL_INFO  WHERE ID = ${id}`;

        return await this.hanaservice.fetchrecordsbyquery(sql);
    }

    async getworkexperiences(id) {
        var sql = `SELECT * FROM D4A4022E7221468688718C057DEA728C.WORK_EXPERIENCE  WHERE ID = ${id}`;

        return await this.hanaservice.fetchrecordsbyquery(sql);

    }

    async geteducation(id) {
        var sql = `SELECT * FROM D4A4022E7221468688718C057DEA728C.EDUCATION  WHERE ID = ${id}`;

        return await this.hanaservice.fetchrecordsbyquery(sql);

    }

    async getportfolio(id) {
        var sql = `SELECT * FROM D4A4022E7221468688718C057DEA728C.PORTFOLIO  WHERE ID = ${id}`;
        return await this.hanaservice.fetchrecordsbyquery(sql);

    }

    async getreferencelist(id) {
        var sql = `SELECT * FROM D4A4022E7221468688718C057DEA728C.REFERENCELIST  WHERE ID = ${id}`;
        return await this.hanaservice.fetchrecordsbyquery(sql);

    }

    async setLead(id, leadobj) {
        var sql = `INSERT INTO  D4A4022E7221468688718C057DEA728C.LEADS (id,name,email,subject,message) VALUES(${id},\'${leadobj.surname}\',\'${leadobj.email}\',\'${leadobj.subject}\',\'${leadobj.message}\')`;
        console.log(sql);

        try {


            return await this.hanaservice.fetchrecordsbyquery(sql);
        } catch (err) {
            console.log(err);
        }

    }








}