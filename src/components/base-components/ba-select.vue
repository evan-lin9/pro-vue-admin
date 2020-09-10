<template>
  <el-select
    v-model="currValue"
    v-bind="$attrs"
    @change="change"
  >
    <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
  </el-select>
</template>

<script>
export default {
  name: 'BaSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      default: null
    },
    change: {
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
