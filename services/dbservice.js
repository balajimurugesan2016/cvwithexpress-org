module.exports = class DBservice {


    constructor(db) {

        this.hana = db;
    }

    getconnectionoptions() {

        var connOptions = {
            serverNode: 'zeus.hana.prod.eu-central-1.whitney.dbaas.ondemand.com:32588',
            UID: "D4A4022E7221468688718C057DEA728C_1TBEDT8D9EP4W15IS5J1QIDHT_RT",
            PWD: "By5F0ySHDs7LSQKK6.TijcCbqzuUKVw4iOoj-8Ip7ceItAO3_nuVS4O24842Lz0oXEELZzts1gv7oC3W-sv58G_bBl0U.ScFLHlaLm4tZyGV33dDUYCuf1TF3_xqlr8i",
            encrypt: 'true', //Must be set to true when connecting to SAP HANA Cloud
            sslValidateCertificate: 'true', //Must be set to false when connecting
            //to an SAP HANA, express edition instance that uses a self signed certificate.

            //Below setting is used to specify where the trust store is
            //ssltruststore: '/home/dan/.ssl/trust2.pem',

            //Alternatively provide the contents of the certificate directly (DigiCertGlobalRootCA.pem)
            // ssltruststore: '-----BEGIN CERTIFICATE-----MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBhMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBDQTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVTMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5jb20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsBCSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7PT19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAOBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbRTLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUwDQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/EsrhMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJFPnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0lsYSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQkCAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=-----END CERTIFICATE-----'
        };

        return connOptions;

    }

    async fetchrecordsbyquery(sql) {


        return new Promise(function (resolve, reject) {

            var connection = this.getconnection();
            connection.connect(this.getconnectionoptions(), (err) => {
                if (err) {
                    reject(err);
                }

                console.log(sql);
                var rows = connection.exec(sql, (err, records) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(records);

                    connection.disconnect(function (err) {
                        if (err) {
                            reject(err);
                        }
                    });
                });
            });

        }.bind(this));



    }

    getconnection() {
        return this.hana.createConnection();


    }
}