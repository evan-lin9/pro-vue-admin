<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="beforeClose"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'Prodialog',
  model: {
    prop: 'visible',
    event: 'show'
  },
  props: {
    visible: Boolean
  },
  methods: {
    beforeClose() {
      this.$emit('show', !this.visible)
    }
  }
}
</script>
