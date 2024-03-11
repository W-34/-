<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-header
        style="font-size: 40px;
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
          <h2>主要业务</h2>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="客户ID" width="300">
                    <el-input v-model="formInline.user"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit()">重置</el-button>
                </el-form-item>
            </el-form>

            

          <!-- 信息显示 -->
          <el-table :data="tableData" row-key="cardID" border>
            <el-table-column prop="cardID" label="银行卡号" width="240">
            </el-table-column>
            <el-table-column prop="openDate" label="开户日期" width="220">
            </el-table-column>
            <el-table-column prop="balance" label="余额" width="220">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="400">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="ex_trade(scope.row.cardID)">转账</el-button>
                <el-button type="primary" size="mini" @click="in_money(scope.row.cardID)">存款</el-button>
                <el-button type="primary" size="mini" @click="out_money(scope.row.cardID)">取款</el-button>
              </template>
            </el-table-column>
          </el-table>


          <h2>添加银行卡</h2>
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="卡号">
                  <el-input v-model="form.name" placeholder="请输入6位卡号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="存入金额">
                  <el-input v-model="form.money" placeholder="请输入开户金额"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="用户id">
                  <el-input v-model="form.id" placeholder="请输入用户id"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-button type="primary" @click="addUser()" size="mini">添加</el-button>
                </el-form-item>
              </el-col>
          </el-row>
          </el-form>

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

          <el-dialog :visible.sync="showFormModal_in">
              <el-form>
                <el-form-item label="存入金额">
                  <el-input v-model=trad.in placeholder="请输入存入金额"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="money_in()">提交</el-button>
                </el-form-item>
              </el-form>
          </el-dialog>

          <el-dialog :visible.sync="showFormModal_out">
              <el-form>
                <el-form-item label="取出金额">
                  <el-input v-model=trad.out placeholder="请输入取出金额"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="money_out()">提交</el-button>
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
      formInline: {
          user: ''
        },
      form:{
        name:'',
        id:'',
        money:''
      },showFormModal:false,
      showFormModal_out:false,
      showFormModal_in:false
      ,both:{
        to:'',
        money:'',
        from:''
      },trad:{
        in:'',
        out:'',
        id:''
      }
    };
  },
  methods: {
    onSubmit(){
      console.log(this.formInline),
      this.$axios.get('/api/query_id/',{
        params:{
          id: this.formInline.user
        }
      }).then(
        result=>{
          console.log(result.data)
          this.tableData=result.data.data
          // this.formInline.user=''
        }
      )
    },
    submit(){
      this.tableData=[];
      this.formInline.user=''
    },
    addUser(){
      console.log(this.form)
      this.$axios.get('/api/insert_card/',{
        params:{
          cardId:this.form.name,
          balance:this.form.money,
          customerId:this.form.id
        }
      }).then(result=>{
        console.log(result.data)
        this.form=[]
        alert("添加银行卡成功！")
      })
    },
    logout(){
      this.$router.push('/login');
    },
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

    },
    in_money(id) {
      console.log(id)
    // 在这里处理表单提交的逻辑
      this.showFormModal_in=true;
      this.trad.id=id;
    },
    money_in(){
      this.$axios.get('/api/trade_in/',{
        params:{
          id:this.trad.id,
          money:this.trad.in
        }
      }).then(result=>{
        console.log(result.data)
        alert("存入成功！")
        this.showFormModal_in = false;
        this.trad=[]
        this.onSubmit()
      })
    },out_money(id) {
      console.log(id)
    // 在这里处理表单提交的逻辑
      this.showFormModal_out=true;
      this.trad.id=id;
    },
    money_out(){
      this.$axios.get('/api/trade_out/',{
        params:{
          id:this.trad.id,
          money:this.trad.out
        }
      }).then(result=>{
        console.log(result.data)
        alert("取钱成功！")
        this.showFormModal_out = false;
        this.trad=[]
        this.onSubmit()
      })
    }
  },
  mounted() {
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