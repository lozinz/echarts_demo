import  { createRouter,createWebHistory}  from 'vue-router'

const routers = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path:'/',
      redirect: '/layout'
    },
    {
      path:'/login',
      name: 'Login',
      component: ()=> import('../view/login/index.vue')
    },
    {
      path:'/layout',
      name: 'Layout',
      component:()=> import('../view/layout/index.vue'),
      children:[
        {
          path: '/visualization',
          component:()=> import('../view/visualization/index.vue')
        }
      ]
    }
  ]
})

export default  routers