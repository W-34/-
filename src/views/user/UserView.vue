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
        <el-main >
          <h1 style="text-align:center; color:red">欢迎使用做着玩玩银行系统！</h1>
            <!-- 信息显示 -->
            <el-descriptions class="margin-top" title="用户信息" :column="3" :size="size" border>
              <template slot="extra">
                <el-button type="primary" size="small" @click="change=true">修改信息</el-button>
              </template>

              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  用户名
                </template>
                {{ user.customerName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-mobile-phone"></i>
                  手机号
                </template>
               {{user.telephone}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  客户ID
                </template>
                {{user.customerID}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  名下银行卡数
                </template>
                <el-tag size="small">{{ user.cardCount }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  联系地址
                </template>
               {{user.address}}
              </el-descriptions-item>
            </el-descriptions>

            <el-dialog :visible.sync="change">
              <el-form>
                <el-form-item label="用户名">
                  <el-input v-model=mation.userName placeholder="请输入新用户名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input v-model=mation.telephone placeholder="请输入电话号码"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model=mation.password placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="住址">
                  <el-input v-model=mation.address placeholder="请输入联系地址"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="_in()">提交</el-button>
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
    return {//信息待改为动态
      change:false,
      mation:{
        userName:'',
        telephone:'',
        address:'',
        password:''
      },
      user:{
        customerName:'',
        pid:'',
        customerID:'',
        telephone:'',
        address:'',
        CardCount:'',
        password:''
      }
    };
    },
    methods: {
      logout(){
      this.$router.push('/login');
      },
      show_user(){
        this.$axios.get('/api/getUser/',{
          params:{
            id:this.$User_id
          }
        }).then(result=>{
          console.log(result.data)
          this.user=result.data.data
        })
      }
      ,
      _in(){
        this.$axios.get('/api/update_user/',{
          params:{
            name:this.mation.userName,
            password:this.mation.password,
            address:this.mation.address,
            telephone:this.mation.telephone,
            id:this.$User_id
          }
        }).then(result=>{
          console.log(result.data);
          this.change=false;
          alert("信息修改成功！");
          this.show_user();
          this.mation=[]
        })
      }
    },
    mounted() {
      this.show_user()
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