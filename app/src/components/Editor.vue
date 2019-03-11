<template>
    <div>
        <h3>Example</h3>
        <div class="html">
            <h4>HTML</h4>
            <textarea v-model="editedHtml" rows=10></textarea>
        </div>
        <div class="css">
            <h4>CSS</h4>
            <textarea v-model="editedCss" rows=10></textarea>
        </div>
        <div class="preview">
            <h4>Result (shadow root)</h4>
            <div v-preview="getPreview()" class="previewContent"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Editor',
        data() {
            return {
                editedHtml: null,
                editedCss: null,
                preview: null,
            }
        },
        created(){
            this.updateEdited();
        },
        watch: {
            params(val) {
                this.updateEdited();
            }
        },
        props: {
            html: String,
            css: String,
            params: Object
        },
        computed: {
            parsedHtml() {
                return this.editedHtml || this.html;
            },
            parsedCss() {
                return this.editedCss || this.css;
            },
        },
        methods: {
            updateEdited() {
                let preparedCss = this.css;
                for(let key in this.params) {
                    preparedCss = preparedCss.replace(`#${key}#`, this.params[key]);
                }

                this.editedHtml = this.html;
                this.editedCss = preparedCss;
            },
            getPreview() {
                return `<style>${this.parsedCss}</style><body>${this.parsedHtml}</body>`;
            },
        }
    }
</script>

<style scoped>
    textarea {
        float:left;
        width:100%;
        padding: 0;
    }

    .html{
        float: left;
        width: 50%;
    }
    .css{
        float: left;
        width: 50%;
    }
    .preview{
        float: left;
        width: 100%;
    }
    .previewContent {
        height: 500px;
        border: 1px solid;
    }
</style>
