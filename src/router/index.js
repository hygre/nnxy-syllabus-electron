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
                path: 'calendar',
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

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !localStorage.getItem('userData')) next({name: 'Login'})
    else next()
})

export default router
