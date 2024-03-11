<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-header
        style="
          font-size: 40px;
          background-color: rgb(238, 241, 246);
          text-align: center;
        "
        >用户页面</el-header
      >
      <el-container>
        <el-aside style="width=230px ; border: 1px solid #eee">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>操作选项</template>
              <el-menu-item index="1-1">
                <router-link to="/user">主界面</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/user/card">银行卡管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/user/trade">交易管理</router-link>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <el-button class="button-container" type="danger" @click="logout()">退出</el-button>
        </el-aside>
        <el-main>
            <!-- 交易信息显示 -->
          <el-table :data="tableData" border>
            <el-table-column prop="tradeDate" label="日期" width="300">
            </el-table-column>
            <el-table-column prop="cardID" label="卡号" width="220">
            </el-table-column>
            <el-table-column prop="tradeType" label="类型" width="220">
            </el-table-column>
            <el-table-column prop="tradeMoney" label="金额" width="220">
            </el-table-column>
          </el-table>
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
      formInline: {
            region: ''
        },
    };
  },
  methods: {
    logout(){
      this.$router.push('/login');
    },
    show(){
      this.$axios.get("/api/getTrade/",{
        params:{
          id:this.$User_id
        }
      }).then(result=>{
        console.log(result.data)
        this.tableData=result.data.data
      })
    }
  },
  mounted() {
    this.show()

  },
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