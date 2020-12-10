const axios = require("axios");
var url = 'http://142.93.48.204:5000/api';

class CraneService {
    getAll(ListFilters) {
        return axios.post(url + '/crane/getAllCranes', {
            Page: ListFilters.Page,
            PageSize: ListFilters.PageSize,
            EconomicNumber: ListFilters.EconomicNumber,
            Serie: ListFilters.Serie,
            Operator: ListFilters.Operator,
            Status: ListFilters.Status,
        });
    }

    delete(economicNumber) {
        return axios.delete(url + `/crane?economicNumber=${economicNumber}`);

    }

    create(Crane) {
        return axios.post(url + '/crane', {
            EconomicNumber: Crane.economicNumber,
            Serie: Crane.serie,
            Brand: Crane.brand,
            SubBrand: Crane.subbrand,
            Model: Crane.model,
            Process: Crane.process,
            Status: Crane.status,
            RPE: Crane.rpe,
            Hydraulic: {
                Serie: Crane.serieHT,
                Brand: Crane.brandHT,
                SubBrand: Crane.subbrandHT,
                Model: Crane.modelHT,
                LAPEM: Crane.LAPEM
            }
        });
    }

    update(Crane) {
        return axios.put(url + '/crane', {
            EconomicNumber: Crane.economicNumber,
            Serie: Crane.serie,
            Brand: Crane.brand,
            SubBrand: Crane.subbrand,
            Model: Crane.model,
            Process: Crane.process,
            Status: Crane.status,
            RPE: Crane.rpe,
            Hydraulic: {
                Serie: Crane.serieHT,
                Brand: Crane.brandHT,
                SubBrand: Crane.subbrandHT,
                Model: Crane.modelHT,
                LAPEM: Crane.LAPEM
            }
        });
    }
    getProcess() {
        return axios.get(url + '/crane/getprocess');
    }

    getStatus() {
        return axios.get(url + '/crane/getstatus');
    }

    getCraneByEconomicNumber(economicNumber) {
        return axios.get(url + `/crane/getbyeconomicnumber?economicNumber=${economicNumber}`);

    }
    getHoursPerWeekData(economicNumber) {
        return axios.get(url + `/crane/gethoursperweek?economicNumber=${economicNumber}`);
    }


}

export default new CraneService();