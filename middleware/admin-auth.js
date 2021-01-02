export default ({ store, redirect }) => {
    if (!this.$auth.loggedIn) {
        redirect('/auth/login')
    }
}
