<template>
    <div class="addNewQuestions">
        <div class="form-addProduct">
            <form @submit.prevent="submitUpdate">
                <div>
                    <h1>Please Update Your Answer</h1>
                </div>
                <div class="mt-5">
                    <div class="mt-3">Update Answer</div>
                    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                </div>
                <div class="mt-3 add-product">
                    <button class="btn btn-primary" type="submit">Save Update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from '../database/server'
import router from '@/router'
export default {
    name: 'AnswerPage',
    data() {
        return {
            name: 'AnswerPage',
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                // The configuration of the rich-text editor.
            }
        }
    },
    created() {
        return this.getAnswer(this.$route.params.id)
    },
    methods: {
        getAnswer(id) {
            axios
                .get(`/answer/${id}`)
                .then(({ data }) => {
                    this.editorData = data.answer
                })
                .catch(({ response }) => {
                    console.log(response)
                })
        },
        submitUpdate() {
            axios
                .put(`answer/${this.$route.params.id}`, {
                    answer: this.editorData
                })

                .then(({ data }) => {
                    this.editorData = ''
                    router.push('/dashboard')
                })

                .catch(({ response }) => {
                    console.log(response)
                })
        }
    }
}
</script>

<style scoped>
.addNewQuestions {
    min-height: 100vh;
}

.form-addProduct {
    margin-top: 5%;     
    margin-left: 25%;   
    margin-right: 25%;
}

h1 {
    text-align: center;
}

.add-product {
    text-align: right;
}
</style>

