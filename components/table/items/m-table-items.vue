<template>
    <div class="m-table card m6">
        <div class="m-table__header flex-around">
            <p v-for="item in columnName" :key="item.title">
                {{ item.title }}
            </p>
        </div>
        <m-table-items-row
            v-for="row in rowData"
            :key="row.id"
            :row-data="row"
        />
    </div>
</template>

<script>
import MTableItemsRow from '@/components/table/items/m-table-items-row'
import MBtn from '~/components/button/m-btn'

export default {
    name: 'MTableItems',
    components: { MTableItemsRow, MBtn },
    props: {
        title: {
            type: String,
            default: 'table',
        },
        columnName: {
            type: Array,
            default: () => {
                return []
            },
        },
        rowData: {
            type: Array,
            default: () => {
                return []
            },
        },
        category: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
}
</script>
