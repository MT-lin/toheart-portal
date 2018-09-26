<template>
  <el-row :gutter="80" style="margin-top: 50px">
    <el-col :span="3"><div class="grid-content"></div></el-col>
    <el-col :span="13">
      <div class="grid-content bg-purple" style="margin-bottom: 20px">
        <img :src="this.storynavImg" alt="故事导航图片" class="story-icon"/>
      </div>
      <el-row :gutter="10" v-for="story in storyList" :key="'story' + story.storyId" class="storyClass" style="margin-left: 0;margin-right: 0">
        <el-col :xs="8" :sm="6" :md="4" :lg="6"><img :src="story.storyImgUrl" class="storyImg"/></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="18" >
          <div style="height: 120px">
            <router-link :to="{name:'story/show',query:{id: story.storyId }}" style="color:#000;text-decoration: none">
             <h2 class="title grid-content" v-text="story.storyTitle"></h2>
            </router-link>
            <div v-text="story.storyBrief" class="story-content"></div>
          </div>
          <div class="story-every-bottom">
            <span class="icon-autor autor" v-text="story.storyAutor"></span>
            <span class="icon-praise praise" v-text="story.storyZan"></span>
            <span class="icon-comment comment" v-text="story.storyCommentNum">20</span>
          </div>
        </el-col>
      </el-row>
      <div class="grid-content bg-purple" style="margin-bottom: 20px;margin-top: 50px">
        <img :src="this.confessionImg" alt="告白导航图片" class="story-icon"/>
      </div>
      <el-row v-for="confession in confessionList" :key="'confession' + confession.confessorId" style="min-height: 150px;border: 1px solid #CCC">
        <el-col :span="24">
          <div class="" v-text="confession.confessionContent" style="margin-top: 30px;text-align: left;margin-left: 50px;text-indent: 2em;min-height: 100px"></div>
          <el-row :gutter="20" style="position: relative;bottom: 0px;">
            <el-col :span="3">
              <router-link :to="{name:'confession/show',query:{id: confession.confessorId }}" style="color:#000;text-decoration: none">
                <div class="grid-content ">详情</div>
              </router-link>
            </el-col>
            <el-col :span="3"><div class="grid-content "><img :src="favoritesImg" style="width: 20px;height: 20px;"/> <span v-text="confession.confessionLike" style="font-size: 20px;color: silver;"></span></div></el-col>
            <el-col :span="5" :offset="9"><div class="grid-content" v-text="'--- ' + confession.userName"></div></el-col>
            <el-col :span="3"><div class="grid-content" v-text="confession.confessionTime"></div></el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">
      <div  style="text-align: left;border: 1px solid silver;border-radius: 5%;">
        <p v-text="favConfession.confessionContent" style="text-indent: 2em;"></p>
        <div v-text="'--- ' + favConfession.userName" style="padding-left: 70%;padding-bottom: 15px"></div>
      </div>
      <el-row :gutter="20" style="margin-top: 50px">
        <el-col :span="10">
          <img :src="dyhImg" style="width: 100%"/>
        </el-col>
        <el-col :span="12"><div style="text-align: left;margin-top: 15px;">关注许我倾心订阅号,获取更多精彩信息!!!</div></el-col>
      </el-row>
      <el-row :gutter="20" style="border: 1px solid silver;margin-top: 50px; padding-bottom: 20px;border-radius: 5%;">
        <el-col :span="23"><div class="grid-content" style="margin-top: 15px;border-bottom: 1px solid silver">精彩故事推荐</div></el-col>
        <el-row :gutter="20" v-for="splendidStory in splendidStoryList" :key="'splendidStory' + splendidStory.storyId" style="margin-left: 2px">
         <el-col :span="23">
           <div class="grid-content " style="margin-top: 10px;border-bottom: 1px solid silver; text-align: left" >
             <span v-text="'['+ splendidStory.storyAutor +']'"></span>
             <router-link :to="{name:'story/show',query:{id: splendidStory.storyId }}" style="color:#000;text-decoration: none">
              <p v-text="splendidStory.storyTitle" style="display: inline-block"></p>
             </router-link>
           </div>
         </el-col>
        </el-row>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import storynavImg from '@/assets/home/storynav.png'
import dyhImg from '@/assets/home/dyhImg.jpg'
import confessionImg from '@/assets/home/biaobainav.png'
import favoritesImg from '@/assets/icon/favorites.png'
import { getStoryList, getSplendidStory } from '@/api/story'
import { getConfessionList, getFavConfession } from '@/api/confession'
export default {
  data () {
    return {
      storynavImg,
      confessionImg,
      favoritesImg,
      dyhImg,
      favConfession: '',
      storyList: null,
      confessionList: null,
      splendidStoryList: null
    }
  },
  created () {
    getStoryList(1, 5).then(response => {
      if (response.state) {
        this.storyList = response.data.storyList
      }
    })
    getConfessionList(1, 5).then(response => {
      if (response.state) {
        this.confessionList = response.data.confessionList
      }
    })
    getFavConfession().then(response => {
      if (response.state) {
        this.favConfession = response.data.farConfession
      }
    })
    getSplendidStory().then(response => {
      if (response.state) {
        this.splendidStoryList = response.data.storySplendidList
      }
    })
  }
}
</script>
<style>
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .story-icon {
    border: 1px solid #CCCCCC;
    width: 100%;
  }

  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .storyImg {
    width: 100%;
    height: 180px;
  }
  .storyClass {
    width: 100%;
    border: 1px solid #CCC;
  }
  .title {
    margin-top: 20px;
    font-family: '宋体';
  }
  .story-content {
    text-align: left;
    margin-left: 15px;
  }
  .icon-autor {
    float: left;
    background-image: url('../../assets/icon/iconAutor.png');
    background-repeat: no-repeat;
    background-size: 20px;
  }
  .autor ,.praise ,.comment{
    margin-left: 20px;
    padding-left: 24px;
    margin-top: 5px;
    color: #4e4c4c;
  }
  .icon-praise {
    float: left;
    background-image: url(../../assets/icon/iconPraise.png);
    background-repeat: no-repeat;
    background-size: 20px;
  }
  .icon-comment {
    float: left;
    background-image: url(../../assets/icon/iconComment.png);
    background-repeat: no-repeat;
    background-size: 20px;
  }
</style>
