export const state = () => ({
    products: [],
    category: [],
})

export const mutations = {
    SET_PRODUCTS_TO_STATE(state, payload) {
        state.products = payload
    },
    SET_CATEGORY_TO_STATE(state, payload) {
        state.category = payload
    },
}
export const actions = {
    async GET_PRODUCTS_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'get',
                url: '/products',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET_PRODUCTS_TO_STATE', response.data)
            })
        }
    },
    async GET_CATEGORY_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'get',
                url: '/category',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET_CATEGORY_TO_STATE', response.data)
            })
        }
    },
    async POST_CATEGORY_TO_API({ commit }, postData) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'post',
                url: '/category',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
                data: postData,
            })
        }
        await this.dispatch('products/GET_CATEGORY_FROM_API')
    },
    async POST_PRODUCT_TO_API({ commit }, postData) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'post',
                url: '/products',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
                data: postData,
            })
        }
        await this.dispatch('products/GET_PRODUCTS_FROM_API')
    },
    async DELETE_PRODUCT_FROM_API({ commit }, id) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'post',
                url: '/products/delete/' + id,
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            })
        }
        await this.dispatch('products/GET_PRODUCTS_FROM_API')
    },
    async UPDATE_PRODUCT_ON_API({ commit }, postData) {
        await this.$axios.patch('/products/' + postData.id, postData)
        await this.dispatch('products/GET_PRODUCTS_FROM_API')
    },
    async DELETE_CATEGORY_FROM_API({ commit }, id) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'post',
                url: '/category/delete/' + id,
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            })
        }
        await this.dispatch('products/GET_CATEGORY_FROM_API')
    },
}

export const getters = {
    PRODUCTS: (s) => s.products,
    GET_PRODUCT_BY_ID: (s) => (id) => {
        return s.products.find((u) => u.id === id)
    },
    CATEGORY: (s) => s.category,
}
