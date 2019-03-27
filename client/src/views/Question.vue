<template>
    <div class="questionPage">
        <div class="question-container">
            <div class="row">
                <div class="col-2">
                    
                </div>
                <div class="col-7">
                    <div class="row">
                        <div class="question-title">
                            <h1>{{ title }}</h1>
                        </div>
                        <div class="row question-card">
                            <div class="col-2" align="center">
                                <div class="row">
                                    <div class="vote-box up-arrow">
                                        <a href="#" @click.prevent="updateUpVoteQuestion"><img src="../assets/icon/up.png" alt="up"></a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="vote-box">
                                        <p>{{ questionVote }}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="vote-box down-arrow">
                                        <a href="#" @click.prevent="updateDownVoteQuestion"><img src="../assets/icon/down.png" alt="down"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-10">
                                <div class="row">
                                    <p v-html="question">{{ question }}</p>
                                </div>
                                <div class="row editable">
                                    <div class="col-6">
                                        <div class="row" v-if="isLogin">
                                            <div class="col-4">
                                                <a href="#" @click.prevent="updateQuestion(questionId)">Edit</a>
                                            </div>
                                            <div class="col-4 set-col">
                                                <a href="#" @click.prevent="onClickDelete(questionId)">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6 ownership">
                                       <p><em>by: {{ questionOwner }}</em></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <h5>Answers {{ answers.length }}</h5>
                        <div class="row answer-card" v-for="(answer, index) in answers" :key="index">
                            <div class="col-2" align="center">
                                <div class="row">
                                    <div class="vote-box up-arrow">
                                        <a href="#" @click.prevent="updateUpVoteAnswer(answer._id)"><img src="../assets/icon/up.png" alt="up"></a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="vote-box">
                                        <p>{{ answer.vote.length }}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="vote-box down-arrow">
                                        <a href="#" @click.prevent="updateDownVoteAnswer(answer._id)"><img src="../assets/icon/down.png" alt="down"></a>
                                    </div>
                                </div>
                                <div class="row mt-3 ok-answer" v-if="isAnswered">
                                    <img src="../assets/icon/true.png" alt="okanswer">
                                </div>
                            </div>
                            <div class="col-10">
                                <div class="row main-question">
                                    <p v-html="answer.answer">{{ answer.answer }}</p>
                                </div>
                                <div class="row editable">
                                    <div class="col-6">
                                        <div class="row" v-if="isLogin">
                                            <div class="col-4">
                                                <a href="#" @click.prevent="updateAnswer(answer._id)">Edit</a>
                                            </div>
                                            <div class="col-4 set-col">
                                                <a href="#" @click.prevent="deleteAnswer(answer._id)">Delete</a>
                                            </div>
                                            <div class="col-4 set-col" v-if="!isAnswered" @click.prevent="updateBestAnswer(answer._id)">
                                                <a href="#" v-if="getUserId">Set Answer</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6 ownership">
                                       <!-- <p><em>by: {{ questionOwner }}</em></p> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row answer-form">
                        <form @submit.prevent="addNewAnswer">
                            <div>
                                <h3>Please Submit Your Answer</h3>
                            </div>
                            <div class="mt-3">
                                <ckeditor class="editor" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                            </div>
                            <div class="mt-3 add-answer">
                                <button class="btn btn-primary" type="submit">Submit Answer</button>
                            </div>
                        </form>
                    </div>

                </div>
                <div class="col-3">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from '../database/server'
import router from '@/router'
import axi from '../database/server';
export default {
    name: 'QuestionPage',
    data() {
        return {
            isAnswered: false,
            getUserId: '',
            questionId: '',
            title: '',
            question: '',
            answers: [],
            questionOwner: '',
            username: this.$store.state.username,
            activeId: this.$store.state.id,
            questionVote: 0,
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                // The configuration of the rich-text editor.
            },
        }
    },
    computed: {
      isLogin() {
        return this.$store.getters.isLogin
      }
    },
    created() {
        return this.getQuestion(this.$route.params.id)
    },
    methods: {
        getQuestion(id) {
            axios
                .get(`/question/${id}`)
                .then(({ data }) => {
                    this.questionId = data._id
                    this.title = data.title
                    this.question = data.question
                    this.answers = data.answer
                    this.questionOwner = data.UserId.username
                    this.questionVote = data.vote.length
                    this.UserId = data.UserId
                    this.sort()
                })
                .catch(({ response }) => {
                    console.log(response)
                })
        },
        addNewAnswer() {
            if (localStorage.getItem('token') == null) {
                router.push('/login')
            }

            axios
                .post(`/answer/${this.questionId}`, {
                    answer: this.editorData
                })
                .then(({ data }) => {
                    this.answers.push(data)
                    this.editorData = ''
                })
                .catch(({ response }) => {
                    console.log(response)
                })
        },
        updateUpVoteQuestion() {
            if (localStorage.getItem('token') == null) {
                router.push('/login')
            }
            axios
                .post(`/question/addvote/${this.$route.params.id}`)
                .then(({ data }) => {
                    this.questionVote = data.vote.length
                })
                .catch(({ response }) => {
                    console.log(response)
                })
        },
        updateDownVoteQuestion() {
            if (localStorage.getItem('token') == null) {
                router.push('/login')
            }
            axios
                .post(`/question/downvote/${this.$route.params.id}`)
                .then(({ data }) => {
                    this.questionVote = data.vote.length
                })
                .catch(({ response }) => {
                    console.log(response)
                })
        },
        updateUpVoteAnswer(id) {
            if (localStorage.getItem('token') == null) {
                router.push('/login')
            }
            axios
                .post(`/answer/voteup/${id}`)
                .then(({ data }) => {
                    for (let i = 0; i < this.answers.length; i++) {
                        if (this.answers[i]._id == data._id) {
                            this.answers[i].vote = data.vote
                        }
                    }
                    this.sort()
                })
                .catch(({ response }) => {
                    console.log(response)
                })
        },
        updateDownVoteAnswer(id) {
            if (localStorage.getItem('token') == null) {
                router.push('/login')
            }
            axios
                .post(`/answer/votedown/${id}`)
                .then(({ data }) => {
                    for (let i = 0; i < this.answers.length; i++) {
                        if (this.answers[i]._id == data._id) {
                            this.answers[i].vote = data.vote
                        }
                    }
                    this.sort()
                })
                .catch(({ response }) => {
                    console.log(response)
                })
        },
        sort() {
            this.answers.sort(function (a, b) {
                return b.vote.length - a.vote.length;
            })
        },
        updateQuestion(id) {
            router.push(`/question/${id}/update`)
        },
        onClickDelete(id) {
            swal("Are you sure you want to do this?", {
                buttons: ["Oh no!", true],
            })
            
                .then((data) => {
                    if (data == true) {
                        return axios
                            .delete(`/question/${id}`)
                    }
                })

                .then(({ data }) => {
                    for (let i = 0; i < this.dataQuestion.length; i++) {
                        if (this.dataQuestion[i]._id == data._id) {
                            this.dataQuestion.splice(i, 1)
                        }
                    }
                })

                .catch(({ response }) => {
                    console.log(response)
                })
        },
        updateAnswer(id) {
            router.push(`/answer/${id}/update`)
        },
        deleteAnswer(id) {
            swal("Are you sure you want to do this?", {
                buttons: ["Oh no!", true],
            })
            
                .then((data) => {
                    if (data == true) {
                        return axios
                            .delete(`/answer/${id}`)
                    }
                })

                .then(({ data }) => {
                    router.push('/dashboard')
                })

                .then(({ response }) => {
                    console.log(response)
                })
        },
        updateBestAnswer(id) {
            axios
                .put(`/question/best/${this.$route.params.id}`, {
                    answerId: id
                })
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.questionPage {
    margin-top: 3%;
    margin-left: 5%;
    margin-right: 5%;
    min-height: 100vh;
}

.question-card {
    border-top: 1px solid #e4e6e8;
    padding-top: 5%;
    margin-top: 3%;
    margin-bottom: 20%;
    width: 100%;
}

.answer-card {
    border-top: 1px solid #e4e6e8;
    padding-top: 5%;
    margin-bottom: 10%;
    margin-top: 3%;
    width: 100%;
}

.answer-form {
    border-top: 1px solid #e4e6e8;
    margin-top: 20%;
    padding-top: 5%;
}

.answer-form form {
    display: inline-block;
    width: 100%;
}

.question-title h1 {
    font-size: 2.07692308rem;
}

.up-arrow {
    margin-bottom: 10%;
}

.down-arrow {
    margin-top: 10%;
}

.vote-box {
    width: 40px;
}

.vote-box p {
    border: solid 1px black;
}

.vote-box p {
    display: flex;
    align-items: center;
    justify-content: center;
}

.votes {
    align-items: center
}

.add-answer {
    text-align: right;
}

.requested-by {
    padding-top: 4%;
}

.editable a {
    font-size: 13px;
    margin-left: -10px;
}

.editable p {
    font-size: 13px;
}

.set-col {
    margin-left: -30px;
}

.ownership {
    text-align: right;
}
</style>
