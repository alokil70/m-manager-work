<template>
    <div>
        <h1 class="flex-center-align fz28 fw300">
            Номенклатурная позиция {{ product.productName }}
        </h1>
        <h3 class="flex-center-align fw300">создан "{{ created }}"</h3>
        <div class="flex-center-align flex-wrap w1100">
            <div class="input-label card-min m12 flex-center-align">
                <m-input v-model="product.productName" :label="titles.title" />
            </div>
            <div class="input-label card-min m12 flex-center-align">
                <m-input v-model="product.price" :label="titles.price" />
            </div>
            <div class="input-label card-min m12 flex-center-align">
                <m-input
                    v-model="product.description"
                    :label="titles.description"
                />
            </div>
            <div class="input-label card-min m12 flex-center-align">
                <m-input
                    v-model="product.productName"
                    :label="titles.modules"
                />
            </div>
            <div class="input-label card-min m12 flex-center-align">
                <m-input
                    v-model="product.productName"
                    :label="titles.expired"
                />
            </div>
            <div class="input-label card-min m12 flex-center-align">
                <m-input v-model="product.productName" :label="titles.access" />
            </div>
            <m-btn
                class="w400 bgGreen"
                :title="titles.btnSave"
                @click="updateProduct"
            />
            <m-btn
                class="w400 bgGreen"
                :title="titles.btnDelete"
                @click="deleteProduct"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MInput from '@/components/form/m-input'
import MBtn from '~/components/button/m-btn'

export default {
    name: 'Id',
    components: { MInput, MBtn },
    validate({ params }) {
        return /^\d+$/.test(params.id)
    },
    data: () => ({
        titles: {
            btnSave: 'Сохранить',
            btnDelete: 'Удалить',
            title: 'Название',
            price: 'Цена',
            description: 'Описание',
            access: 'Уровень доступа',
            country: 'Страна',
            city: 'Населенный пункт',
            fio: 'Имя Фамилия',
        },
    }),
    computed: {
        ...mapGetters({
            products: 'products/GET_PRODUCT_BY_ID',
        }),
        isAdmin() {
            if (this.manager.admin) {
                return 'Администратор'
            } else {
                return 'Пользователь'
            }
        },
        product() {
            return this.products(Number(this.$route.params.id))
        },
        created() {
            return new Date(this.product.createdAt).toLocaleString()
        },
    },
    methods: {
        deleteProduct() {
            this.$store.dispatch(
                'products/DELETE_PRODUCT_FROM_API',
                this.product.id,
            )
            this.$router.push('/items')
        },
        updateProduct() {
            this.$store.dispatch('products/UPDATE_PRODUCT_ON_API', this.product)
            this.$router.push('/items')
        },
    },
}
</script>
