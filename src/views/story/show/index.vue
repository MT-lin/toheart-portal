<template>
  <el-row :gutter="20" style="font-family: 微软雅黑;font-size: 22px;width: 50%;margin: 0 auto;letter-spacing: 2px;min-height: 670px;">
      <el-col :span="24" style="margin-top: 30px"><h2 v-text="story.storyTitle"></h2></el-col>
      <el-col :span="24" style="font-family: KaiTi;font-size: 17px;"><div><span v-text="story.storyAutor"></span> <span v-text="story.storyTime" style="margin-left: 20px;"></span></div></el-col>
      <el-col :span="24" style="text-align: left;"><div v-html="story.storyContent"></div></el-col>
      <el-col :span="24">
        <div>
          <div style="float: right;font-size: 17px;"><span>阅读<span>10</span></span></div>
          <div style="float: left;" @click="likeNum();" v-if="user.userId !== ''"><div class="icon-praise praise" style="height: 24px;"></div><span  v-text="story.storyZan" style="margin-top: -10px;display: inline-block;"></span></div>
          <div style="float: left;" @click="login();" v-if="user.userId === ''"><div class="icon-praise praise" style="height: 24px;"></div><span  v-text="story.storyZan" style="margin-top: -10px;display: inline-block;"></span></div>
        </div>
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
</template>
<script>
import { getStoryById } from '@/api/story'
import { increaseZan, getComment, increaseComment } from '@/api/common'
import dyhImg from '@/assets/home/dyhImg.jpg'
import comment from '@/views/common/comment/index.vue'
import { mapState } from 'vuex'
export default {
  computed: mapState([
    'user'
  ]),
  data () {
    return {
      dyhImg,
      story: getStoryById(this.$route.query.id).then(response => {
        if (response.state) {
          this.story = response.data.story
        }
      }),
      activeName2: 'first',
      commentList: [],
      discussContent: ''
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
    likeNum () {
      increaseZan(this.story.storyId, 1).then(response => {
        if (response.state) {
          this.story.storyZan = response.data.praiseNum
        }
      })
    },
    discuss () {
      const id = this.story.storyId
      const type = 1
      const content = this.discussContent
      increaseComment(id, type, 0, content).then(response => {
        if (response.state) {
          this.discussContent = ''
          this.getCommentList(this.$route.query.id, 1)
          console.log('------------')
        }
      })
    }
  },
  created () {
    this.getCommentList(this.$route.query.id, 1)
  }
}
</script>
<style>
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
</style>
