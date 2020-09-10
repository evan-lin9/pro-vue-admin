<template>
  <div class="ba-table">
    <el-table
      v-loading="loading"
      border
      element-loading-text="数据正在加载中"
      size="small"
      :data="newList"
      v-bind="$attrs"
    >
      <template v-for="item in newFields">
        <el-table-column
          v-if="item.options && item.options.length > 1"
          :key="item.key"
          :label="item.title"
          :prop="item.key"
          align="center"
          v-bind="item"
        >
          <template v-slot="scope">
            <el-tag size="mini" :type="getLabelType(item.options, scope.row[item.key])">
              {{ getLabel(item.options, scope.row[item.key]) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.slot"
          :key="item.key"
          v-bind="item"
          v-on="$listeners"
        >
          <template slot-scope="scope">
            <slot :name="item.key" v-bind="scope"></slot>
          </template>
        </el-table-column>
        <ba-table-column
          v-else
          :key="item.key"
          :column="item"
        />
      </template>
    </el-table>
    <div v-if="hasPagination" class="table-footer">
      <el-pagination
        background
        :disabled="loading"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getTableFields } from './core'
import BaTableColumn from './pro-table-column'
function noop() {}

export default {
  name: 'ProTable',
  components: { BaTableColumn },
  props: {
    api: {
      type: Function,
      default: noop()
    },
    data: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => {}
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    fields: {
      type: Array,
      default: () => []
    },
    handlerDataFunc: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    }
  },
  computed: {
    // 为了兼容一些方法需要取column中的property，所以需要给每一项增加prop
    newFields() {
      return getTableFields(this.fields).map(i => ({ ...i, prop: i.key }))
    },
    // 有些接口返回的数据需要做额外处理
    newList() {
      return this.handlerDataFunc ? this.handlerDataFunc(this.list) : this.list
    }
  },
  methods: {
    getData() {
      const { api, params, currentPage, pageSize, hasPagination } = this
      if (!api) return
      const filterParams = {
        ...params
      }
      if (hasPagination) {
        filterParams.page = currentPage
        filterParams.rows = pageSize
      }
      this.loading = true
      api(filterParams).then(res => {
        // 因为后端团队不同，返回的数据结构也不同，请自行处理
        if (res.status === 'success') {
          if (Array.isArray(res.data)) {
            this.list = res.data
            return
          }
          const { total, list } = res.data
          this.list = list
          this.total = total
        }
      }).finally(() => {
        this.loading = false
      })
    },

    refresh(isReset = true) {
      if (isReset) {
        this.currentPage = 1
        this.pageSize = 20
      }
      this.$nextTick(() => {
        this.getData()
      })
    },

    getSelection() {
      return this.$refs.table.selection
    },

    onSizeChange(val) {
      this.pageSize = val
      this.getData()
    },

    onCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },

    getLabel(list, id) {
      const temp = list.find(i => i.value === id)
      return temp ? temp.label : ''
    },

    getLabelType(list, id) {
      const temp = list.find(i => i.value === id)
      return temp ? temp.type : ''
    }
  }
}
</script>

<style scoped>
.table-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
