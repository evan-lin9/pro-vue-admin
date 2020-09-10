<template>
  <div id="app">
    <dashboard />
<!--    <pro-form-->
<!--      :fields="fields"-->
<!--      @submit="onsubmit"-->
<!--    />-->
  </div>
</template>

<script>
import Dashboard from './pages/dashbord'

export default {
  name: 'App',
  components: { Dashboard },
  data() {
    return {
      fields: [
        { title: '用户名', key: 'username', isRequired: true, contentWidth: 160 },
        { title: '年龄', key: 'age', type: 'inputNumber', isRequired: true },
        { title: '性别', key: 'sex', type: 'radio', defaultValue: 1, options: [
            { label: '男', value: 1 },
            { label: '女', value: 2 },
          ]
        },
        { title: '喜欢的颜色', key: 'color', isShow: ({ sex }) => sex === 2 }
      ]
    }
  },
  methods: {
    onsubmit(form, valid) {
      console.log(valid, form)
    }
  }
}
</script>

<style lang="scss">
  #app {
    padding: 50px;
  }
</style>
