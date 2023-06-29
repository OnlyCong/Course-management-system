import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import Rights from '@/components/power/Rights.vue'
import Roles from '@/components/power/Roles.vue'
import Indexsearch from '@/components/course/Indexsearch.vue'
import Studentcondition from '@/components/course/Studentcondition.vue'
import Recommend from '@/components/course/Recommend.vue'
import Info from '@/components/information/Info.vue'
import Teacheredit from '@/components/course2/teacheredit.vue'
import Indexedit from '@/components/course2/Indexedit.vue'
import Article from '@/components/article/index.vue'
import Score from '@/components/score/index.vue'


Vue.use(VueRouter)

const routes = []
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },//重定向到/login的地址
    { path: '/login', component: Login },
    {
      path: '/home', component: Home,
      redirect: '/welcome',
      children: [{ path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/goods', component: Indexsearch },
      { path: '/params', component: Studentcondition },
      { path: '/categories', component: Recommend },
      { path: '/orders', component: Info },
      { path: '/repoints', component: Teacheredit },
      { path: '/reports', component: Indexedit },
      { path: '/articles', component: Article },
      { path: '/courses', component: Score },

      ]
    }//定义路由规则
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  // from 从那个路径来
  // next 放行函数
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token')
  //token里面没有东西（证明没有登录）就强制跳转回去登录页面
  if (!tokenStr) return ('/login')
  next()
})
export default router


