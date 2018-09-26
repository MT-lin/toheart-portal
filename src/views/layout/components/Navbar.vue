<template>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      >
     <el-menu-item index="1" style="margin-left:10%;" :route="{name:'home'}">
         首页
     </el-menu-item>
      <el-menu-item index="2" :route="{name:'story/home'}">
         故事
      </el-menu-item>
      <el-menu-item index="3" :route="{name:'confession/home'}">表白墙</el-menu-item>
     <!-- <el-menu-item index="4">轻松一刻</el-menu-item> -->
      <el-menu-item style="margin-left:45%;" :disable="true">
        <el-form :inline="true" class="demo-form-inline" style="margin-top:10px;">
          <el-form-item>
            <el-input placeholder="20岁那年"></el-input>
          </el-form-item>
          <el-form-item>
            <span class="el-icon-search"></span>
          </el-form-item>
        </el-form>
      </el-menu-item>
      <el-menu-item>
       <span  v-text="'欢迎 ' + user.userName" v-if="user.userId !== ''"></span>
      </el-menu-item>
      <el-menu-item>
        <a  class="btn-login" @click="login();" v-if="user.userId === '' || user.userId === null">QQ登录</a>
        <a  class="btn-login" @click="userLogout();" v-else-if="user.userId !== ''">退出登录</a>
      </el-menu-item>
    </el-menu>
</template>
<script>
import { getUser, logout } from '@/api/home'
import { mapState } from 'vuex'
export default {
  computed: mapState([
    'user'
  ]),
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(111111111111111)
      console.log(key)
    },
    login () {
      window.location.href = 'http://www.toheart.xin:5201/login'
    },
    userLogout () {
      logout().then(response => {
        if (response.state) {
          const data = {
            userId: '',
            userName: '',
            gender: '',
            province: '',
            city: '',
            birthday: '',
            imgUrl: ''
          }
          this.$store.commit('SET_USER', data)
          this.$router.push('home')
        }
      })
    }
  },
  created () {
    getUser().then(response => {
      if (response.state) {
        const data = {
          userId: response.data.user.userId,
          userName: response.data.user.userName,
          gender: response.data.user.gender,
          province: response.data.user.province,
          city: response.data.user.city,
          birthday: response.data.user.birthday,
          imgUrl: response.data.user.imgUrl
        }
        this.$store.commit('SET_USER', data)
      }
    })
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
