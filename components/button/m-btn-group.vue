<template>
    <div
        class="m-btn-group"
        :class="[className, selected ? 'bgRed' : 'bgBlue']"
        @click="btnClicked"
    >
        <!--<i class="material-icons">e dit</i>-->
        <div>
            <span>{{ item.categoryName }}{{ selected }}</span>
        </div>

        <h1 class="m-btn-group__closeBtn" @click="btnDelete">Х</h1>
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
        selectedItem: {
            type: Object,
            default: () => {
                return {}
            },
        },
        item: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {}
    },
    computed: {
        className() {
            return {
                disabled: this.disabled,
                error: this.error,
            }
        },
        selected() {
            // console.log(this.item.categoryName, this.selectedItem.categoryName)
            return this.item === this.selectedItem
        },
    },
    methods: {
        btnDelete() {
            if (!this.disabled) {
                this.$emit('btnDelete')
            }
        },
        btnClicked() {
            if (!this.disabled) {
                this.$emit('btnClick')
            }
        },
    },
}
</script>

<style scoped></style>
