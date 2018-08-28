<template>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      >
      <el-menu-item index="1" style="margin-left:6%;">首页</el-menu-item>
      <el-menu-item index="2">故事</el-menu-item>
      <el-menu-item index="3">表白墙</el-menu-item>
      <el-menu-item index="4">轻松一刻</el-menu-item>
      <el-menu-item index="5" style="margin-left:50%;">
        <el-form :inline="true" class="demo-form-inline" style="margin-top:10px;">
          <el-form-item>
            <el-input placeholder="20岁那年"></el-input>
          </el-form-item>
          <el-form-item>
            <span class="el-icon-search"></span>
          </el-form-item>
        </el-form>
      </el-menu-item>
      <el-menu-item index="6">
        <a href="#" class="btn-login">QQ登录</a>
      </el-menu-item>
    </el-menu>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
  .btn-login{
      display: inline-block;
      width: 60px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      color: #CCCCCC;
      border: 1px solid #CCCCCC;
      border-radius: 20%;
      text-decoration: none;
  }
</style>
