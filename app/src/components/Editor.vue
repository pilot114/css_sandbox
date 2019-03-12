<template>
    <div>
        <h3>{{ name }}</h3>

        <Settings
                :params=params
                @changeParam="onChangeParam()"
        ></Settings>

        <div class="flex-container">
            <div class="flex-item">
                <h4>HTML</h4>
                <textarea v-model="editedHtml" rows=10></textarea>
            </div>
            <div class="flex-item">
                <h4>CSS</h4>
                <textarea v-model="editedCss" rows=10></textarea>
            </div>
        </div>

        <div class="preview">
            <h4>Result (shadow root)</h4>
            <div v-preview="getPreview()" class="previewContent"></div>
        </div>
    </div>
</template>

<script>
    import Settings from './Settings.vue'

    export default {
        name: 'Editor',
        data() {
            return {
                editedHtml: null,
                editedCss: null,
                preview: null,
            }
        },
        components: {
            Settings
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
            name: String,
            html: String,
            css: String,
            params: Array
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
            onChangeParam(param) {
                console.log(param);
            },
            updateEdited() {
                let preparedCss = this.css;
                for(let item in this.params) {
                    preparedCss = preparedCss.split(`|${this.params[item].name}|`).join(this.params[item].value);
                }

                preparedCss = preparedCss.split(`{`).join(' {\n');
                preparedCss = preparedCss.split(`}`).join('}\n');
                preparedCss = preparedCss.split(`;`).join(';\n');
                preparedCss = preparedCss.split(`:`).join(': ');

                let preparedHtml = this.html.split(`>`).join('>\n');
                preparedHtml = preparedHtml.split(`<`).join('\n<').trim('\n');

                this.editedHtml = preparedHtml;
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
        box-sizing: border-box;
        width:100%;
        padding: 10px;
    }

    .flex-container {
        display: flex;
        flex-direction: row;
    }

    .flex-item{
        flex: 50;
    }

    .preview{
        width: 100%;
    }
    .previewContent {
        height: 400px;
        border: 1px solid;
    }
</style>
