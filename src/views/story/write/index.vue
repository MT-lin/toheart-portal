<template>
  <el-row :gutter="20" style="margin-top: 80px;">
    <el-col :span="5" style="text-align: right">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:5201/pic/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="storyImgUrl" :src="storyImgUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-input v-model="storyTitle" placeholder="请输入标题" style="width: 50%;margin-top: 20px;"></el-input>
      <el-input v-model="storyAutor" placeholder="请输入作者" style="width: 50%;margin-top: 10px;"></el-input>
      <el-input type="textarea" v-model="storyBrief" placeholder="请输入故事简介" :rows="5" style="width: 50%;margin-top: 10px;">></el-input>
      <el-button type="primary" style="width: 50%;margin-top: 10px;" @click="saveStory();">发表</el-button>
    </el-col>
    <el-col :span="16"> <vue-html5-editor :content="content" :height="800" :show-module-name="true" @change="updateData"></vue-html5-editor></el-col>
  </el-row>
</template>
<script>
import { saveStory } from '@/api/story'
export default {
  data () {
    return {
      storyImgUrl: '',
      content: '',
      storyTitle: '',
      storyAutor: '',
      storyBrief: ''
    }
  },
  methods: {
    updateData (data) {
      this.content = data
    },
    saveStory () {
      const data = {
        storyImgUrl: this.storyImgUrl,
        storyContent: this.content,
        storyTitle: this.storyTitle,
        storyAutor: this.storyAutor,
        storyBrief: this.storyBrief
      }
      saveStory(data).then(response => {
        if (response.state) {
          this.$router.push({ name: 'story/home' })
        }
      })
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      console.log(file)
      this.storyImgUrl = res.data
    },
    beforeAvatarUpload (file) {
      const fileType = ['image/png', 'image/jpg', 'image/jpeg']
      var isJPG = true
      if (fileType.indexOf(file.type) < 0) {
        isJPG = false
      } else {
        isJPG = true
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG PNG JPEG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
