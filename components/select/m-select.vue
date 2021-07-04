<template>
    <div class="m-select">
        <p class="title" @click="selectVisible = !selectVisible">
            {{ title }}
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
        options: {
            type: Array,
            default() {
                return []
            },
        },
        title: {
            type: String,
            default: 'Выбор',
        },
    },
    data() {
        return {
            selectVisible: false,
            selectTitle: 'Выбор товара',
        }
    },
    methods: {
        itemSelected(item) {
            this.$emit('select', item)
            this.selectTitle = item.title
            this.selectVisible = false
        },
    },
}
</script>
