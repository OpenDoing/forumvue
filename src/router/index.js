import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Register from '@/views/Register'
import Topic from '@/views/Topic'
import Rank from '@/views/Rank'
import Profile from '@/views/Profile'
import Publish from '@/views/Publish'
import Answer from '@/views/Answer'
// 前端相关
import HTMLTopic from '@/views/topic/front/HTMLTopic'
import CSSTopic from '@/views/topic/front/CSSTopic'
import JavascriptTopic from '@/views/topic/front/JavascriptTopic'
import VueTopicTopic from '@/views/topic/front/VueTopic'
//后台
import JavaSETopic from '@/views/topic/backstage/JavaSETopic'
import MavenTopic from '@/views/topic/backstage/MavenTopic'
import SpringBootTopic from '@/views/topic/backstage/SpringBootTopic'
//数据库
import JPATopic from '@/views/topic/db/JPATopic'
import MyBatisTopic from '@/views/topic/db/MyBatisTopic'
import MySQLTopic from '@/views/topic/db/MySQLTopic'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/forum/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/answer/:id',
      name: 'Answer',
      component: Answer
    },
    {
      path: '/topic',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/HTML',
      name: 'HTMLTopic',
      component: HTMLTopic
    },
    {
      path: '/CSS',
      name: 'CSSTopic',
      component: CSSTopic
    },
    {
      path: '/Javascript',
      name: 'JavascriptTopic',
      component: JavascriptTopic
    },
    {
      path: '/Vue',
      name: 'VueTopic',
      component: VueTopicTopic
    },
    {
      path: '/JavaSE',
      name: 'JavaSETopic',
      component: JavaSETopic
    },
    {
      path: '/Maven',
      name: 'MavenTopic',
      component: MavenTopic
    },
    {
      path: '/SpringBoot',
      name: 'SpringBootTopic',
      component: SpringBootTopic
    },
    {
      path: '/JPA',
      name: 'JPATopic',
      component: JPATopic
    },
    {
      path: '/MyBatis',
      name: 'MyBatisTopic',
      component: MyBatisTopic
    },
    {
      path: '/MySQL',
      name: 'MySQLTopic',
      component: MySQLTopic
    },
  ]
})
