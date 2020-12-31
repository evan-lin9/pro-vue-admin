<template>
  <div class="pro-search-demo-container">
    <el-card :body-style="{  background: '#B3C0D1' }">
      <div slot="header">普通用法</div>
      <pro-search
        :fields="fields1"
        @submit="onSearch"
        @reset="onReset"
      />
    </el-card>
    <el-card :body-style="{  background: '#B3C0D1' }">
      <div slot="header">如果 fields 中，存在 datetimerange，radio 类型，请不要放在最后一个位置，否则会出现布局错乱</div>
      <pro-search
        :fields="fields2"
      />
    </el-card>
    <el-card :body-style="{  background: '#B3C0D1' }">
      <div slot="header">调整位置可解决上诉问题</div>
      <pro-search
        :fields="fields3"
      />
    </el-card>
    <el-card :body-style="{  background: '#B3C0D1' }">
      <div slot="header">当fields span 总和超过18时开启折叠效果</div>
      <pro-search
        :fields="fields4"
      />
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "SearchPage",
    data() {
      return {
        fields1: [
          {
            title: '用户名',
            key: 'username',
          },
          {
            title: '年龄',
            key: 'age',
            type: 'inputNumber',
            search: {}
          }
        ],
        fields2: [
          {
            title: '用户名',
            key: 'username',
            
          },
          {
            title: '年龄',
            key: 'age',
            type: 'inputNumber',
            search: {}
          },
          {
            title: '性别',
            key: 'sex',
            type: 'radio',
            options: [
              { label: '男', value: 1 },
              { label: '女', value: 2 }
            ],
            search: {}
          },
          {
            title: '时间',
            key: 'time',
            type: 'datetime',
            span: 10,
            search: {
              props: { type: 'datetimerange' }
            }
          },
        ],
        fields3: [
          {
            title: '用户名',
            key: 'username',
            
          },
          {
            title: '性别',
            key: 'sex',
            type: 'radio',
            options: [
              { label: '男', value: 1 },
              { label: '女', value: 2 }
            ],
            search: {}
          },
          {
            title: '年龄',
            key: 'age',
            type: 'inputNumber',
            search: {}
          },
          {
            title: '时间',
            key: 'time',
            type: 'datetime',
            span: 10,
            search: {
              props: { type: 'datetimerange' }
            }
          },
        ],
        fields4: [
          {
            title: '用户名',
            key: 'username',
            
          },
          {
            title: '年龄',
            key: 'age',
            type: 'inputNumber',
            isRequired: true,
            search: {}
          },
          {
            title: 'a',
            key: 'a',
            
          },
          {
            title: 'b',
            key: 'b',
            
          },
          {
            title: 'c',
            key: 'c',
            
          },
          {
            title: 'd',
            key: 'd',
            
          },
          {
            title: 'e',
            key: 'e',
            
          },
        ],
      }
    },
    methods: {
      onSearch(form) {
        console.log(form)
      },
      onReset() {
        this.$message.success('重置成功')
      }
    }
  }
</script>

<style lang="scss">
  .pro-search-demo-container {
    .el-card {
      margin-bottom: 18px;
    }
  }
</style>
