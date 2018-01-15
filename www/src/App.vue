<template>
  <div id="app">
  <el-container style="">
    <el-header style="border-bottom: 1px solid #efefef; text-align: left;padding: 0;">
      <div style="background: #409eff; color: white;padding: 0 20px;line-height: 60px; font-size: 30px;"><router-link to="/">Janitor</router-link></div>
    </el-header>
    <el-container>
      <el-aside width="200px"
          style="background-color:#545c64"
        >
        <el-menu
          default-active="2"
          background-color="#545c64"
          text-color="#fff"
          style="text-align: left;"
          active-text-color="#ffd04b"
          router

          class="el-menu-vertical-demo"
          >
          <el-menu-item index="/projects">
            <i class="el-icon-location"></i>
            <span>我的项目</span>
          </el-menu-item>
          <el-menu-item index="/users">
            <i class="el-icon-setting"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
}
a{
  text-decoration: none;
  color: inherit;
}
.el-breadcrumb{
  margin-bottom: 20px;
}
.el-container{
  text-align: left;
}
.my-dialog{
  //width: 600px;
}
</style>
