<template>
    <div class="addNewQuestions">
        <div class="form-addProduct">
            <form @submit.prevent="addQuestion">
                <div>
                    <h1>Please Submit Your Question</h1>
                </div>
                <div class="mt-3">
                    <div class="mt-3">Question Title</div>
                    <input class="form-control" v-model="title" type="text" placeholder="Enter Title">
                </div>
                <div class="mt-3">
                    <div class="mt-3">Question Description</div>
                    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                </div>
                <div class="mt-3 add-product">
                    <button class="btn btn-primary" type="submit">Submit Question</button>
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
    name: 'AddNewQuestions',
    data() {
        return {
            title: '',
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                // The configuration of the rich-text editor.
            },
        }
    },
    methods: {
        addQuestion() {
            let data = {
                title: this.title,
                question: this.editorData,
            }
            axios
                .post('/question', {   
                    title: this.title,
                    question: this.editorData,
                })
                .then(({ data }) => {
                    router.push('/dashboard')
                    swal("Pertanyaan berhasil ditambah!!", "Silahkan di cek di list pertanyaan.", "success")
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
