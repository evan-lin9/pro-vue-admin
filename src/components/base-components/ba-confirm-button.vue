<template>
  <el-popconfirm
    placement="top-start"
    :title="`确定${text}?`"
    cancel-button-text="取消"
    confirm-button-text="确定"
    @onConfirm="confirm"
  >
    <el-button slot="reference" style="margin-left: 10px" size="mini" type="text">{{ text }}</el-button>
  </el-popconfirm>
</template>

<script>
export default {
  name: 'BaConfirmButton',
  props: {
    text: {
      type: String,
      default: '按钮'
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>
