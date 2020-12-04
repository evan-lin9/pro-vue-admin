<template>
  <div>
    <el-tag
      v-for="tag in currValue"
      :key="tag.key"
      closable
      @close="deleteTag(tag.key)"
    >
      {{ `${tag.key}: ${tag.value}`}}
    </el-tag>
    <el-select
      v-if="!selectValue"
      v-model="selectValue"
      filterable
    >
      <el-option
        v-for="item in currOptions"
        v-show="!item.selected"
        :key="item.key"
        :label="item.label"
        :value="item.key"
      />
    </el-select>
    <el-input
      v-else
      v-model="inputValue"
      @blur="onConfirmResult"
      @keyup.enter.native="onConfirmResult"
      class="input"
      clearable
    >
      <template slot="prepend">{{ selectValue }}</template>
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
        selectValue: '',
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
        // 永远都是[{ label: '', value: '', selected: bool }]
        // 1. 纯字符串数据 ['key1', 'key2', 'key3']
        // 2. 纯key/value 形式的对象 { a: 1, b: 2, c: 3}
        // 3. 对象数组
        if (Object.prototype.toString.call(this.options) === '[object Object]') {
          return Object.keys(this.options)
          .map(key => ({
            key,
            value: this.options[key],
            selected: false
          }))
        } else if(Array.isArray(this.options) && this.options.every(i => typeof i === 'string')) {
          return this.options.map(i => ({
            key: i,
            value: i,
            selected: false
          }))
        } else {
         return this.options.map(i => ({ ...i, selected: false }))
        }
      }
    },
    methods: {
      deleteTag(key) {
        const index = this.currValue.findIndex(i => i.key === key)
        this.currOptions.find(i => i.key === key).selected = false
        this.currValue.splice(index, 1)
      },
      onConfirmResult() {
        // [{key: '', value: ''}]
        console.log(this.selectValue, this.inputValue)
        if (this.inputValue) {
          this.$emit('input', [
            ...this.currValue,
            { key: this.selectValue, value: this.inputValue }
            ])
          this.currOptions.find(i => i.key === this.selectValue).selected = true
        }
        this.selectValue = ''
        this.inputValue = ''
      }
    }
  }
</script>

<style scoped>
  .input {
    width: 300px;
  }
</style>
