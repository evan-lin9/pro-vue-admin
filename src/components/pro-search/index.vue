<template>
  <pro-form
    ref="form"
    class="pro-search"
    v-bind="$attrs"
    :fields="searchFields"
    :toggle-fields="searchToggleFields"
    :inline="true"
    :has-control="false"
    :toggleable="true"
    :search-form-toggle="searchFormToggle"
    @submit="submit"
    @reset="reset"
  >
    <el-col slot="search" :span="6">
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="onSearch"
      >
        查询
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-refresh-right"
        @click="onReset"
      >
        重置
      </el-button>
      <el-button v-if="searchToggleFields.length > 0" type="text" @click="toggle">
        {{ searchFormToggle ? '收起' : '展开' }}<i :class="`el-icon-arrow-${searchFormToggle ? 'up' : 'down'} el-icon--right`" />
      </el-button>
    </el-col>
  </pro-form>
</template>

<script>
  import { getSearchFields, getSearchToggleFields } from './core'
  export default {
    name: 'ProSearch',
    props: {
      fields: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        searchFormToggle: false
      }
    },
    computed: {
      searchFields() {
        return getSearchFields(this.fields)
      },
      searchToggleFields() {
        return getSearchToggleFields(this.fields)
      }
    },
    methods: {
      submit(form, valid) {
        if (valid) {
          this.$emit('submit', form)
        } else {
          return false
        }
      },

      reset() {
        this.$emit('reset')
      },

      onSearch() {
        this.$refs.form.submit()
      },

      onReset() {
        this.$refs.form.reset()
        this.onSearch()
      },

      // 调整搜索表单收起/隐藏
      toggle() {
        // 修改状态
        this.searchFormToggle = !this.searchFormToggle
      }
    }
  }
</script>

<style lang="scss">
.pro-search {
  margin-bottom: 16px;
  padding: 18px;
  background: #fff;
  .el-row {
    // 用来解决 el-datepicker 组件 type 类型为 datetimerange 时高度不一致的问题
    .el-form-item__content {
      // line-height: 1 !important;
    }
    .el-col {
      /*.el-form-item {*/
      /*  margin-bottom: 0;*/
      /*}*/
    }
    /*.el-col:nth-child(n+5) {*/
    /*  margin-top: 12px;*/
    /*}*/
  }
}
</style>
