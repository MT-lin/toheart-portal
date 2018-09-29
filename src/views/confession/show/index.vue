<template>
  <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content"></div></el-col>
    <el-col :span="12" style="margin-top: 50px;background-color: #EFECEC;">
      <el-row style="padding-top: 20px;width: 80%;margin: 50px auto;">
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
              <el-col :span="24" style="margin-top: 20px;">
                <img :src="confession.confessionImgUrl" style="max-width: 80%;"/>
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
                <!--<div style="float: left;">-->
                  <!--<div class="icon-discuss praise"  style="margin-top:-2px;height: 24px;"></div>-->
                <!--</div>-->
              </el-col>
            </el-row>
          </el-col>
        </el-col>
        <el-col style="margin-top: 50px;">
          <div v-if="user.userId !== ''">
            <el-input type="textarea" :rows="5" placeholder="觉得不错就说几句吧" v-model="discussContent"></el-input>
            <el-button type="primary"  style="margin-top: 10px;float: right" @click="discuss();">发表评论</el-button>
          </div>
          <div v-else-if="user.userId === ''">
            <el-button type="primary"  style="margin-top: 10px;float: right" @click="login();">登录后评论</el-button>
          </div>
        </el-col>
        <el-col>
          <el-tabs v-model="activeName2" type="card">
            <el-tab-pane label="评论" name="first">
            </el-tab-pane>
          </el-tabs>
          <comment :commentList = "commentList" @commentListChange="changeCommentList"></comment>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6" style="margin-top: 80px"></el-col>
  </el-row>
</template>
<script>
import { getConfessionById } from '@/api/confession'
import testImg from '@/assets/1.jpg'
import dyhImg from '@/assets/home/dyhImg.jpg'
import { increaseZan, increaseComment, getComment } from '@/api/common'
import comment from '@/views/common/comment/index.vue'
import { mapState } from 'vuex'
export default {
  computed: mapState([
    'user'
  ]),
  data () {
    return {
      dyhImg,
      testImg,
      activeName2: 'first',
      confession: getConfessionById(this.$route.query.id).then(response => {
        if (response.state) {
          this.confession = response.data.confession
        }
      }),
      discussContent: '',
      commentList: []
    }
  },
  components: {
    comment
  },
  methods: {
    login () {
      window.location.href = 'http://www.toheart.xin:5201/login'
    },
    changeCommentList (data) {
      this.commentList = data
    },
    getCommentList (id, type) {
      getComment(id, type).then(response => {
        if (response.state) {
          this.commentList = response.data.commentList
          console.log(response.data.commentList)
        }
      })
    },
    likeNum (id) {
      console.log('---------------')
      this.$session.start()
      console.log(this.$session.get('current_user'))
      increaseZan(id, 2).then(response => {
        if (response.state) {
          this.confession.confessionLike = response.data.praiseNum
        }
      })
    },
    discuss () {
      const id = this.confession.confessorId
      const type = 2
      const content = this.discussContent
      increaseComment(id, type, 0, content).then(response => {
        if (response.state) {
          this.discussContent = ''
          this.getCommentList(this.$route.query.id, 2)
          console.log('------------')
        }
      })
    }
  },
  created () {
    this.getCommentList(this.$route.query.id, 2)
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
    width: 80%;text-align: left;padding-left: 80px;letter-spacing:3px;line-height:25px;text-indent: 2em;font-size: 15px;font-family: 微软雅黑
  }
</style>
