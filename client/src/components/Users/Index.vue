<template>
    <div>        
        <h1>Get All Users</h1>
        <!-- <p><button v-on:click="logout">Logout</button></p> -->
        <!-- <div v-if="users.length">
            <h4>จำนวนผู้ใช้งาน: {{ users.length }}</h4>
            <div>id: {{ users[0].id }}</div>
            <div>ชื่อ - นามสกุล: {{ users[0].name }} - {{ users[0].lastname }}</div>
            <div>email: {{ users[0].email }}</div>
            <div>password: {{ users[0].password }}</div>
        </div> -->
        <h4>จำนวนผู้ใช้งาน: {{ users.length }}</h4>
        <p><button v-on:click="navigateTo('/user/create')">สร้างผู้ใช้งาน</button></p>
        <div v-for="user in users" v-bind:key="user.id">
            <p>id: {{ user.id }}</p>
            <p>ชื่อ - นามสกุล: {{ user.name }} - {{ user.lastname }}</p>
            <p>email: {{ user.email }}</p>
            <p>password: {{ user.password }}</p>
            <p>
                <button v-on:click="navigateTo('/user/' + user.id)">ดูข้อมูลผู้ใช้งาน</button>                
                <button v-on:click="navigateTo('/user/edit/' + user.id)">แก้ไขมูลผู้ใช้งาน</button>
                <button v-on:click="deleteUser(user)">ลบข้อมูล</button>
            </p>
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
        async deleteUser (user) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await UsersService.delete(user)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.users = (await UsersService.index()).data
        },
        // logout () {
        //     this.$store.dispatch('setToken', null)
        //     this.$store.dispatch('setUser', null)
        //     this.$router.push({
        //         name: 'login'
        //     })
        // },
    }
}
</script>

<style scoped>
</style>