<template>
  <div class="pro-form-demo-container">
    <el-card :body-style="{  background: '#B3C0D1' }">
      <div slot="header">普通用法</div>
      <pro-form
        :fields="fields1"
        label-width="100px"
        @submit="onSubmit"
      />
    </el-card>
    <el-button @click="visible = true">打开</el-button>
    <test v-model="visible">
      adasdsd
    </test> 
  </div>
</template>

<script>
import test from '@/components/pro-dialog'
  export default {
    name: "FormPage",
    components: { test },
    data() {
      return {
        visible: false,
        fields1: [
          {
            key: 'name',
            title: '用户名',
            isRequired: true
          },
          {
            key: 'publishTime',
            title: '发布时间',
            type: 'datetime',
            isRequired: true
          },
          {
            key: 'activeTime',
            title: '活动时间',
            type: 'datetime',
            props: {
              type: 'datetimerange'
            }
          },
          {
            key: 'moreConditions',
            title: '更多条件',
            type: 'selectInput',
            options: {
              a: 1,
              b: 2,
              c: 3
            }
          }
        ]
      }
    },
    methods: {
      onSubmit(form, valid) {
        const { moreConditions, ...rest } = form
        //recude报错->moreCoditions未成功获取值或者没判断为undefined的情况
        const temp = moreConditions
          .reduce((obj, item) => ({ ...obj, [item.key]: item.value}), {})
        this.$message.info(`校验结果：${valid} 表单数据：` + JSON.stringify({
          ...rest, ...temp
        }))
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
