<template>
    <div>
        <h3>{{ name }}</h3>

        <Settings
                :params=parsedParams
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
                prepareParams: null,
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
            parsedParams() {
                return this.prepareParams || this.params;
            },
        },
        methods: {
            onChangeParam(param) {
                console.log(param);
            },
            updateEdited() {
                let preparedCss = this.css;

                /*
                for(let item in this.params) {
                    preparedCss = preparedCss.split(`|${this.params[item].name}|`).join(this.params[item].value);
                }
                */

                // форматирование
                preparedCss = preparedCss.split(`{`).join(' {\n');
                preparedCss = preparedCss.split(`}`).join('}\n');
                preparedCss = preparedCss.split(`;`).join(';\n');
                preparedCss = preparedCss.split(`:`).join(': ');

                let preparedHtml = this.html.split(`>`).join('>\n');
                preparedHtml = preparedHtml.split(`<`).join('\n<').trim('\n');

                this.editedHtml = preparedHtml;
                this.editedCss = preparedCss;

                // конверируем css в объект
                let cssRules = this.css.split('}').filter(x => !!x).map(x => x + '}');
                let cssRulesPrepared = {};
                for (let i in cssRules) {
                    // dry =(
                    let tmp = cssRules[i].split('{');
                    let value = '{' + tmp[1];
                    value = value
                        .replace(/([a-zA-Z0-9-]+):([a-zA-Z0-9-]+)/g, "\"$1\":\"$2\"")
                        .replace(/;/g, ',')
                        .replace(',}', '}');
                    cssRulesPrepared[tmp[0].trim()] = JSON.parse(value);
                }
                this.prepareParams = cssRulesPrepared;
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
        overflow: auto;
        height: 400px;
        border: 1px solid;
    }
</style>
