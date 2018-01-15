import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home/';
import Users from '@/views/users/';
import Projects from '@/views/projects/';
import ProjectDetail from '@/views/projects/detail';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home,
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/projects',
      name: 'projects',
      component: Users
    },
    {
      path: '/projects/:projectId',
      name: 'project',
      component: Users
    },
  ]
})
