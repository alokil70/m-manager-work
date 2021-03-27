<template>
    <div id="dynamic-component-demo">
        <button
            v-for="tab in tabs"
            :key="tab"
            :class="['tab-button', { active: currentTab === tab }]"
            @click="currentTab = tab"
        >
            {{ tab }}
        </button>

        <keep-alive>
            <component :is="currentTabComponent" class="tab"></component>
        </keep-alive>
    </div>
</template>

<script>
import TabArchive from '@/components/tabArchive'
import TabPosts from '@/components/tabPosts'
export default {
    components: { TabPosts, TabArchive },
    async asyncData({ store }) {
        await store.dispatch('goodsItems/GET_GOODS_FROM_API')
        await store.dispatch('goodsItems/GET_GOODSCATEGORY_FROM_API')
        await store.dispatch('products/GET_PRODUCTS_FROM_API')
        await store.dispatch('products/GET_CATEGORY_FROM_API')
    },
    data() {
        return {
            currentTab: 'Posts',
            tabs: ['Posts', 'Archive'],
        }
    },
    computed: {
        currentTabComponent() {
            return 'tab-' + this.currentTab.toLowerCase()
        },
    },
}
</script>

<style></style>
