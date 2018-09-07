<template>
  <footer class="footer">
      <div class="grid-content">
        <ul>
          <li>关于网站</li>
          <li>加入我们</li>
        </ul>
        <div style="margin-top: -8px;margin-bottom: 8px">
          <span>© 2018 www.toheart.xin. All rights reserved.</span>
          <a href="http://www.miitbeian.gov.cn/"  target="_blank" style="color: #fff"> 京ICP备18028659号-1</a>
        </div>
        <div>
          联系我：邮箱：15801374807@163.com QQ：954186642
        </div>
      </div>
  </footer>
</template>
<script>
export default {
  methods: {
    beian () {
      window.location.target = '_ablank'
      window.location.href = 'http://www.miitbeian.gov.cn/'
    }
  }
}
</script>
<style>
  footer {
    margin-top: 50px;
    background-color: #545c64;
    color: #fff;
    height: 120px;
  }
  li {
    list-style:none;
    margin-top: 20px;
    display: inline-block;
    padding-right: 10px;
  }
</style>
