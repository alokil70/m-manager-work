export const state = () => ({
    company: [],
})

export const mutations = {
    SET_COMPANY_TO_STATE(state, payload) {
        state.company = payload
    },
}
export const actions = {
    GET_COMPANY_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            this.$axios({
                method: 'get',
                url: '/company',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((res) => {
                commit('SET_COMPANY_TO_STATE', res.data)
            })
        }
    },
    async SET_COMPANY_TO_API({ commit }, payload) {
        try {
            await this.$axios.post('/company', payload).then((e) => {
                if (e.status === 201) {
                    this.$router.push('/auth/login')
                } else {
                    console.log(e.statusText)
                }
            })
        } catch (err) {
            console.log(err)
        }
    },
    async GET_COMPANY_BY_ID({ state }, id) {
        const asa = await state.company.find((u) => u.id === id)
        console.log(asa)
        return asa
    },
}

export const getters = {
    COMPANY: (s) => s.company,
    get: (s) => (id) => {
        return s.company.find((u) => u.id === id) || {}
    },
}
