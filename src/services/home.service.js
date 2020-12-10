const axios = require("axios");
var url = 'http://142.93.48.204:5000/api';

class HomeService {
    getAvailabilityData() {
        return axios.get(url + '/crane/GetAvailability');
    }
    getStatusData() {
        return axios.get(url + '/crane/getstatuscount');
    }
}

export default new HomeService();