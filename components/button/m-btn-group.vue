<template>
    <div
        class="m-btn-group"
        :class="[className, selected ? 'bgRed' : 'bgBlue']"
        @click="btnClicked"
    >
        <!--<i class="material-icons">e dit</i>-->
        <div>
            <span class="m12"
                >{{ item.title
                }}<span v-if="item.description" class="fz12">
                    ({{ item.description }})</span
                ></span
            >
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
            if (this.selectedItem) {
                return this.item.id === this.selectedItem.id
            } else return false
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
