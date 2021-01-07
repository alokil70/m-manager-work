<template>
    <div class="content-table">
        <nuxt-link
            :to="{ name: 'manager-id', params: { id: rowData.id } }"
            class="row"
        >
            <div class="row-left">
                <div class="fz12">{{ rowData.productName }}</div>
            </div>
            <div class="row-left">
                <div class="fz12">{{ rowData.price }}р</div>
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
            <div class="row-center fz12">{{ rowData.description }}</div>
            <div class="row-center fz12">{{ rowData.CategoryId }}</div>
        </nuxt-link>
    </div>
</template>

<script>
import dateFilter from '~/plugins/filters/date.filter'

export default {
    name: 'MTableItemsRow',
    props: {
        rowData: {
            type: Object,
            default: () => {
                return {}
            },
        },
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
    },
}
</script>
