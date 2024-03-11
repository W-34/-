<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-header
        style="
          font-size: 40px;
          background-color: rgb(238, 241, 246);
          text-align: center;
        "
        >银行柜员页面</el-header
      >
      <el-container>
        <el-aside style="width=230px ; border: 1px solid #eee">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>操作选项</template>
              <el-menu-item index="1-1">
                <router-link to="/worker/add">开户</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/worker/work">客户服务</router-link>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <el-button class="button-container" type="danger" @click="logout()">退出</el-button>
        </el-aside>
        <el-main>
          <!-- 信息显示 -->
          <h1 style="text-align:center; color:red">{{xuanyan}}</h1>
          <br>
          <h1 style="text-align:center; color:red">{{xuanyan2}}</h1>
          <br>
          <h1 style="text-align:center; color:red">开心快乐，开启一天工作！！！</h1>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      xuanyan:"让优质服务成为工作习惯！！！",
      xuanyan2:"Dear 员工，您的工号为  "+this.$Worker_id+"  号"
    }
  },methods:{
    logout(){
      this.$router.push('/login');
    }
  }
};
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
  width: 19.55%;
  padding: 10px;
}.el-menu {
  background-color: #FFD8B5; /* 浅橙色背景颜色 */
  opacity: 0.9;
}
</style>