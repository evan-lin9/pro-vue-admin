<template>
  <div class="page-container">
    <pro-search-table
      ref="page"
      :api="api"
      :fields="fields"
    >
      <el-button
        slot="btn"
        type="primary"
        class="el-icon-plus"
        @click="onAdd"
      >
        新增
      </el-button>
    </pro-search-table>
    <pro-dialog-form
      ref="edit"
      name="用户"
      :add-api="addApi"
      :update-api="updateApi"
      :is-default-show="false"
      :fields="fields"
    />
  </div>
</template>

<script>
  import { getList, addUser, updateUser } from "./api";

  export default {
    name: "SearchTablePage",
    data() {
      return {
        api: getList,
        addApi: addUser,
        updateApi: updateUser,
        fields: [
          {
            type: 'selection'
          },
          {
            title: '操作', render: (_, {row}) => <div>
              <el-button type="text" onClick={() => this.onUpdate(row)}>编辑</el-button>
              <ba-delete-button onConfirm={() => this.onDelete(row.id)}/>
              <ba-confirm-button text="上线" onConfirm={() => this.onStatus(row.id, 'online')}/>
            </div>
          },
          {title: 'ID', key: 'id', search: {}},
          {
            title: '名称', key: 'name',
            dialog: { isRequired: true, isShow: form => !form.id }
          },
          {
            title: '类型', key: 'status', type: 'select',
            options: [
              {value: 'online', label: '上线', type: 'success'},
              {value: 'hide', label: '隐藏', type: 'info'},
              {value: 'delete', label: '删除', type: 'danger'},
            ],
            search: {},
            dialog: { isRequired: true }
          },
        ]
      }
    },
    mounted() {
      this.onInit()
    },
    methods: {
      onInit() {
        this.$refs.page.refresh()
      },
      onAdd() {
        this.$refs.edit.add().then(() => {
          this.$message.success('宇哥求三连')
          this.onInit()
        })
      },
      onUpdate(row) {
        const { id, name, status } = row
        this.$refs.edit.update({ id, name, status }).then(() => {
          this.$message.success('宇哥🐂🍺')
          this.onInit()
        })
      },
      onDelete(id) {
        console.log(id)
      },
      onStatus(id, status) {
        console.log(id, status)
      }
    }
  }
</script>
