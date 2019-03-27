<template>
    <div class="main-table">
        <div>
            <h3>View All Questions</h3>
        </div>
        <table class="table listTable">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Answer</th>
                <th scope="col">Vote</th>
                <th scope="col">Best Answer</th>
                <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in dataQuestion" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td><router-link  :to="{ name: 'QuestionPage', params: { id: data._id, title: data.title} }"><p class="title">{{ data.title }}</p></router-link></td>
                    <td>{{ data.answer.length }}</td>
                    <td>{{ data.vote.length }}</td>
                    <td v-if="data.bestAnswer.length == 0">On Progress</td>
                    <td v-else>Answered</td>
                    <td><router-link :to="{ name: 'UpdatePage', params: { id: data._id } }"><a>Update</a></router-link> | <a href="#" @click.prevent="onClickDelete(data._id)">Delete</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from '../database/server'
import router from '@/router'
export default {
    name: 'QuestionListPage',
    data() {
        return {
            dataQuestion: []
        }
    },
    created() {
        return this.getAllData()
    },
    methods: {
        getAllData() {
            axios
                .get(`/question/user`)

                .then(({ data }) => {
                    this.dataQuestion = data
                })

                .catch(({ response }) => {
                    console.log(response)
                })
        },
        onClickUpdate(id, title) {
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
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.main-table {
    margin-top: 3%;
    margin-left: 5%;
    margin-right: 5%;
    height: 100vh;
}

h3 {
    text-align: center;
}

.listTable {
    margin-top: 3%;
}
</style>
