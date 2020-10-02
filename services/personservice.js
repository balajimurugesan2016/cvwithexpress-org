const {
    resolve
} = require('path');
var util = require('util');

module.exports = class PersonService {


    constructor(dbservice) {

        this.hanaservice = dbservice;


    }

    async getGeneralInfo(name) {

        var sql = `SELECT ID,NAME,DESC FROM D4A4022E7221468688718C057DEA728C.PERSONAL_DATA  WHERE NAME =\'${name}\'`;

        return await this.hanaservice.fetchrecordsbyquery(sql);
    }



}