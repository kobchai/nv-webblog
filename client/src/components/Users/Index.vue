<template>
    <div>
        <h1>Get All Users</h1>
        <!-- <div v-if="users.length">
            <h4>จำนวนผู้ใช้งาน: {{ users.length }}</h4>
            <div>id: {{ users[0].id }}</div>
            <div>ชื่อ - นามสกุล: {{ users[0].name }} - {{ users[0].lastname }}</div>
            <div>email: {{ users[0].email }}</div>
            <div>password: {{ users[0].password }}</div>
        </div> -->
        <h4>จำนวนผู้ใช้งาน: {{ users.length }}</h4>
        <div v-for="user in users" v-bind:key="user.id">
            <p>id: {{ user.id }}</p>
            <p>ชื่อ - นามสกุล: {{ user.name }} - {{ user.lastname }}</p>
            <p>email: {{ user.email }}</p>
            <p>password: {{ user.password }}</p>
            <p><button v-on:click="navigateTo('/user/'+user.id)">ดูข้อมูลผู้ใช้</button></p>
            <hr />
        </div>
    </div>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
    // created() {
    //     this.$http.get('http://localhost:8081/users')
    //         .then(function (response) {
    //             console.log(response)
    //         })
    // }
    // async created () {
    //     let results = (await UsersService.index()).data
    //     console.log(results)
    // }

    data () {
        return {
            users: []
        }
    },
    async created () {        
        try {
            this.users = (await UsersService.index()).data
        } catch (error) {
            console.log(error)
        }    

    },
    methods: {
        navigateTo (route) {
            this.$router.push(route)
        },
    }
}
</script>

<style scoped>
</style>