<template>
    <div id="app">
        <div class="menu">
            example
        </div>
        <div class="content">
            <Editor
                    name="Example"
                    html="<div>content</div>"
                    css="div{color:|color|;padding:|padding|;}"
                    :params="[{name:'color', value:'red', type:'color'}, {name:'padding', value:'5px', type:'number'}]"
            ></Editor>
        </div>
    </div>
</template>

<script>
    import Editor from './components/Editor.vue'

    export default {
        name: 'app',
        components: {
            Editor
        },
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

        display: flex;
        flex-direction: row;
    }
    .menu {
        box-sizing: border-box;
        padding: 20px;

        flex: 20;

        height: 100%;
        background-color: #eb9e41;
    }
    .content {
        flex: 80;

        box-sizing: border-box;
        padding: 20px;
        height: 100%;

        overflow: auto;
    }
</style>
