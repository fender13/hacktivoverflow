<template>
    <div class="home">
        <div class="row">
            <div class="col-2">

            </div>
            <div class="col-7">
                <div class="main-container">
                    <div class="row home-title">
                        <div class="col-6">
                            <h5>Top Questions</h5>
                        </div>
                        <div class="col-6 buton-askquestion">
                            <button class="btn btn-primary" @click.prevent="onClickAddNew">Ask Question</button>
                        </div>
                    </div>
                    <div class="row question-row" v-for="(data, index) in listQuestions" :key="index">
                        <div class="col-1 main-question">
                            <div class="box-container">
                                <div class="boxes">
                                    <router-link  :to="{ name: 'QuestionPage', params: { id: data._id, title: data.title} }"><p class="title">{{ data.vote.length }}</p></router-link>
                                </div>
                                <div class="legend">
                                    <p>votes</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-1 main-question">
                            <div class="box-container">
                                <div class="boxes">
                                    <router-link  :to="{ name: 'QuestionPage', params: { id: data._id, title: data.title} }"><p class="title">{{ data.answer.length }}</p></router-link>
                                </div>
                                <div class="legend">
                                    <p>answers</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-10 main-question">
                            <div>
                                <div>
                                    <router-link  :to="{ name: 'QuestionPage', params: { id: data._id, title: data.title} }"><h5 class="title">{{ data.title }}</h5></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">

            </div>
        </div>
    </div>
</template>

<script>
import axios from '../database/server'
import router from '@/router'
export default {
    name: 'home',
    data() {
        return {
            listQuestions: []
        }
    },
    computed: {
        isLogin() {
            return this.$store.getters.isLogin
        }
    },
    created() {
        return this.loadQuestions()
    }, 
    methods: {
        loadQuestions() {
            axios
                .get(`/question/findall`)
                .then(({ data }) => {
                    console.log(data)
                    this.listQuestions = data
                })
                .catch(({ response }) => {
                    console.log(response)
                })
        },
        onClickAddNew() {
            if (localStorage.getItem('token') == null) {
                router.push('/login')
            } else {
                router.push('/addnewquestion')
            }
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.home {
    margin-top: 3%;
    margin-left: 5%;
    margin-right: 5%;
    min-height: 100vh;
}

.home-title {
    margin-bottom: 5%;
    display: flex;
}

.buton-askquestion {
    text-align: right;
}

.question-row {
    border-top: 1px solid #e4e6e8;
}

.main-question {
    margin-top: 5%;
}

.box-container {
    text-align: center;
    display: table;
    text-align: center;
}

.boxes p {
    text-align: center;
    padding: 4%;
}

.legend p {
    text-align: center;
    font-size: 12px
}

.main-question {
    width: 100%;
    /* margin-left: 2%; */
}

</style>

