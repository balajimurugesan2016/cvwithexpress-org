const express = require('express');
const DBservice = require('../services/dbservice');
const app = express();
const router = express.Router();
var hana = require('@sap/hana-client');
var bodyParser = require('body-parser');
var session = require('express-session');

const PersonService = require('../services/personservice');

const dbservice = new DBservice(hana);
const personservice = new PersonService(dbservice);
var personaldata = "";

module.exports = () => {

    router.use(bodyParser.urlencoded({
        extended: false
    }));
    // parse application/json
    router.use(bodyParser.json());
    router.use(session({
        secret: "Shh, its a secret!"
    }));

    router.get('/resume', async (req, resp, next) => {

        success = false;
        if (req.session.successflag) {

            success = req.session.successflag;
        }

        var generalinfo = "";
        try {
            personaldata = await personservice.getPersonalData('Mary Albert');
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
            res.status(404);
            console.log(err);

        }


        resp.render('index', {
            personaldata,
            generalinfo,
            workexperiences,
            educationlist,
            portfoliolist,
            referencelist,
            success

        });


        resp.locals.successflag = false;

    })


    router.post('/form', (req, res) => {
        try {
            personservice.setLead(personaldata.ID, req.body);
            req.session.successflag = true;
            res.redirect("/api/resume");
        } catch (err) {

            req.session.successflag = false;
            res.redirect("/api/resume");
        }


    });


    return router;


}