<template>
    <div>
        <h1>Get all blogs</h1>
        <!-- <p><button v-on:click="logout">Logout</button></p> -->
        <p><button v-on:click="navigateTo('/blog/create')">สร้าง blog</button></p>
        <h4>จำนวน blog {{ blogs.length }}</h4>
        <div v-if="blogs.length === 0" class="empty-blog">
            *** ไม่มีข้อมูล ***
        </div>        
        <div v-for="blog in blogs" v-bind:key="blog.id">
            <p>id: {{ blog.id }}</p>
            <p>title: {{ blog.title }}</p>
            <p>content: {{ blog.content }}</p>
            <p>category: {{ blog.category }}</p>
            <p>status: {{ blog.status }}</p>
            <p>
                <button v-on:click="navigateTo('/blog/'+blog.id)">ดู Blog</button>                
                <button v-on:click="navigateTo('/blog/edit/'+blog.id)">แก้ไข Blog</button>
                <button v-on:click="deleteBlog(blog)">ลบข้อมูล</button>
            </p>
            <hr>
        </div>
    </div>
</template>

<script>
import BlogsService from '@/services/BlogsService'

export default {
    data () {
        return {
            blogs: []
        }
    },
    async created () {
        this.blogs = (await BlogsService.index()).data
    },
    methods: {
        // logout () {
        //     this.$store.dispatch('setToken', null)
        //     this.$store.dispatch('setBlog', null)
        //     this.$router.push({
        //         name: 'login'
        //     })
        // },
        navigateTo (route) {
            this.$router.push(route)
        },
        async deleteBlog (blog) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await BlogsService.delete(blog)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData () {
            this.blogs = (await BlogsService.index()).data
        }
    }
}
</script>

<style scoped>
    .empty-blog {
        width: 100%;
        text-align: center;
        padding: 10px;
        background: darksalmon;
        color: white;
    }
</style>