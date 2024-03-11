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
          <!-- 信息显示 -->
          <el-table :data="tableData" raw-key="cardID" border>
            <el-table-column prop="cardID" label="银行卡号" width="240">
            </el-table-column>
            <el-table-column prop="openDate" label="开户日期" width="220">
            </el-table-column>
            <el-table-column prop="balance" label="余额" width="220">
            </el-table-column>
            <el-table-column prop="customerID" label="用户id" width="220">
            </el-table-column>
            <el-table-column fixed="right" label="操作" >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="ex_trade(scope.row.cardID)">转账</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog :visible.sync="showFormModal">
              <el-form>
                <el-form-item label="转账账户">
                  <el-input v-model=both.to placeholder="请输入要转账的账户"></el-input>
                </el-form-item>
                <el-form-item label="转账金额">
                  <el-input v-model=both.money placeholder="请输入转账金额"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="trade_both()">提交</el-button>
                </el-form-item>
              </el-form>
          </el-dialog>


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
      showFormModal:false,
      both:{
        from:'',
        to:'',
        money:''
      }
    };
  },
  methods: {
    logout(){
      this.$router.push('/login');
    },onSubmit(){
      this.$axios.get('/api/query_id/',{
      params:{
        id: this.$User_id
      }
    })
    .then(
      response=>{
        console.log(response)
        this.tableData=response.data.data
      }
    ).catch(error => {
          console.error(error);
    });
    }
    ,
    ex_trade(id) {
      console.log(id)
    // 在这里处理表单提交的逻辑
      this.showFormModal=true;
      this.both.from=id;
    },
    trade_both(){
      this.$axios.get('/api/trade/',{
        params:{
          from_id:this.both.from,
          to_id:this.both.to,
          money:this.both.money
        }
      }).then(result=>{
        console.log(result.data)
        alert("转账成功！")
        this.showFormModal = false;
        this.onSubmit()
      })

    }
  },
  mounted() {
    this.onSubmit()
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
}
.el-menu {
  background-color: #FFD8B5; /* 浅橙色背景颜色 */
  opacity: 0.9;
}
</style>