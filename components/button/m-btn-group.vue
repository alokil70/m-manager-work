<template>
    <div class="m-btn-group" :class="className" @click="$emit('btnClick')">
        <!--<i class="material-icons">e dit</i>-->
        <div>
            <span>{{ title }}</span>
        </div>

        <h1 class="m-btn-group__closeBtn" @click="$emit('delBtn')">Х</h1>
    </div>
</template>

<script>
export default {
    name: 'MBtnGroup',
    props: {
        title: {
            type: String,
            default: 'button',
        },
        disabled: Boolean,
        error: Boolean,
    },
    computed: {
        className() {
            return {
                disabled: this.disabled,
                error: this.error,
            }
        },
    },
    methods: {},
}
</script>

<style scoped></style>
