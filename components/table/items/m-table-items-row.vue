<template>
    <div>
        <div class="flex-between content-table">
            <nuxt-link
                :to="{ name: routerIdData, params: { id: rowData.id } }"
                class="row"
            >
                <div>
                    <div class="fz12 w200">{{ rowData.productName }}</div>
                </div>
                <div>
                    <div class="fz12 w100">{{ rowData.price }}р</div>
                </div>
                <!--<div class="row-left">
                    <div class="fz12">{{ rowData.company }}</div>
                    <div class="fz12">
                        Создана {{ dateFilter(rowData.createdAt) }}
                    </div>
                </div>
                <div class="row-left fz12">
                    Действительна до {{ dateFilter(rowData.expire) }}
                </div>-->
                <div class="fz12 w100">{{ rowData.description }}</div>
                <div class="fz12 w100">{{ rowData.CategoryId }}</div>
            </nuxt-link>
            <span class="m-btn-group__closeBtn" @click="btnDelete">Х</span>
        </div>
    </div>
</template>

<script>
import MBtn from '@/components/button/m-btn'
import dateFilter from '~/plugins/filters/date.filter'

export default {
    name: 'MTableItemsRow',
    components: { MBtn },
    props: {
        rowData: {
            type: Object,
            default: () => {
                return {}
            },
        },
        routerIdData: {
            type: String,
            default: () => {
                return 'manager-id'
            },
        },
    },
    data() {
        return {
            disabled: false,
        }
    },
    computed: {
        isAdmin() {
            if (this.rowData.admin) {
                return 'Администратор'
            } else {
                return 'Пользователь'
            }
        },
    },
    methods: {
        dateFilter(value) {
            return dateFilter(new Date(value), 'datetime')
        },
        btnDelete() {
            if (!this.disabled) {
                this.$emit('btnDelete')
            }
        },
    },
}
</script>
