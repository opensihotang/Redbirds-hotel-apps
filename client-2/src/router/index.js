import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import BookmarkList from '../components/BookmarkList.vue'
import LodgingDetail from '../views/LodgingDetail.vue'
import Layout from '../components/Layout.vue'

 const routes = [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children : [
        {
          path: '',
          name: 'home',
          component : Home
        },
        {
          path: '/bookmark',
          name: 'bookmark',
          component : BookmarkList
        },
        {
          path: '/lodging/:id',
          name: 'detaillodging',
          component : LodgingDetail
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component : Register
    },
    {
      path: '/login',
      name: 'login',
      component : Login
    },
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  

  // router.beforeEach((to, from, next) => {
  //   const isAuthenticated = localStorage.getItem("access_token");
  //   if (to.name !== "login" && !isAuthenticated) {
  //     next({ name: "login" });
  //   } else if (isAuthenticated && to.name === "login") {
  //     next("/bookmark");
  //   } else {
  //     next();
  //   }
  // });

export default router
