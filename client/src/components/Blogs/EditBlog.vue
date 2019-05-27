<template>
    <div>
        <h1>Edit Blog</h1>
        <form v-on:submit.prevent = "editBlog">
            <p>title: <input type="text" v-model="blog.title"></p>
            <p>content: <input type="text" v-model="blog.content"></p>
            <p>category: <input type="text" v-model="blog.category"></p>
            <p>status: <input type="text" v-model="blog.status"></p>
            <p>
                <button type="submit">update blog</button>
                <button v-on:click="navigateTo('/blogs')">กลับ</button>
            </p>
        </form>
        <hr>
        <div>
            <p>title: {{ blog.title }}</p>
            <p>content: {{ blog.content }}</p>
            <p>category: {{ blog.category }}</p>
            <p>status: {{ blog.status }}</p>
        </div>
    </div>
</template>

<script>
import BlogsService from '@/services/BlogsService'

export default {
    data () {
        return {
            blog: {
                title: '',
                thumbnail: 'null',
                pictures: 'null',
                content: '',
                category: '',
                status: 'saved'
            }
        }
    },
    async created () {
        try {
            let blogId = this.$route.params.blogId
            this.blog = (await BlogsService.show(blogId)).data
        } catch (error) {
            console.log (error)
        }        
    },
    methods: {
        async editBlog () {
            try {
                await BlogsService.put(this.blog)
                this.$router.push({
                    name: 'blogs'
                })
            } catch (err) {
                console.log(err)
            }
        },
        async created () {
            try {
                let blogId = this.$route.params.blogId
                this.blog = (await BlogsService.show(blogId)).data
            } catch (error) {
                console.log(error)
            }
        },
        navigateTo (route) {
            this.$router.push(route)
        }
    }
}
</script>

<style scoped>

</style>