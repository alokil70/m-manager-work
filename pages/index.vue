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
