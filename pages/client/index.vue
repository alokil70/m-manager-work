<template>
    <div>
        <m-table
            :title="title"
            :column-name="columnName"
            :row-data="managers"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import MTable from '~/components/table/m-table'
export default {
    name: 'Index',
    auth: true,
    components: { MTable },
    async asyncData({ store }) {
        if (store.getters['users/USERS'].length === 0) {
            await store.dispatch('users/GET_USERS_FROM_API')
        }
    },
    data: () => ({
        title: 'Клиенты',
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
            managers: (state) => state.users.users,
        }),
    },
}
</script>

<style scoped></style>
