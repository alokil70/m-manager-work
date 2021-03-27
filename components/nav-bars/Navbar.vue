<template>
    <header>
        <nav>
            <ul>
                <li><nuxt-link to="/">/</nuxt-link></li>
                <li v-for="item in menu" :key="item.id">
                    <nuxt-link v-if="!item.isAdmin" :to="item.link">{{
                        item.title
                    }}</nuxt-link>
                </li>
                <li><nuxt-link to="/forms">Формы</nuxt-link></li>
                <li>
                    <nuxt-link v-if="$auth.user.admin" to="/setting">
                        Настройки
                    </nuxt-link>
                </li>
            </ul>
            <ul>
                <a class="small12 lower">{{ date }}</a>
            </ul>
            <ul>
                <li v-if="$auth.loggedIn">
                    <nuxt-link to="/auth/login">{{
                        $auth.user.name
                    }}</nuxt-link>
                </li>
                <li v-else>
                    <nuxt-link to="auth/login">Войти</nuxt-link>
                </li>
                <li><a href="" @click="logout">Выйти</a></li>
            </ul>
        </nav>
    </header>
</template>

<script>
import dateFilter from '@/plugins/filters/date.filter'

export default {
    name: 'Navbar',
    data: () => ({
        date: null,
        menu: [
            {
                id: 1,
                title: 'Производимые товары',
                isAdmin: false,
                link: '/items',
            },
            {
                id: 2,
                title: 'Закупаемые товары',
                isAdmin: false,
                link: '/goodsItems',
            },
            {
                id: 3,
                title: 'Пользователи',
                isAdmin: false,
                link: '/users',
            },
            {
                id: 4,
                title: 'Отчеты',
                isAdmin: false,
                link: '/reports',
            },
            {
                id: 5,
                title: 'Настройки',
                isAdmin: true,
                link: '/settings',
            },
        ],
    }),
    mounted() {
        setInterval(() => {
            this.date = dateFilter(new Date(), 'datetime')
        }, 1000)
    },
    methods: {
        logout() {
            this.$auth.logout()
        },
    },
}
</script>

<style></style>
