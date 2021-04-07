export const state = () => ({
    semis: [],
    semisCategory: [],
})

export const mutations = {
    SET_SEMIS_TO_STATE(state, payload) {
        state.semis = payload
    },
    SET_SEMISCATEGORY_TO_STATE(state, payload) {
        state.semisCategory = payload
    },
}

export const actions = {
    async GET_SEMIS_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'get',
                url: '/semis',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET_SEMIS_TO_STATE', response.data)
            })
        }
    },
    async GET_SEMISCATEGORY_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'get',
                url: '/semisCategory',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET_SEMISCATEGORY_TO_STATE', response.data)
            })
        }
    },
    async SET_SEMISCATEGORY_TO_API({ commit }, postData) {
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
        await this.dispatch('semis/GET_SEMISCATEGORY_FROM_API')
    },
    async SET_SEMIS_TO_API({ commit }, postData) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'post',
                url: '/semis',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
                data: postData,
            })
        }
        await this.dispatch('semis/GET_SEMIS_FROM_API')
    },
    async DELETE_SEMIS_FROM_API({ commit }, id) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'post',
                url: '/semis/delete/' + id,
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            })
        }
        await this.dispatch('semis/GET_SEMIS_FROM_API')
    },
    async UPDATE_GOODS_ON_API({ commit }, postData) {
        await this.$axios.patch('/goodsItem/' + postData.id, postData)
        await this.dispatch('semis/GET_SEMIS_FROM_API')
    },
    async DELETE_GOODSCATEGORY_FROM_API({ commit }, id) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'post',
                url: '/semisCategory/delete/' + id,
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            })
        }
        await this.dispatch('semis/GET_SEMISCATEGORY_FROM_API')
    },
}

export const getters = {
    SEMIS: (s) => s.semis,
    GET_SEMIS_BY_ID: (s) => (id) => {
        return s.semis.find((u) => u.id === id)
    },
    SEMISCATEGORY: (s) => s.semisCategory,
}
