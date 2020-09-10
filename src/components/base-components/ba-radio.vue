<template>
  <el-radio-group
    v-model="currValue"
    v-bind="$attrs"
    @click="click"
  >
    <el-radio :label="options[0].value">{{ options[0].label }}</el-radio>
    <el-radio :label="options[1].value">{{ options[1].label }}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'BaRadio',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      default: null
    },
    click: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    currValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
