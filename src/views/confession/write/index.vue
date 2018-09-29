<template>
  <div style="width: 50%;min-height: 570px;margin: 0 auto;margin-top: 100px;">
    <div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 18, maxRows: 20}"
        placeholder="展示真实的想法吧"
        v-model="content"
      style="float: left;width: 60%">
      </el-input>
      <div style="width: 30%;float: left;padding-left: 25px;padding-top: 20px;">
          <div style="text-align: left;padding-left: 20px">告白须知</div>
          <div class="notice" style=" ">1、请真诚的去告白</div>
          <div class="notice" style="">2、请勿发不良信息，不发关于政治、色情、广告等信息</div>
          <div class="notice" style="padding-bottom:10px;border-bottom: 1px dotted silver; ">3、用于请文明用语</div>
          <div style="margin-top: 80px;text-align: left;">
            <el-button type="primary" style="width: 150px;height: 50px;font-size: 22px" @click="publish();">告 白</el-button>
          </div>
      </div>
    </div>
    <div style="clear: both;padding-top: 10px">
      <div  style="text-align: left;margin-left: 10px;">
        <el-upload
          class="upload-demo"
          action="http://www.toheart.xin:5201/pic/upload"
          :on-success="handleChange"
          :before-upload="beforeAvatarUpload"
          :disabled="isDisable">
          <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" style="display: inline-block;padding-left: 20px;">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </div>
      </div>
  </div>

</template>
<script>
import { addConfession } from '@/api/confession'
import { mapState } from 'vuex'
export default {
  computed: mapState([
    'user'
  ]),
  data () {
    return {
      content: '',
      fileList: [],
      isUpload: false,
      confessionImgUrl: '',
      isDisable: false
    }
  },
  methods: {
    publish () {
      const data = {
        userId: this.user.userId,
        confessionContent: this.content,
        confessionImgUrl: this.confessionImgUrl
      }
      console.log(data)
      addConfession(data).then(response => {
        if (response.state) {
          this.$router.push({name: 'confession/home'})
        }
      })
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
        this.$message.error('图片上传格式只能是 JPG PNG JPEG格式!')
      }
      if (!isLt2M) {
        this.$message.error('图片上传大小不能超过 2MB!')
      }
      this.isUpload = isJPG && isLt2M
      return isJPG && isLt2M
    },
    handleChange (file, fileList) {
      this.isDisable = true
      this.confessionImgUrl = fileList.response.data
    }
  }
}
</script>
<style>
  .notice {
    text-align: left;
    margin-top: 15px;
    padding-top:15px;
    padding-left: 5px;
    border-top: 1px dotted silver;
  }

</style>
