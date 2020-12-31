<template>
  <el-radio-group
    v-model="currValue"
    v-bind="$attrs"
    @click="click"
  >
    <el-radio
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
    >
      {{ opt.label }}
    </el-radio>
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
