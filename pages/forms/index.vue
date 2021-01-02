<template>
    <div>
        <m-form />
        <m-toggle />
        <m-table :title="title" :column-name="columnName" :row-data="company" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import MToggle from '@/components/form/m-toggle'
import MForm from '@/components/form/m-form'
import MTable from '~/components/table/company/m-table-company'

export default {
    name: 'Index',
    auth: true,
    components: { MForm, MToggle, MTable },
    async asyncData({ store }) {
        if (store.getters['company/COMPANY'].length === 0) {
            await store.dispatch('company/GET_COMPANY_FROM_API')
        }
    },
    data: () => ({
        title: 'Компании',
        columnName: [
            { id: 1, title: 'Логин' },
            { id: 2, title: 'Город' },
            { id: 3, title: 'Компания' },
            { id: 3, title: 'Лицензия' },
            { id: 4, title: 'Уровнь доступа' },
        ],
    }),
    computed: {
        ...mapState({
            company: (state) => state.company.company,
        }),
    },
}
</script>

<style scoped></style>
