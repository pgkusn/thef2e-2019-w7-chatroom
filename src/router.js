import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'landing',
            component: () => import('./views/Landing.vue')
        },
        {
            path: '/room',
            name: 'room',
            component: () => import('./views/Room.vue')
        },
    ]
});

router.afterEach((to, from) => {
    if (to.name !== 'room') {
        localStorage.removeItem('chartId');
        localStorage.removeItem('chartName');
    }
});

export default router;