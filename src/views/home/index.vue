<template>
  <el-row :gutter="80" style="margin-top: 50px">
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="13">
      <div class="grid-content bg-purple">
        <img :src="this.storynavImg" alt="故事导航图片" class="story-icon"/>
      </div>
    </el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</template>
<script>
import storynavImg from '@/assets/home/storynav.png'

export default {
  data () {
    return {
      storynavImg
    }
  }
}
</script>
<style>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
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
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .story-icon {
    border: 1px solid #CCCCCC;
    width: 100%;
  }
</style>
