<template>
    <div>
        <h1 class="flex-center-align fz28 fw300">
            Учетная запись {{ manager.name }}
        </h1>
        <h3 class="flex-center-align fw300">создана "{{ created }}"</h3>
        <div class="flex-center-align flex-wrap w1100">
            <div class="input-label card-min m12 flex-center-align">
                <m-input v-model="manager.name" :label="titles.fio" />
            </div>
            <div class="input-label card-min m12 flex-center-align">
                <m-input v-model="manager.city" :label="titles.city" />
            </div>
            <div class="input-label card-min m12 flex-center-align">
                <m-input v-model="manager.company" :label="titles.company" />
            </div>
            <div class="input-label card-min m12 flex-center-align">
                <m-input v-model="manager.modules" :label="titles.modules" />
            </div>
            <div class="input-label card-min m12 flex-center-align">
                <m-input v-model="manager.expire" :label="titles.expired" />
            </div>
            <div class="input-label card-min m12 flex-center-align">
                <m-input v-model="manager.admin" :label="titles.access" />
            </div>
            <m-btn class="w400" :title="titles.button" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MInput from '@/components/form/m-input'
import MBtn from '~/components/button/m-btn'

export default {
    name: 'Id',
    components: { MInput, MBtn },
    validate({ params }) {
        return /^\d+$/.test(params.id)
    },
    data: () => ({
        titles: {
            button: 'Сохранить',
            modules: 'Список модулей',
            company: 'Юр. лицо',
            expired: 'Дата окончания',
            access: 'Уровень доступа',
            country: 'Страна',
            city: 'Населенный пункт',
            fio: 'Имя Фамилия',
        },
    }),
    computed: {
        ...mapGetters({
            getManager: 'users/get',
        }),
        manager() {
            return this.getManager(Number(this.$route.params.id))
        },
        created() {
            return new Date(this.manager.createdAt).toLocaleString()
        },
    },
}
</script>
