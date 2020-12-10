const axios = require("axios");
var url = 'http://142.93.48.204:5000/api';

class ReportService {
    getAll(ListFilters) {
        return axios.post(url + '/reports', {
            Page: ListFilters.Page,
            PageSize: ListFilters.PageSize,
            ReportType: ListFilters.ReportType,
            EconomicNumber: ListFilters.EconomicNumber,
            Operator: ListFilters.Operator
        });
    }
    getPDF(root) {
        return axios.get(url + `/reports/downloadpdf?PDFPath=${root}`, { responseType: 'arraybuffer' });
    }
}

export default new ReportService();