<template>
    <div class="dashboard-container">
        <div>
            <h1>Dashboard Area</h1>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        Questions
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Get all Questions</h5>
                        <p class="card-text">adipiscing tristique risus nec feugiat in fermentum posuere urna nec.</p>
                        <a href="#" @click.prevent="onClickGoToViewAllQuestions"  class="btn btn-primary">View All</a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        Add New Question
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Add New Question</h5>
                        <p class="card-text">adipiscing tristique risus nec feugiat in fermentum posuere urna nec.</p>
                        <a href="#" @click.prevent="onClickGoToAddNew" class="btn btn-primary">Add New</a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        Featured
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">adipiscing tristique risus nec feugiat in fermentum posuere urna nec.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        Featured
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">adipiscing tristique risus nec feugiat in fermentum posuere urna nec.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        Featured
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">adipiscing tristique risus nec feugiat in fermentum posuere urna nec.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        Featured
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">adipiscing tristique risus nec feugiat in fermentum posuere urna nec.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardPage',
    computed: {
      isLogin() {
        return this.$store.getters.isLogin
      }
    },
    data() {
        return {

        }
    },
    methods: {
        onClickGoToViewAllQuestions() {
            this.$router.push('/dashboard/viewquestions')
        },
        onClickGoToAddNew() {
            this.$router.push('/addnewquestion')
        }
    }
}
</script>

<style scoped>
.dashboard-container{
    margin-top: 3%;
    margin-left: 5%;
    margin-right: 5%;
    height: 100vh;
}

h1 {
    text-align: center;
}

.row {
    margin-top: 5%;
}

card-body a {
    color: white;
}
</style>
