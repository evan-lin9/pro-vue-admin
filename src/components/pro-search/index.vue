<template>
  <div class="filter-wrapper">
    <div class="filter-area">
     <pro-form
       ref="form"
       :fields="searchFields"
       v-bind="$attrs"
       @submit="submit"
       @reset="reset"
       :inline="true"
       :has-control="false"
     />
    </div>
    <div class="filter-control">
      <div class="filter-control-query">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="onSearch"
        >
          查询
        </el-button>
      </div>
      <div class="filter-control-reset">
        <el-button
          type="primary"
          icon="el-icon-refresh-right"
          @click="onReset"
        >
          重置
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSearchFields } from './core'
  export default {
    name: 'ProSearch',
    props: {
      fields: {
        type: Array,
        default: () => []
      },
    },
    computed: {
      searchFields() {
        return getSearchFields(this.fields)
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
      }
    }
  }
</script>

<style scoped lang="scss">
.filter-wrapper {
  display: flex;
  width: 100%;
  background: #fff;
  border: 1px solid #e5e5e5;
  margin-bottom: 12px;
  .filter-area {
    background: #f8f8f8;
    padding: 12px;
    flex: 1 1;
  }
  .filter-control {
    border-left: 1px solid #e5e5e5;
    box-sizing: border-box;
    flex: initial;
    min-width: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    &-query, &-reset {
      margin: 10px 8px;
    }
  }
}
</style>
