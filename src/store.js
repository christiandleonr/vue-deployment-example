import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        userLog: localStorage.getItem('userLog') || '',
        rpeLog: localStorage.getItem('rpeLog') || ''
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token) {
            state.status = 'success'
            state.token = token
            state.userLog = localStorage.getItem('userLog')
            state.rpeLog = localStorage.getItem('rpeLog')
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.userLog = ''
            state.rpeLog = ''
        },
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: 'http://142.93.48.204:5000/api/login', data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token;
                        const userLog = resp.data.user.levelName;
                        const rpeLog = resp.data.user.rpe;
                        localStorage.setItem('token', token);
                        localStorage.setItem('rpeLog', rpeLog);
                        localStorage.setItem('userLog', userLog);


                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        axios.defaults.headers.common['Content-Type'] = 'application/json'
                        if (userLog == "Operador") {
                            commit('auth_error')
                            this.$router.push('/');
                        } else {
                            commit('auth_success', token, userLog)
                            resolve(resp)
                        }
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.clear();
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                axios({ url: 'http://142.93.48.204:5000/api/token', method: 'GET' })
                    .then(resp => {
                        const token = resp.data.token
                        localStorage.clear();
                        delete axios.defaults.headers.common['Authorization']
                        delete axios.defaults.headers.common['Content-Type']
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.clear();
                        reject(err)
                    })

            })
        }

    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        userLog: state => state.userLog,
        token: state => state.token,
        rpeLog: state => state.rpeLog
    }
})