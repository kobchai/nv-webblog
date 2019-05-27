<template>
    <div>
        <h1>Get all comments</h1>
        <!-- <p><button v-on:click="logout">Logout</button></p> -->
        <h4>จำนวน comment {{ comments.length }}</h4>
        <p><button v-on:click="navigateTo('/blog/create')">สร้าง blog</button></p>
        <div v-for="comment in comments" v-bind:key="comment.id">
            <p>id: {{ comment.id }}</p>
            <p>blog id: {{ comment.blogId }}</p>
            <p>comment: {{ comment.comment }}</p>
            <p>
                <button v-on:click="navigateTo('/comment/'+comment.id)">ดู Comment</button>                
                <!-- <button v-on:click="navigateTo('/comment/edit/'+comment.id)">แก้ไข comment</button> -->
                <button v-on:click="deleteComment(comment)">ลบข้อมูล</button>
            </p>
            <hr>
        </div>
    </div>
</template>

<script>
import CommentsService from '@/services/CommentsService'

export default {
    data () {
        return {
            comments: []
        }
    },
    async created () {
        this.comments = (await CommentsService.index()).data
    },
    methods: {
        // logout () {
        //     this.$store.dispatch('setToken', null)
        //     this.$store.dispatch('setComments', null)
        //     this.$router.push({
        //         name: 'login'
        //     })
        // },
        navigateTo (route) {
            this.$router.push(route)
        },
        async deleteComment (comment) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await CommentsService.delete(comment)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData () {
            this.comment = (await CommentsService.index()).data
        }
    }
}
</script>

<style scoped>

</style>