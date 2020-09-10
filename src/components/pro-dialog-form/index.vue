<template>
  <el-dialog
    :visible.sync="visible"
    :title="`${mode === 'add' ? '新增' : '编辑'}${name}`"
    :before-close="beforeClose"
    :destroy-on-close="true"
    v-bind="$attrs"
    custom-class="pro-dialog-form"
  >
    <pro-form
      ref="form"
      :fields="dialogFields"
      v-bind="$attrs"
      @submit="submit"
    />
  </el-dialog>
</template>

<script>
import { getDialogFields } from './core'

export default {
  name: 'ProDialogForm',
  props: {
    name: {
      type: String,
      default: ''
    },
    fields: {
      type: Array,
      default: () => []
    },
    addApi: {
      type: Function,
      default: function() {}
    },
    updateApi: {
      type: Function,
      default: function() {}
    },
    isDefaultShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      mode: 'add',
      visible: false,
    }
  },
  computed: {
    dialogFields() {
      return getDialogFields(this.fields || [], this.isDefaultShow)
    },
  },
  methods: {
    add(row) {
      return new Promise((resolve, reject) => {
        this.mode = 'add'
        this.visible = true
        this.resolve = resolve
        this.reject = reject
        this.$nextTick(() => {
          this.$refs.form.reset()
          row && this.$refs.form.setForm(row)
        })
      })
    },

    update(row) {
      return new Promise((resolve, reject) => {
        this.mode = 'edit'
        this.visible = true
        this.resolve = resolve
        this.reject = reject
        setTimeout(() => {
          row && this.$refs.form.setForm(row)
        })
      })
    },

    beforeClose() {
      this.visible = false
    },

    submit(form, valid) {
      if (valid) {
        if (this.mode === 'edit') {
          this.updateApi(form).then(res => {
            if (res.status === 'success') {
              this.resolve()
              this.beforeClose()
            } else {
              this.reject()
              this.$message.error(JSON.stringify(res.message))
            }
          })
        } else {
          this.addApi(form).then(res => {
            if (res.status === 'success') {
              this.resolve()
              this.beforeClose()
            } else {
              this.reject()
              this.$message.error(JSON.stringify(res.message))
            }
          })
        }
      } else {
        return false
      }
    },
  }
}
</script>

<style lang="scss">
.pro-dialog-form {
  /deep/ .el-form-item {
    margin-bottom: 22px;
  }
}
</style>
