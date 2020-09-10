<template>
  <el-popconfirm
    placement="top-start"
    icon="el-icon-info"
    icon-color="red"
    title="确定删除？"
    cancel-button-text="取消"
    confirm-button-text="确定"
    @onConfirm="confirm"
  >
    <el-button slot="reference" style="margin-left: 10px" size="mini" type="text">删除</el-button>
  </el-popconfirm>
</template>

<script>
export default {
  name: 'BaDeleteButton',
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
