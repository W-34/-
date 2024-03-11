<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-header
        style="
          font-size: 40px;
          background-color: rgb(238, 241, 246);
          text-align: center;
        "
        >管理员页面
      </el-header>
      <el-container>
        <el-aside style="width=230px ; border: 1px solid #eee">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>操作选项</template>
              <el-menu-item index="1-1">
                <router-link to="/master/model-manage">模型管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/master/trade">待新增选项</router-link>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <el-button class="button-container" type="danger" @click="logout()">退出</el-button>
        </el-aside>
        <el-main>
            <h1 style="text-align:center; color: red ">{{message}}</h1>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
data() {
    return {
        message:"Default Working Page"
    }
},
methods:{
  
    logout(){
      this.$router.push('/login');
    }
}
}
</script>

<style>
body {
  background-color: skyblue;
  opacity: 0.7;
}
.button-container {
  position: absolute;
  bottom: 1;
  left: 1;
  width: 20%;
  padding: 10px;
}
.el-menu {
  background-color: #FFD8B5; /* 浅橙色背景颜色 */
  opacity: 0.9;
}.el-header{
  background-color: #f2e088; /* 设置背景颜色为淡黄色 */
  opacity: 0.9;
}
</style>