<template>
  <el-table-column align="center" v-bind="column" v-on="$listeners">
    <template slot="header" slot-scope="scope">
      <free-render
        v-if="column.renderHeader"
        :scope="scope"
        :render="column.renderHeader"
      />
      <span v-else>{{ column.title }}</span>
    </template>

    <template slot-scope="scope">
      <component
        :is="column.component"
        v-if="column.component"
        v-bind="getCptBind(scope, column)"
        v-on="column.listeners"
      />

      <free-render v-else :scope="scope" :render="column.render" />
    </template>
  </el-table-column>
</template>

<script>
import FreeRender from './render'
import CellForced from './forced'
export default {
  name: 'BaTableColumn',
  components: {
    FreeRender
  },
  props: {
    column: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    column: {
      handler: 'renderColumn',
      immediate: true
    }
  },
  methods: {
    renderColumn() {
      const { column } = this
      // 多选：selection / 索引：index / 展开的按钮：expand
      if (column.type === 'selection' || column.type === 'expand') {
        column.renderHeader = CellForced[column.type].renderHeader
        column.render = column.render || CellForced[column.type].renderCell
      }
      // 格式化内容
      if (column.formatter) {
        column.render = (h, scope) => {
          return (
            <span>
              {scope.column.formatter(
                scope.row,
                scope.column,
                scope.row[scope.column.property],
                scope.$index
              )}
            </span>
          )
        }
      }
      // 渲染成text
      if (!column.render) {
        column.render = (h, scope) => {
          return <span>{scope.row[column.key]}</span>
        }
      }
      return column
    },

    getCptBind({ row, column }, col) {
      const props = { row, col, column }
      const handler = col.propsHandler
      return (handler && handler(props)) || props
    }
  }
}
</script>

<style scoped>

</style>
