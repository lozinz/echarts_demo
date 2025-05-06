import  router  from 'vue-router'

export const routers = router.createRouter({
  routes:[
    {
      path:'/login',
      component: ()=> import('')
    },
    {
      path:'/layout',
      component:()=> import(''),
      children:[
        {
          path: '/visualization'
        }
      ]
    }
  ]
})