import Vue from "vue"
import Router from "vue-router"
import user from "./views/user.vue"
import crane from "./views/crane.vue"
import home from "./views/Home.vue"
import login from "./views/login.vue"
import report from "./views/report.vue"
import store from './store.js'
import { BIconListNested } from "bootstrap-vue"

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/login",
            name: "login",
            component: login,

        }, {
            path: "/",
            name: "home",
            component: home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/user",
            name: "user",
            component: user,
            meta: {
                requiresAuth: true,
                protectedRoute: true,
                level: "Administrador"
            }
        }, {
            path: "/report",
            name: "report",
            component: report,
            meta: {
                requiresAuth: true
            }
        }, {
            path: "/crane",
            name: "crane",
            component: crane,
        }
    ]
});

router.beforeEach((to, from, next) => {

    if (to.meta.protectedRoute) {
        let userRole = store.getters.userLog;
        let role = to.meta.level;
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (store.getters.isLoggedIn) {
                if (role == "Administrador" && userRole == "Administrador") next()
                else next("/error-auth")

            } else {
                next('/login')
            }
        } else {
            next()
        }
    } else {
        next()
    }


})

export default router;