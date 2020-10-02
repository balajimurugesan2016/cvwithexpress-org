const express = require('express');
const DBservice = require('../services/dbservice');
const app = express();
const router = express.Router();
var hana = require('@sap/hana-client');
const PersonService = require('../services/personservice');
module.exports = () => {


    router.get('/resume', async (req, resp, next) => {

        const dbservice = new DBservice(hana);
        const personservice = new PersonService(dbservice);
        var personaldata = "";
        var generalinfo = "";
        try {
            personaldata = await personservice.getPersonalData('DANIEL HUFFMAN');
            personaldata = personaldata[0];
            if (personaldata.ID) {
                generalinfo = await personservice.getGeneralInfo(personaldata.ID);
                generalinfo = generalinfo[0]
                workexperiences = await personservice.getworkexperiences(personaldata.ID);
                educationlist = await personservice.geteducation(personaldata.ID);
                portfoliolist = await personservice.getportfolio(personaldata.ID);
                referencelist = await personservice.getreferencelist(personaldata.ID);
                console.log(referencelist);
            }


        } catch (err) {
            console.log(err);

        }


        resp.render('index', {
            personaldata,
            generalinfo,
            workexperiences,
            educationlist,
            portfoliolist,
            referencelist

        });

    })


    return router;


}