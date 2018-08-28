<template>
  <div class="container">
    <div class="progress">
      <el-progress type="circle" :percentage="progress"></el-progress>
      <p class="tip-str">{{tip}}</p>
    </div>
  </div>
</template>

<script>
import images from '@/images'

export default {
  data () {
    return {
      tip: '系统预加载中...',
      done: 0,
      total: 0,
      progress: 0
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      this.total = images.length
      if (images.length === 0) {
        this.onDone()
      } else {
        images.forEach((imgUrl, i) => {
          var oImg = new Image()
          oImg.addEventListener('load', this.onLoaded)
          oImg.addEventListener('error', this.onLoaded)
          oImg.src = imgUrl
        })
      }
    },
    onLoaded () {
      // 每次图片加载完成执行，无论成功或者失败
      this.done = this.done + 1
      this.progress = parseInt(this.done * 100 / this.total)
      if (this.done >= this.total) {
        this.onDone()
      }
    },
    onDone () {
      this.tip = '加载完成'
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: table;
    text-align: center;
  }

  .progress {
    display: table-cell;
    vertical-align: middle;
  }

  .progress p {
    margin: 0;
  }

  .progress .tip-str {
    margin-top: .4em;
  }
</style>
