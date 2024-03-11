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
            <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名">
                    <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="ruleForm.pid" placeholder="请输入6位身份证号">
                    </el-input>
                </el-form-item>
                <el-form-item label="电话号码" >
                    <el-input v-model="ruleForm.telephone" placeholder="请输入电话号码"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">确认</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
    data() {
      return {
          ruleForm: {
            pid: '',
            telephone:'',
            name:'',
          }
      };
    },
    methods: {
      submitForm() {
        this.$axios.get('/api/insert_user/',{
          params:{
            name:this.ruleForm.name,
            pid:this.ruleForm.pid,
            phone:this.ruleForm.telephone
          }
        }).then(result=>{
          console.log(result.data)
          alert("添加用户成功!")
          this.resetForm()
        })
      },
      resetForm() {
          this.ruleForm=[]
      },
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
  width: 19.55%;
  padding: 10px;
}.el-menu {
  background-color: #FFD8B5; /* 浅橙色背景颜色 */
  opacity: 0.9;
}
</style>