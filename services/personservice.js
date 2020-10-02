module.exports = class PersonService {


    constructor(data) {

        this.personalData = data;


    }

    async getGeneralInfo() {

        const {
            generalInfo
        } = await this.personalData.generalInfo;

        return generalInfo;


    }





}