<template>
  <el-row :gutter="20" style="font-family: 微软雅黑;font-size: 22px;width: 70%;margin: 0 auto;letter-spacing: 2px;min-height: 670px;">
      <el-col :span="24" style="margin-top: 30px"><h2 v-text="story.storyTitle"></h2></el-col>
      <el-col :span="24" style="font-family: KaiTi;font-size: 17px;"><div><span v-text="story.storyAutor"></span> <span v-text="story.storyTime" style="margin-left: 20px;"></span></div></el-col>
      <el-col :span="24" style="text-align: left;"><div v-html="story.storyContent"></div></el-col>
  </el-row>
</template>
<script>
import { getStoryById } from '@/api/story'
export default {
  data () {
    return {
      story: getStoryById(this.$route.query.id).then(response => {
        if (response.state) {
          this.story = response.data.story
        }
      })
    }
  }
}
</script>
