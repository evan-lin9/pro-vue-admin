<template>
  <div>
    <el-tag
      v-for="item in currValue"
      :key="item.key"
      closable
      :disable-transitions="false"
      size="small"
      @close="deleteTag(item.key)"
    >
      <b>{{ item.key + ': ' }}</b>{{ item.value }}
    </el-tag>
    <el-select
      v-if="!selected"
      v-model="selected"
      filterable
    >
      <el-option
        v-for="item in currOptions"
        v-show="!item.selected"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      />
    </el-select>
    <el-input
      v-else
      v-model="inputValue"
      style="width: 300px"
      @keyup.enter.native="inputResultConfirm"
      @blur="inputResultConfirm"
    >
      <template slot="prepend">{{ selected }}</template>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: 'BaSelectInput',
    props: {
      options: {
        type: [Array, Object],
        default: () => []
      },
      value: {
        type: Array,
        default: () => []
      },
      change: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        selected: '',
        inputValue: ''
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
      },
      currOptions() {
        if (Array.isArray(this.options) && this.options.length === 0) return []
        // 如果配置项是简单数组，则key/value 相同
        if (Array.isArray(this.options) && this.options.every(i => typeof i === 'string' || typeof i === 'number')) {
          return this.options.map(i => ({ value: i, label: i, selected: false }))
        } else if (Array.isArray(this.options) && this.options.every(i => typeof i === 'object')) {
          return this.options.map(i => ({ ...i, selected: false }))
        } else {
          return Object.keys(this.options).map(key => ({ value: key, label: this.options[key], selected: false }))
        }
      }
    },
    methods: {
      deleteTag(key) {
        const index = this.currValue.findIndex(i => i.key === key)
        this.currOptions.find(i => i.value === key).selected = false
        this.currValue.splice(index, 1)
      },
      inputResultConfirm() {
        if (this.inputValue) {
          this.$emit('input', [...this.currValue, { key: this.selected, value: this.inputValue.trim() }])
          const index = this.currOptions.findIndex(item => item.value === this.selected)
          if (index !== -1) {
            this.currOptions[index].selected = true
          }
        }
        this.selected = ''
        this.inputValue = ''
      },
      reset() {
        this.currOptions.forEach(item => { item.selected = false })
        this.$emit('input', [])
      }
    }
  }
</script>
