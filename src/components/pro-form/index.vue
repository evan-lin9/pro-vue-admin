<template>
  <el-form
    ref="form"
    :model="form"
    label-position="left"
    label-suffix="："
    v-bind="$attrs"
  >
    <el-form-item
      v-for="item in formItems"
      v-if="item._isShow"
      :rules="item._rule"
      :prop="item.key"
      :key="item.key"
      :label="item.title"
    >
      <component
        :is="item.type"
        v-model="form[item.key]"
        :options="item.options"
        v-bind="item.props"
      />
    </el-form-item>
    <el-form-item v-if="hasControl">
      <el-button type="primary" @click="submit">{{ submitText }}</el-button>
      <el-button @click="reset">{{ resetText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import BaSelect from '../base-components/ba-select'
import BaRadio from '../base-components/ba-radio'
import { computeFormItem } from './core'

export default {
  name: 'ProForm',
  components: { BaSelect, BaRadio },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    hasControl: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: '提交'
    },
    resetText: {
      type: String,
      default: '重置'
    },
  },
  data() {
    return {
      form: this.initForm()
    }
  },
  computed: {
    formItems() {
      console.log(this.form, '我有了值，但没触发')
      return this.fields.map(item => computeFormItem(item, this.form))
    }
  },
  methods: {
    initForm() {
      const form = {}
      this.fields.forEach(item => {
        // todo 给每一个表单设置默认值
        // input: ''
        // inputNumber: 0,
        //  date: []
        form[item.key] = item.defaultValue
      })
      return form
    },
    submit() {
      this.$refs.form.validate((valid) => {
        this.$emit('submit', this.form, valid)
      })
    },
    reset() {
      this.$refs.form.resetFields()
    },
    clear() {
      this.$refs.form.clearValidate()
    },
    setForm(form) {
      for (let key in form) {
        this.form[key] = form[key]
        // if (form.hasOwnProperty(key)) {
        //   this.form[key] = form[key]
        // }
      }
    }
  }
}
</script>
