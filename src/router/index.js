import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Homeview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Loginview.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: {requiresAuth: true},
      children: [
        {
          path: '/admin/propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: '/admin/nueva',
          name: 'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue')
        }
      ]
    }
  ]
})

//Guard de navegacion
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth);
  if(requiresAuth){
    //Comprobar que el usuario esté autenticado
    console.log('necesita');
  }else{
    //no está protegido, muestro la vista
    console.log('no need');
    next()
  }
})

export default router
