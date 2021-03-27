<template>
    <div class="m-select">
        <p class="title" @click="selectVisible = !selectVisible">
            {{ selectTitle }}
        </p>
        <div v-if="selectVisible" class="m-select-options">
            <p
                v-for="item in options"
                :key="item.id"
                @click="itemSelected(item)"
            >
                {{ item.title }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MSelect',
    props: {
        selectTitle: {
            type: String,
            default: 'str',
        },
        options: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            selectVisible: false,
        }
    },
    methods: {
        itemSelected(item) {
            this.$emit('select', item)
            this.selectVisible = false
        },
    },
}
</script>

<style scoped>
.m-select {
    position: relative;
    width: 200px;
    cursor: pointer;
    background: white;
}
.m-select p {
    margin: 0;
    padding: 6px;
}
.title {
    border: solid 1px green;
}
.m-select-options {
    border: solid 1px green;
    position: absolute;
    top: 36px;
    right: 0;
    width: 100%;
    background: white;
    z-index: 99;
}
.m-select-options p:hover {
    background: #909ea3;
}
</style>
