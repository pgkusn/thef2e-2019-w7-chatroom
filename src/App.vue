<template>
    <div class="app">
        <router-view />
    </div>
</template>

<style lang="scss">
@import '@/assets/reset.scss';

// transition
.slide-fade-enter-active {
    transition: all .3s ease;
}
.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1, .5, .8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    opacity: 0;
}

html,
body,
.app {
    height: 100%;
}
.app {
    overflow: hidden;
    padding-top: 48px;
    padding-bottom: 40px;
}

</style>
