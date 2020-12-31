<template>
  <div class="ba-search-table">
    <pro-search
      ref="search"
      :is-default-show="false"
      :auth="searchAuth"
      :fields="fields"
      @submit="onSearch"
      @reset="onReset"
    />
    <div class="table-list-operator">
      <slot name="btn"></slot>
    </div>
    <pro-table
      ref="table"
      v-bind="$attrs"
      :fields="fields"
      :api="api"
      :params="filterParams"
    />
  </div>
</template>

<script>
  function noop() {}

  export default {
    name: 'ProSearchTable',
    props: {
      fields: {
        type: Array,
        default: () => []
      },
      api: {
        type: Function,
        default: noop()
      },
      offlineExport: {
        type: Function,
        default: null
      },
      tableExtend: {
        type: Object,
        default: () => {}
      },
      searchAuth: {
        type: String,
        default: 'search'
      },
      offlineExportAuth: {
        type: String,
        default: 'offlineExport'
      }
    },
    data() {
      return {
        filterParams: {}
      }
    },
    methods: {
      onSearch(form) {
        this.filterParams = form
        this.$refs.table.currentPage = 1
        this.$nextTick(() => {
          this.$refs.table.getData()
        })
      },

      onReset() {
        this.$refs.table.currentPage = 1
        this.$refs.table.pageSize = 20
      },

      refresh() {
        this.$refs.table.refresh()
      },

      onOfflineExport() {
        this.offlineExport(this.$refs.search.form).then(res => {
          if (res.status === 'OK') {
            this.$message.success(res.data)
          }
        })
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

  .table-list-operator {
    margin: 12px 0;
  }

  .table-list {
    margin-bottom: 12px;
  }

  .table-footer {
    display: flex;
    justify-content: flex-end;
  }
</style>
