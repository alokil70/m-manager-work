<template>
    <div class="work">
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
                class="m6"
                :disabled="category.length === 0"
                @click="modalItem"
            />
            <m-btn
                title="Добавить группу"
                class="m6 bgGreen"
                @click="modalCategory"
            />
            <m-btn title="Редактировать категории" class="m6 bgGreen" />
        </div>
        <m-modal v-if="modalAddItem" @close="modalAddItem = !modalAddItem">
            <div class="flex-center-align m12">Название позиции</div>
            <div>
                <div class="m12">
                    <m-input v-model="editedItem.title" label="Название" />
                    <m-input v-model="editedItem.price" label="Цена" />
                    <m-input
                        v-model="editedItem.description"
                        label="Описание"
                    />
                    <m-input
                        :value="selectedCategory.title"
                        label="Категория"
                    />
                    <m-input v-model="editedItem.image" label="Фото" />
                </div>
                <div class="flex w400">
                    <m-btn
                        class="bgRed m6"
                        title="Сохранить"
                        :disabled="disabled"
                        @click="addItem"
                    ></m-btn>
                    <m-btn
                        class="bgRed m6"
                        title="Отмена"
                        :disabled="disabled"
                        @click="modalAddItem = !modalAddItem"
                    ></m-btn>
                </div>
            </div>
        </m-modal>
        <m-modal v-if="modalAddGroup" @close="modalAddGroup = !modalAddGroup">
            <div class="flex-center-align m12">Название категории</div>
            <div>
                <div class="m12">
                    <m-input v-model="editedGroup.title" label="Название" />
                    <m-input
                        v-model="editedGroup.description"
                        label="Описание"
                    />
                    <m-input v-model="editedGroup.image" label="Фото" />
                </div>
                <div class="flex w400">
                    <m-btn
                        class="bgRed m6"
                        title="Сохранить"
                        :disabled="disabled"
                        @click="addCategory"
                    ></m-btn>
                    <m-btn
                        class="bgRed m6"
                        title="Отмена"
                        :disabled="disabled"
                        @click="modalAddGroup = !modalAddGroup"
                    ></m-btn>
                </div>
            </div>
        </m-modal>
        <div class="form-block">
            <m-table-items
                :column-name="columnName"
                :row-data="itemFilteredList"
                @btnDelete="deleteItem($event)"
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
    /* async asyncData({ store }) {
        if (
            store.getters[this.storeItem.get].length === 0 &&
            store.getters[this.storeCategory.get].length === 0
        ) {
            await store.dispatch('products/GET_PRODUCTS_FROM_API')
            await store.dispatch('products/GET_CATEGORY_FROM_API')
        }
    }, */
    data: () => ({
        title: 'Номенклатура',
        modalAddItem: false,
        modalAddGroup: false,
        storeItem: {
            get: 'semis/SEMIS',
            actionGet: 'semis/GET_SEMIS_FROM_API',
            actionSet: 'semis/SET_SEMIS_TO_API',
            actionUpd: 'semis/UPDATE_GOODS_ON_API',
            actionDel: 'semis/DELETE_GOODS_FROM_API',
        },
        storeCategory: {
            get: 'semis/SEMISCATEGORY',
            actionGet: 'semis/GET_SEMISCATEGORY_FROM_API',
            actionSet: 'semis/SET_SEMISCATEGORY_TO_API',
            actionDel: 'semis/DELETE_SEMISCATEGORY_FROM_API',
        },
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
            title: '',
            description: '',
            image: '',
        },
        defaultGroup: {
            title: '',
            description: '',
            image: '',
        },
        editedItem: {
            title: '',
            description: '',
            price: null,
            image: '',
            goodsCategoryId: null,
        },
        defaultItem: {
            title: '',
            description: '',
            price: null,
            image: '',
            goodsCategoryId: null,
        },
    }),
    computed: {
        ...mapState({
            products: (state) => state.semis.semis,
            category: (state) => state.semis.semisCategory,
            managers: (state) => state.users.users,
        }),
        itemFilteredList() {
            if (this.selectedCategory) {
                return this.products.filter(
                    (i) => i.SemisCategoryId === this.selectedCategory.id,
                )
            } else {
                return []
            }
        },
    },
    mounted() {
        this.selectedCategory = this.category[0]
    },
    methods: {
        modalItem() {
            this.modalAddItem = true
        },
        modalCategory() {
            this.modalAddGroup = true
        },
        selectCategory(item) {
            this.selectedCategory = item
            const obj = this.category.find(
                (i) => i.id === this.selectedCategory.id,
            )
            this.editedItem.categoryId = obj.id
        },
        async close() {
            this.disabled = true
            await this.$store.dispatch(this.storeItem.actionGet)
            await this.$store.dispatch(this.storeCategory.actionGet)
            this.modalAddItem = false
            this.modalAddGroup = false
            this.editedItem = this.defaultItem
            this.editedGroup = this.defaultGroup
            this.disabled = false
        },
        async deleteCategory(item) {
            this.disabled = true
            if (!this.products.find((i) => i.CategoryId === item.id)) {
                await this.$store.dispatch(
                    this.storeCategory.actionDel,
                    item.id,
                )
                await this.$store.dispatch(this.storeCategory.actionGet)
            }
            this.disabled = false
        },
        async deleteItem(id) {
            this.disabled = true
            console.log(id)
            await this.$store.dispatch(this.storeItem.actionDel, id)
            this.disabled = false
        },
        async addCategory() {
            this.disabled = true
            await this.$store.dispatch(
                this.storeCategory.actionSet,
                this.editedGroup,
            )
            await this.close()
        },
        async addItem() {
            this.disabled = true
            if (this.selectedCategory) {
                const obj = this.category.find(
                    (i) => i.id === this.selectedCategory.id,
                )
                this.editedItem.semisCategoryId = obj.id
            }

            const formData = new FormData()
            for (const item in this.editedItem) {
                formData.append(item, this.editedItem[item])
            }
            formData.append('image', this.files)

            await this.$store.dispatch(this.storeItem.actionSet, formData)
            this.files = null
            await this.close()
        },
    },
}
</script>

<style scoped></style>
