<template>
    <div class="landing">
        <form @submit.prevent="submitHandler">
            <h1><img src="logo.png" alt="CIAO"></h1>
            <p>我是</p>
            <input type="text" v-model="name" :disabled="anonymous" v-focus />
            <label>
                <input type="checkbox" v-model="anonymous" />我要匿名
            </label>
            <input type="submit" value="開始聊天" :disabled="!this.name && !this.anonymous" />
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            anonymous: false,
        }
    },
    watch: {
        anonymous(val) {
            if (val) this.name = '';
        }
    },
    methods: {
        submitHandler() {
            if (this.name) localStorage.setItem('chartName', this.name);
            this.$store.commit('updateName', this.name || '匿名');
            this.$router.replace({ name: 'room' });
        }
    },
}
</script>

<style lang="scss" scoped>
.landing {
    margin: 0 auto;
    width: 220px;
    height: 100%;
    line-height: 2;
}
form {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #2aa1b7;
    justify-content: center;
    align-items: center;
}
h1 {
    margin-bottom: 1em;
}
input {
    margin: 0;
    padding: 0;
    font-size: 16px;
    &[type=text] {
        margin: .5em 0;
        padding: 0 1em;
        width: 100%;
        height: 34px;
        border: 1.5px solid #2aa1b7;
        border-radius: 5px;
        color: #88bece;
        &:focus {
            outline: none;
        }
    }
    &[type=submit] {
        width: 100%;
        height: 40px;
        border: 0;
        border-radius: 5px;
        background-color: #2aa1b7;
        color: #fff;
        font-size: 18px;
        appearance: none;
        &:disabled {
            opacity: .5;
        }
    }
    &[type=checkbox] {
        margin-right: 5px;
        vertical-align: middle;
    }
}
label {
    margin-bottom: 1.5em;
    font-size: 14px;
}
p {
    font-size: 18px;
}

</style>

