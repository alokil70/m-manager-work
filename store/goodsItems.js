export const state = () => ({
    goodsItems: [],
    goodsCategory: [],
})

export const mutations = {
    SET_GOODS_TO_STATE(state, payload) {
        state.goodsItems = payload
    },
    SET_GOODSCATEGORY_TO_STATE(state, payload) {
        state.goodsCategory = payload
    },
}

export const actions = {
    async GET_GOODS_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'get',
                url: '/goodsItem',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET_GOODS_TO_STATE', response.data)
            })
        }
    },
    async GET_GOODSCATEGORY_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'get',
                url: '/goodsCategory',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET_GOODSCATEGORY_TO_STATE', response.data)
            })
        }
    },
    async SET_GOODSCATEGORY_TO_API({ commit }, postData) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'post',
                url: '/goodsCategory',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
                data: postData,
            })
        }
        await this.dispatch('products/GET_CATEGORY_FROM_API')
    },
    async SET_GOODS_TO_API({ commit }, postData) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'post',
                url: '/goodsItem',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
                data: postData,
            })
        }
        await this.dispatch('products/GET_PRODUCTS_FROM_API')
    },
    async DELETE_GOODS_FROM_API({ commit }, id) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'post',
                url: '/goodsItem/delete/' + id,
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            })
        }
        await this.dispatch('products/GET_PRODUCTS_FROM_API')
    },
    async UPDATE_GOODS_ON_API({ commit }, postData) {
        await this.$axios.patch('/goodsItem/' + postData.id, postData)
        await this.dispatch('goodsItems/GET_GOODS_FROM_API')
    },
    async DELETE_GOODSCATEGORY_FROM_API({ commit }, id) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'post',
                url: '/goodsCategory/delete/' + id,
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            })
        }
        await this.dispatch('goodsItems/GET_GOODSCATEGORY_FROM_API')
    },
}

export const getters = {
    GOODS: (s) => s.goodsItems,
    GET_GOODS_BY_ID: (s) => (id) => {
        return s.goodsItems.find((u) => u.id === id)
    },
    GOODSCATEGORY: (s) => s.goodsCategory,
}
