<template>
    <div>
        <div class="nav-block bg-title">
            <m-btn-group
                v-for="item in category"
                :key="item.id"
                class="m6"
                :disabled="disabled"
                :item="item"
                :selected-item="selectedCategory"
                @btnDelete="deleteCategory(item)"
                @btnClick="selectCategory(item)"
            />
        </div>
        <div class="nav-block2 bgTitle">
            <m-btn
                title="Добавить позицию"
                class="m6 bgGreen"
                @click="addItem"
            />
            <m-btn
                title="Добавить группу"
                class="m6 bgGreen"
                @click="addGroup"
            />
            <m-btn title="Добавить" class="m6 bgGreen" />
            <m-btn title="Добавить" class="m6 bgGreen" />
        </div>
        <m-modal v-if="modalAddItem" @close="modalAddItem = !modalAddItem">
            <div class="header flex-center-align m12">Название позиции</div>
            <div>
                <div class="m12">
                    <m-input
                        v-model="editedItem.productName"
                        label="Название"
                    />
                    <m-input v-model="editedItem.price" label="Цена" />
                    <m-input
                        v-model="editedItem.description"
                        label="Описание"
                    />
                    <m-input
                        :value="selectedCategory.categoryName"
                        label="Категория"
                    />
                    <m-input v-model="editedItem.imageName" label="Фото" />
                </div>
                <div class="flex w400">
                    <m-btn
                        class="bgRed"
                        title="Сохранить"
                        :disabled="disabled"
                        @click="saveItem"
                    ></m-btn>
                    <m-btn
                        class="bgRed"
                        title="Отмена"
                        :disabled="disabled"
                        @click="modalAddItem = !modalAddItem"
                    ></m-btn>
                </div>
            </div>
        </m-modal>
        <m-modal v-if="modalAddGroup" @close="modalAddGroup = !modalAddGroup">
            <div class="header flex-center-align m12">Название позиции</div>
            <div>
                <div class="m12">
                    <m-input
                        v-model="editedGroup.categoryName"
                        label="Название"
                    />
                    <m-input
                        v-model="editedGroup.description"
                        label="Описание"
                    />
                    <m-input v-model="editedGroup.imageName" label="Фото" />
                </div>
                <div class="flex w400">
                    <m-btn
                        class="bgRed"
                        title="Сохранить"
                        :disabled="disabled"
                        @click="saveGroup"
                    ></m-btn>
                    <m-btn
                        class="bgRed"
                        title="Отмена"
                        :disabled="disabled"
                        @click="modalAddGroup = !modalAddGroup"
                    ></m-btn>
                </div>
            </div>
        </m-modal>
        <div class="form-block">
            <m-table-items
                :title="title"
                :column-name="columnName"
                :row-data="itemFilteredList"
                :category="category"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import MBtnGroup from '@/components/button/m-btn-group'
import MModal from '@/components/modal/m-modal'
import MInput from '@/components/form/m-input'
import MTableItems from '~/components/table/items/m-table-items'
import MBtn from '~/components/button/m-btn'

export default {
    name: 'Index',
    auth: true,
    components: { MInput, MModal, MBtnGroup, MBtn, MTableItems },
    async asyncData({ store }) {
        if (
            store.getters['products/PRODUCTS'].length === 0 &&
            store.getters['products/CATEGORY'].length === 0
        ) {
            await store.dispatch('products/GET_PRODUCTS_FROM_API')
            await store.dispatch('products/GET_CATEGORY_FROM_API')
        }
    },
    data: () => ({
        title: 'Номенклатура',
        modalAddItem: false,
        modalAddGroup: false,
        columnName: [
            { id: 1, title: 'чтото' },
            { id: 2, title: 'откуда' },
            { id: 3, title: 'Компания' },
            { id: 3, title: 'Лицензия' },
            { id: 4, title: 'зачем' },
        ],
        selectedCategory: null,
        disabled: false,
        files: null,
        editedGroup: {
            categoryName: '',
            description: '',
            imageName: '',
        },
        defaultGroup: {
            categoryName: '',
            description: '',
            imageName: '',
        },
        editedItem: {
            productName: '',
            description: '',
            price: null,
            imageName: '',
            text: '',
            text1: '',
            text2: '',
            categoryId: null,
        },
        defaultItem: {
            productName: '',
            description: '',
            price: null,
            imageName: '',
            text: '',
            text1: '',
            text2: '',
            categoryId: null,
        },
    }),
    computed: {
        ...mapState({
            products: (state) => state.products.products,
            category: (state) => state.products.category,
            managers: (state) => state.users.users,
        }),
        itemFilteredList() {
            return this.products.filter((i) => {
                if (this.selectedCategory) {
                    return i.CategoryId === this.selectedCategory.id
                } else {
                    return this.products
                }
            })
        },
    },
    methods: {
        addItem() {
            this.modalAddItem = true
        },
        addGroup() {
            this.modalAddGroup = true
        },
        selectCategory(item) {
            this.selectedCategory = item
            const obj = this.category.find(
                (i) => i.id === this.selectedCategory.id,
            )
            this.editedItem.categoryId = obj.id
        },
        editItem(item) {
            this.editedIndex = this.productsFormList.indexOf(item)
            this.editedItem = Object.assign({}, item)
        },
        async deleteItem(item) {
            const index = this.productsFormList.indexOf(item)
            confirm('Удалить ?') && this.productsFormList.splice(index, 1)
            await this.$store.dispatch(
                'products/DELETE_PRODUCT_FROM_API',
                item.id,
            )
            await this.$store.dispatch('products/GET_PRODUCTS_FROM_API')
        },
        async close() {
            this.disabled = true
            await this.$store.dispatch('products/GET_PRODUCTS_FROM_API')
            await this.$store.dispatch('products/GET_CATEGORY_FROM_API')
            this.modalAddItem = false
            this.modalAddGroup = false
            this.editedItem = this.defaultItem
            this.editedGroup = this.defaultGroup
            this.disabled = false

            console.log(this.selectedCategory)
        },
        async deleteCategory(item) {
            /* const index = this.category.indexOf(item)
            confirm('Удвлить ?') && this.categoryFormList.splice(index, 1) */
            this.disabled = true
            await this.$store.dispatch(
                'products/DELETE_CATEGORY_FROM_API',
                item.id,
            )
            await this.$store.dispatch('products/GET_CATEGORY_FROM_API')
            this.disabled = false
        },
        async saveGroup() {
            this.disabled = true
            await this.$store.dispatch(
                'products/POST_CATEGORY_TO_API',
                this.editedGroup,
            )
            await this.close()
        },
        async saveItem() {
            console.log(this.selectedCategory)
            this.disabled = true
            if (this.selectedCategory) {
                const obj = this.category.find(
                    (i) => i.id === this.selectedCategory.id,
                )
                this.editedItem.categoryId = obj.id
            }

            const formData = new FormData()
            for (const item in this.editedItem) {
                formData.append(item, this.editedItem[item])
            }
            formData.append('image', this.files)

            await this.$store.dispatch('products/POST_PRODUCT_TO_API', formData)
            this.files = null
            await this.close()
            console.log(this.selectedCategory)
        },
    },
}
</script>

<style scoped></style>
