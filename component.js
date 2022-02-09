const app = Vue.createApp({
    data() {//靜態資料
        return {
            currentForm: 'personal-form',
            form: {}//06.但是現在form是空值，所以想要透過watch來判斷使用者輸入資料，並把值放進來
        }
    },
    methods: {
        updateForm(value) {
            this.currentForm = value
        },
        updateData(data) {
            this.form[data.key] = data.value
        }//11.帶入剛才從 $emit 收到的 {'key':'name','value':value}
    },
    computed: {//會需要運算的資料
        computedForm: function () {//04.想要判定在final-form介面再執行
            console.log(this.currentForm)
            if (this.currentForm == 'final-form') {
                return this.form//05.回傳form的資料
            }
        }
    }
})

app.component('personal-form', {
    template: '#form1',
    data() {
        return {
            name: '',
            phone: ''
        }
    },
    methods: {
        nextSteps() {
            this.$emit('set-form', 'address-form')
        }
    },
    watch: {//07.watch無時無刻一直在監聽以下東西
        name: {
            handler(value) {//08.一旦user打任何數值便進行反應，並將鍵入的數值帶進來
                this.$emit('update', { 'key': 'name', 'value': value })
                //09.跳脫到外層，呼叫update事件，並一併攜帶數值出去
            }
        },
        phone: {
            handler(value) {
                this.$emit('update', { 'key': 'phone', 'value': value })
            }
        }
    }
})

app.component('address-form', {
    template: '#form2',
    data() {
        return {
            address: ''
        }
    },
    methods: {
        nextSteps() {
            this.$emit('set-form', 'final-form')
        },
        preSteps() {
            this.$emit('set-form', 'personal-form')
        },
    },
    watch: {
        address: {
            handler(value) {
                this.$emit('update', { 'key': 'address', 'value': value })
            }
        }
    }
})

app.component('final-form', {
    template: '#form3',
    props: ['formData'],//02.從外層去拿fromData資料
    methods: {
        preSteps() {
            this.$emit('set-form', 'address-form')
        },
    }
})
app.mount('#app')