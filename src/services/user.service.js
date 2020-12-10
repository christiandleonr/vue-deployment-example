const axios = require("axios");
var url = 'http://142.93.48.204:5000/api';

class UserService {
    getAll(ListFilters) {
        return axios.post(url + '/user/getall', {
            Page: ListFilters.Page,
            PageSize: ListFilters.PageSize,
            RPE: ListFilters.RPE,
            Name: ListFilters.Name,
            Level: ListFilters.Level,
            Status: ListFilters.Status,
        });
    }
    create(User) {
        return axios.post(url + '/user', {
            RPE: User.RPE,
            Name: User.name,
            Status: User.Status,
            Password: User.password,
            ReportsTo: User.boss,
            Level: User.level
        });
    }

    update(User) {
        return axios.put(url + '/user/UpdateUser', {
            RPE: User.RPE,
            Name: User.name,
            Status: User.status,
            Password: User.password,
            ReportsTo: User.boss,
            Level: User.level
        });
    }

    delete(RPE) {
        return axios.delete(url + `/user?RPE=${RPE}`);

    }

    getUserByRPE(RPE) {
        return axios.get(url + `/user/GetByRPE?RPE=${RPE}`);

    }

    getLevels() {
        return axios.get(url + '/user/getlevels');
    }

    getOperator(name) {
        return axios.get(url + `/user/GetNameAutocompleted?partialName=${name}`);
    }



}

export default new UserService();