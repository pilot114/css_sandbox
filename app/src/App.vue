<template>
    <div id="app">
        <div class="menu">
            example
        </div>
        <div class="content">
            <select v-model="color">
                <option value="red">red</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
            </select>

            <Editor
                    html="<b>test</b>"
                    css="b{color:#color#;}"
                    :params="{color:color}"
            ></Editor>
        </div>
    </div>
</template>

<script>
    import Editor from './components/Editor.vue'

    export default {
        name: 'app',
        data() {
            return {
                color: 'red'
            }
        },
        components: {
            Editor
        }
    }
</script>

<style>
    html,
    body {
        height: 100%;
        padding: 0;
        margin: 0;
    }
    #app {
        font-family: Helvetica, Arial, sans-serif;
        height: 100%;
    }
    .menu {
        box-sizing: border-box;
        padding: 20px;
        width: 25%;
        height: 100%;
        /* TODO replace to flex */
        float: left;
        background-color: #eb9e41;
    }
    .content {
        box-sizing: border-box;
        padding: 20px;
        width: 75%;
        height: 100%;
        float: right;

        overflow: auto;
    }
</style>
