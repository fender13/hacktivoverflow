import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js';
import Home from './views/Home.vue'
import MemberArea  from './views/Member.vue'
import DashboardPage from './views/Dashboard.vue'
import AddNewQuestions from './views/AddNewQuestions.vue'
import QuestionListPage from './views/ViewAllQuestions.vue'
import QuestionPage from './views/Question.vue'
import UpdatePage from './views/UpdateQuestion.vue'
import AnswerPage from './views/UpdateAnswer.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'MemberArea',
      component: MemberArea
    },
    {
      path: '/dashboard',
      name: 'DashboardPage',
      component: DashboardPage,
      meta: {
        authRequired: true
      }
    }, 
    {
      path: '/addnewquestion',
      name: 'AddNewQuestions',
      component: AddNewQuestions,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/dashboard/viewquestions',
      name: 'QuestionListPage',
      component: QuestionListPage,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/question/:id/update',
      name: 'UpdatePage',
      component: UpdatePage,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/answer/:id/update',
      name: 'AnswerPage',
      component: AnswerPage,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/question/:id/:title',
      name: 'QuestionPage',
      component: QuestionPage
    },
    
    
  ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (!localStorage.getItem('token')) {
            next({
                path: '/login'
            });
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router