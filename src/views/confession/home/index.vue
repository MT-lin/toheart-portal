<template>
  <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content"></div></el-col>
    <el-col :span="12" style="margin-top: 50px;">
      <div  style="margin-bottom: 20px">
        <img :src="this.confessionImg" alt="告白导航图片" style="border: 1px solid silver;width: 100%;"/>
      </div>
      <el-row v-for="confession in confessionList" :key="confession.confessionId" style="padding-top: 20px;">
        <el-col :span="24" style="border-bottom: 1px dotted #ccc">
          <el-col :span="24">
            <el-row style="font-size: 15px;">
              <el-col :span="2" style="text-align: left;"><img :src="confession.imgUrl" style="width: 50px;height: 50px;border-radius: 100%"/></el-col>
              <el-col :span="6" style="text-align: left;color: darkorange" v-text="confession.userName">话梦人生</el-col>
              <el-col :span="18" style="padding-top:7px;text-align: left;color: silver;font-family: 宋体" v-text="confession.confessionTime">2018年9月11日</el-col>
            </el-row>
            <el-row style="margin-top: 8px;">
              <el-col :span="24">
                <div class="content" v-text="confession.confessionContent">123</div>
              </el-col>
              <el-col :span="24" style="max-width: 80%;margin-top: 20px;">
                <img :src="confession.confessionImgUrl"/>
              </el-col>
            </el-row>
            <el-row style="margin-top: 26px;">
              <el-col :span="23" style="text-align: right;padding-left: 80px">
                <div style="float: left;padding-bottom: 20px"  @click="likeNum(confession.confessorId)" v-if="user.userId !== ''">
                  <div class="icon-praise praise" style="margin-top:-2px;height: 24px;"></div><span  v-text="confession.confessionLike" style="margin-top: -10px;display: inline-block;font-size: 20px;padding-left: 5px"></span>
                </div>
                <div style="float: left;padding-bottom: 20px"  @click="login();" v-if="user.userId === ''">
                  <div class="icon-praise praise" style="margin-top:-2px;height: 24px;"></div><span  v-text="confession.confessionLike" style="margin-top: -10px;display: inline-block;font-size: 20px;padding-left: 5px"></span>
                </div>
                <div style="float: left;">
                  <router-link :to="{name:'confession/show',query:{id: confession.confessorId }}" style="color:#000;text-decoration: none">
                    <div class="icon-discuss praise"  style="margin-top:-2px;height: 24px;"></div><span v-text="confession.confessionCommentNum"  style="margin-top: -10px;display: inline-block;font-size: 20px;padding-left: 5px"></span>
                  </router-link>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-col>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
         style="margin-top: 50px;text-align: left">
      </el-pagination>
    </el-col>
    <el-col :span="6" style="margin-top: 100px">
      <div v-if="user.userId !== ''">
        <router-link :to="{name:'confession/write'}">
          <el-button type="primary" style="width: 150px;height: 50px;font-size: 22px">去告白</el-button>
        </router-link>
      </div>
      <div v-if="user.userId === ''">
        <el-button type="primary" style="width: 150px;height: 50px;font-size: 22px"  @click="login();">去告白</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import dyhImg from '@/assets/home/dyhImg.jpg'
import testImg from '@/assets/1.jpg'
import { getConfessionList } from '@/api/confession'
import { increaseZan } from '@/api/common'
import confessionImg from '@/assets/home/biaobainav.png'
import { mapState } from 'vuex'
export default {
  computed: mapState([
    'user'
  ]),
  data () {
    return {
      testImg,
      confessionImg,
      dyhImg,
      confessionList: [],
      currentPage: 1,
      totalCount: 0,
      pageSize: 5
    }
  },
  created () {
    getConfessionList(1, 5).then(response => {
      console.log(response.data)
      if (response.state) {
        this.confessionList = response.data.confessionList
        this.totalCount = response.data.total
      }
    })
  },
  methods: {
    login () {
      window.location.href = 'http://www.toheart.xin:5201/login'
    },
    likeNum (id) {
      increaseZan(id, 2).then(response => {
        if (response.state) {
          getConfessionList(this.currentPage, this.pageSize).then(response => {
            console.log(response.data)
            if (response.state) {
              this.confessionList = response.data.confessionList
              this.totalCount = response.data.total
            }
          })
        }
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      getConfessionList(this.currentPage, val).then(response => {
        if (response.state) {
          this.confessionList = response.data.confessionList
          this.totalCount = response.data.total
        }
      })
    },
    handleCurrentChange (val) {
      getConfessionList(val, this.pageSize).then(response => {
        if (response.state) {
          this.confessionList = response.data.confessionList
          this.totalCount = response.data.total
        }
      })
    }
  }
}
</script>
<style>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .praise {
    margin-left: 20px;
    padding-left: 24px;
    margin-top: 5px;
    color: #4e4c4c;
  }
  .icon-praise {
    float: left;
    background-image: url(../../../assets/icon/iconPraise.png);
    background-repeat: no-repeat;
    background-size: 20px;
  }
  .icon-discuss {
    float: left;
    background-image: url(../../../assets/icon/discuss.png);
    background-repeat: no-repeat;
    background-size: 25px;
  }
  .content{
    width: 80%;text-align: left;letter-spacing:3px;line-height:25px;padding-left: 80px;text-indent: 2em;font-size: 15px;font-family: 微软雅黑
  }
</style>
