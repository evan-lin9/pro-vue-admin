<template>
  <div id="app">
    <el-container>
      <el-header>
        代码地址：<a href="https://github.com/SkyLin0909/pro-vue-admin">https://github.com/SkyLin0909/pro-vue-admin</a>
      </el-header>
      <el-container>
        <el-aside style="width: 140px">
          <el-menu
            :default-active="componentName"
            background-color="#545c64"
            active-text-color="#ffd04b"
          >
            <el-menu-item
              index="FormPage"
              @click="() => onClickMenu('FormPage')"
            >
              pro-form
            </el-menu-item>
            <el-menu-item
              index="SearchPage"
              @click="() => onClickMenu('SearchPage')"
            >
              pro-search
            </el-menu-item>
            <el-menu-item>pro-table</el-menu-item>
            <el-menu-item>pro-dialog-form</el-menu-item>
            <el-menu-item>pro-search-table</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <component
            :is="componentName"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import FormPage from './pages/form-page'
  import SearchPage from './pages/search-demo'

  export default {
    name: 'App',
    components: { FormPage, SearchPage },
    data() {
      return {
        componentName: 'FormPage'
      }
    },
    methods: {
      onClickMenu(name) {
        this.componentName = name
      }
    }
  }
</script>

<style lang="scss">
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>
