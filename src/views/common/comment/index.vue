<template>
  <div style="margin-top: 20px;">
    <el-col :span="24" style="padding-top: 5px" v-for="commentTopList in commentList" :key="commentTopList.commentId">
      <el-col :span="3" style="text-align: left;padding-top: 10px"><img :src="commentTopList.imgUrl"  v-if="commentTopList.fatherId === 0" style="width: 50px;height: 50px;border-radius: 50%"/><div  v-if="commentTopList.fatherId !== 0" style="width: 50px;height: 50px;border-radius: 50%"></div></el-col>
      <el-col :span="21" style="padding-top: 10px;padding-bottom: 20px">
        <el-row style="font-size: 15px;">
          <el-col :span="16" style="text-align: left;color: darkorange;"><span v-text="commentTopList.userName">话梦人生</span> <span v-if="fathername !== undefined" v-text="'回复 '+ fathername"></span></el-col>
          <el-col :span="8" style="float: right;text-align: right;color: silver;font-family: 宋体" v-text="commentTopList.commentTime">2018年9月11日</el-col>
        </el-row>
        <el-row style="margin-top: 8px;">
          <el-col :span="24">
            <div @click="isShowComment(commentTopList.commentId);"  style="width: 100%;text-align: left;text-indent: 2em;font-size: 15px;font-family: 宋体" v-text="commentTopList.commentContent">123</div>
            <el-col style="margin-top: 10px;" v-show="isShow && curCommentId === commentTopList.commentId">
              <div v-if="user.userId !== ''">
                <el-input type="textarea" :rows="5" placeholder="觉得不错就说几句吧" v-model="discussContent"></el-input>
                <el-button type="primary"  style="margin-top: 10px;float: right" @click="replyComment(commentTopList.articleId,commentTopList.articleType,commentTopList.commentId);">发表评论</el-button>
              </div>
              <div v-else-if="user.userId === ''">
                <el-button type="primary"  style="margin-top: 10px;float: right" @click="login()">登录后评论</el-button>
              </div>
            </el-col>
          </el-col>
        </el-row>
        <!--<el-row style="margin-top: 26px;">-->
          <!--<el-col :span="23" style="text-align: right;">-->
            <!--<div style="float: right;">-->
              <!--<div class="icon-praise praise" style="height: 24px;margin-top: -2px;"></div><span  v-text="1" style="margin-top: -10px;display: inline-block;"></span>-->
            <!--</div>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row v-for="childs in commentTopList.child" :key="childs.commentId" style="text-align: left;margin-top: 20px;border-top: 1px dotted #ccc">-->
          <!--<div style="color: silver;padding-top: 10px">-->
            <!--<span v-text="childs.userName"></span><span> 回复 </span><span v-text="commentTopList.userName"></span>-->
            <!--<span v-text="childs.commentTime" style="float: right"></span>-->
          <!--</div>-->
          <!--<p v-text="childs.commentContent"></p>-->
        <!--</el-row>-->
      </el-col>
      <comment v-if="commentTopList.child !== null" :commentList="commentTopList.child" :fathername="commentTopList.userName"></comment>
    </el-col>
  </div>
</template>
<script>
import comment from './index.vue'
import { increaseComment, getComment } from '@/api/common'
import { mapState } from 'vuex'
export default {
  computed: mapState([
    'user'
  ]),
  data () {
    return {
      discussContent: '',
      isShow: false,
      curCommentId: 0
    }
  },
  name: 'comment',
  props: ['commentList', 'fathername'],
  components: {
    comment
  },
  methods: {
    login () {
      window.location.href = 'http://www.toheart.xin:5201/login'
    },
    getCommentList (id, type) {
      getComment(id, type).then(response => {
        if (response.state) {
          this.$emit('commentListChange', response.data.commentList)
        }
      })
    },
    replyComment (id, type, fatherId) {
      increaseComment(id, type, fatherId, this.discussContent).then(response => {
        this.getCommentList(id, type)
        this.isShow = false
        this.discussContent = ''
        console.log('-------')
      })
    },
    isShowComment (id) {
      console.log(id)
      this.curCommentId = id
      if (this.isShow) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  }
}
</script>
