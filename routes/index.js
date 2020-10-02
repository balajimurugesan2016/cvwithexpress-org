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
        var personaldata = ""
        try {
            personaldata = await personservice.getGeneralInfo('DANIEL HUFFMAN');
            personaldata = personaldata[0];
        } catch (err) {
            console.log(err);

        }


        resp.render('index', {
            personaldata
        });

    })


    return router;


}