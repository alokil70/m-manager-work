export const state = () => ({
    users: [],
})

export const mutations = {
    SET_USERS_TO_STATE(state, payload) {
        state.users = payload
    },
}

export const actions = {
    GET_USERS_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            this.$axios({
                method: 'get',
                url: '/users',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((res) => {
                commit('SET_USERS_TO_STATE', res.data)
            })
        }
    },
    async SET_USER_TO_API({ commit }, payload) {
        const token = this.$auth.getToken('local')
        if (token) {
            try {
                await this.$axios({
                    method: 'post',
                    url: '/users',
                    headers: {
                        Authorization: 'Bearer ' + token.split(' ')[2],
                    },
                    data: payload,
                }).then((e) => {
                    if (e.status === 201) {
                        this.$router.push('/diler')
                    } else {
                        console.log(e.statusText)
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
    },
    async GET_USER_BY_ID({ state }, id) {
        return await state.users.find((u) => u.id === id)
    },
}

export const getters = {
    USERS: (s) => s.users,
    get: (s) => (id) => {
        return s.users.find((u) => u.id === id) || {}
    },
}
