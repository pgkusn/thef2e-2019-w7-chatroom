<template>
    <div class="room">
        <div class="top">
            <router-link :to="{name:'landing'}" replace class="back">
                <i class="material-icons">arrow_back</i>
            </router-link>
            <h1>CIAO</h1>
        </div>
        <div ref="content" class="content">
            <ul>
                <li v-for="(item,idx) in content" :key="idx" :class="{ myself: item.id === id }">
                    <span class="name">{{item.name}}</span>
                    <img v-if="item.imgSrc" :src="item.imgSrc" class="content-img" />
                    <span v-else-if="item.link" class="content-text">
                        <a :href="item.link" target="_blank">檔案下載</a>
                    </span>
                    <span v-else class="content-text">{{item.text}}</span>
                </li>
            </ul>
        </div>
        <form @submit.prevent="submitHandler('')">
            <input type="text" placeholder="Text Message" v-model="text" v-focus />
            <div class="formBtns">
                <input type="submit" value="Send" :disabled="!text" />
                <label for="file"><img src="@/assets/picture.svg" /></label>
                <label for="camera"><img src="@/assets/camera.svg" /></label>
                <label for="file"><img src="@/assets/attachment.svg" /></label>
                <input type="file" id="file" @change="changeHandler" />
                <input type="file" id="camera" accept="image/*" capture="camera" @change="changeHandler">
            </div>
        </form>
        <transition name="slide-fade">
            <div v-if="uploading" class="cover">
                <p>上傳中</p>
                <img src="loading.svg" class="loading" alt="">
            </div>
        </transition>
    </div>
</template>

<script>
const firebaseConfig = {
    apiKey: "AIzaSyCFQrK8G78IGKJ0cwHYez1P3WSOQyDNA3c",
    authDomain: "test-abea4.firebaseapp.com",
    databaseURL: "https://test-abea4.firebaseio.com",
    projectId: "test-abea4",
    storageBucket: "test-abea4.appspot.com",
    messagingSenderId: "942650617694",
    appId: "1:942650617694:web:6d938b4bdd578ac8"
};
let contentRef;
export default {
    data() {
        return {
            id: '',
            text: '',
            content: null,
            uploading: false,
        }
    },
    computed: {
        name() {
            return this.$store.state.name;
        }
    },
    updated() {
        // DOM更新後移至底部
        this.$nextTick().then(() => {
            this.$refs.content.scrollTo(0, this.$refs.content.firstElementChild.scrollHeight);
        });
    },
    methods: {
        submitHandler(fileUrl, isImg) {
            contentRef.push({
                id: this.id,
                name: this.name,
                text: this.text,
                imgSrc: isImg ? fileUrl : '',
                link: isImg ? '' : fileUrl,
                time: new Date().getTime(),
            });
            document.querySelector('#file').value = '';
            this.text = '';
            this.uploading = false;
        },
        getContent() {
            if (firebase.apps.length === 0) {
                firebase.initializeApp(firebaseConfig);
            }
            contentRef = firebase.database().ref('w7');
            contentRef.orderByChild('time').startAt(parseInt(this.id, 10)).on('value', snapshot => {
                this.content = snapshot.val();
            });
        },
        getId() {
            this.id = localStorage.getItem('chartId');
            if (!this.id) {
                this.id = new Date().getTime().toString();
                localStorage.setItem('chartId', this.id);
            }
        },
        changeHandler(e) {
            this.uploading = true;
            let file = e.target.files.item(0);
            var storage = firebase.storage();

            // 組合檔名＋副檔名
            let fileName = new Date().getTime();
            let ext = file.name.split('.')[file.name.split('.').length - 1];
            
            var storageRef = storage.ref('w7').child(`${fileName}.${ext}`);
            storageRef.put(file).then(snapshot => {
                let fileUrl = `https://firebasestorage.googleapis.com/v0/b/test-abea4.appspot.com/o/w7%2F${fileName}.${ext}?alt=media&token=79cc4e34-de8d-4caf-8aa1-5fc544b9b9d4`;
                if (file.type.split('/')[0] === 'image') {
                    // preload image
                    let img = new Image();
                    img.onload = () => this.submitHandler(fileUrl, true);
                    img.src = fileUrl;
                }
                else {
                    this.submitHandler(fileUrl);
                }
            });
        },
    },
    created() {
        this.getId();
        this.getContent();
    },
}
</script>

<style lang="scss" scoped>
.room {
    height: 100%;
}
.top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 48px;
    border-bottom: 1px solid #efefef;
    background-color: rgb(249, 249, 249);
    color: #2aa1b7;
}
.back {
    position: absolute;
    top: 50%;
    left: 1em;
    color: #2aa1b7;
    transform: translateY(-50%);
    &::before {
        position: absolute;
        top: -10px;
        right: -10px;
        bottom: -10px;
        left: -10px;
        content: '';
    }
}
h1 {
    text-align: center;
    font-size: 18px;
    line-height: 48px;
}
.content {
    overflow: auto;
    padding: 1em;
    height: 100%;
    &-text {
        margin: 0 .5em;
        padding: .5em 1em;
        border-radius: 6px;
        background-color: #efefef;
        color: #464646;
        font-size: 14px;
    }
    &-img {
        margin: 0 .5em;
        width: 100px;
    }
}
li {
    display: flex;
    align-items: center;
    &.myself {
        justify-content: flex-end;
    }
    & + li {
        margin-top: 1em;
    }
}
form {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    border-top: 1px solid #efefef;
    background-color: #fff;
    align-items: center;
    img {
        width: 20px;
        height: 20px;
    }
}
input:focus {
    outline: none;
}
[type='text'] {
    padding: 0 13px;
    width: 100%;
    border: none;
    font-size: 16px;
    flex-grow: 1;
}
[type='submit'] {
    padding: 0;
    border: none;
    background-color: transparent;
    appearance: none;
}
[type='file'] {
    display: none;
}
.formBtns {
    display: flex;
    width: 150px;
    height: 40px;
    background-color: #efefef;
    justify-content: space-evenly;
    align-items: center;
    flex-shrink: 0;
}
.cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: rgba(#000, .5);
    color: #fff;
    font-size: 20px;
    justify-content: center;
    align-items: center;
}
.loading {
    margin-top: .5em;
    width: 50px;
}

</style>