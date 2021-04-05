import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import ShowCalendar from "@/components/ShowCalendar";
import ShowSyllabus from "@/components/ShowSyllabus";
import ShowScore from "@/components/ShowScore";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '',
                name: 'ShowCalendar',
                component: ShowCalendar
            },
            {
                path: 'syllabus',
                name: 'ShowSyllabus',
                component: ShowSyllabus
            },
            {
                path: 'score',
                name: 'ShowScore',
                component: ShowScore
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

let mutex = 1
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !localStorage.getItem('userData')) next({name: 'Login'})
    else if (mutex === 1) {
        window.api.updateUserData().then(r => {
            console.log(r)
            mutex = 0
            next()
        })
    } else next()
})

export default router
