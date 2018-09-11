<template>
  <el-row :gutter="20" style="font-family: 微软雅黑;font-size: 22px;width: 50%;margin: 0 auto;letter-spacing: 2px;min-height: 670px;">
      <el-col :span="24" style="margin-top: 30px"><h2 v-text="story.storyTitle"></h2></el-col>
      <el-col :span="24" style="font-family: KaiTi;font-size: 17px;"><div><span v-text="story.storyAutor"></span> <span v-text="story.storyTime" style="margin-left: 20px;"></span></div></el-col>
      <el-col :span="24" style="text-align: left;"><div v-html="story.storyContent"></div></el-col>
      <el-col :span="24">
        <div>
          <div style="float: right;font-size: 17px;"><span>阅读<span>10</span></span></div>
          <div style="float: left;" @click="likeNum();"><div class="icon-praise praise" style="height: 24px;"></div><span  v-text="story.storyZan" style="margin-top: -10px;display: inline-block;"></span></div>
        </div>
      </el-col>
  </el-row>
</template>
<script>
import { getStoryById } from '@/api/story'
import { increaseZan } from '@/api/common'
export default {
  data () {
    return {
      story: getStoryById(this.$route.query.id).then(response => {
        if (response.state) {
          this.story = response.data.story
        }
      })
    }
  },
  methods: {
    likeNum () {
      increaseZan(this.story.storyId, 1).then(response => {
        if (response.state) {
          this.story.storyZan = response.data.praiseNum
        }
      })
    }
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
