<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-header
        style="
          font-size: 40px;
          background-color: rgb(238, 241, 246);
          text-align: center;
        "
        >管理员页面</el-header
      >
      <el-container>
        <el-aside style="width=230px ; border: 1px solid #eee">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>操作选项</template>
              <el-menu-item index="1-1">
                <router-link to="/master/worker">银行职员管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/master/trade">交易记录管理</router-link>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <el-button class="button-container" type="danger" @click="logout()">退出</el-button>
        </el-aside>
        <el-main>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="交易类型">
                    <el-select v-model="formInline.region" placeholder="交易类型">
                    <el-option label="支出" value="out"></el-option>
                    <el-option label="收入" value="in"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submit()">重置</el-button>
                </el-form-item>
            </el-form>
          <!-- 交易信息显示 -->
          <el-table :data="tableData" border>
            <el-table-column prop="tradeDate" label="日期" width="300">
            </el-table-column>
            <el-table-column prop="cardID" label="日期" width="300">
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
        tableData: [],//获取交易表记录
        formInline: {
            region: ''
        }
    };
  },
  methods: {
    onSubmit(){
      console.log(this.formInline.region)
      this.$axios.get('/api/trade_query/',{
        params:{
          type:this.formInline.region
        }
      }).then(
        result=>{
          console.log(result.data)
          this.tableData=result.data.data
          this.formInline.region=''
        }
      )
    },
    submit(){
      this.$axios.get('/api/get_trade/').then(
      result=>{
        console.log(result.data);
        this.tableData=result.data.data;
      }
    )
    },
    logout(){
      this.$router.push('/login');
    }
  },
  mounted() {
    this.submit()
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
  width: 20%;
  padding: 10px;
}
.el-menu {
  background-color: #FFD8B5; /* 浅橙色背景颜色 */
  opacity: 0.9;
}
</style>