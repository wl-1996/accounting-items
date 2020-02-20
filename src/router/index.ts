import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Money from '@/components/Money.vue';
import Labels from '@/components/Labels.vue';
import Statistics from '@/components/Statistics.vue';
import NotFound from '@/components/NotFound.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/money'
    },
    {
        path: '/money',
        component: Money
    },
    {
        path: '/labels',
        component: Labels
    },
    {
        path: '/statistics',
        component: Statistics
    },
    {
        path: '*',
        component: NotFound
    }
];

const router = new VueRouter({
    routes
});

export default router;
