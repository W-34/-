<template>
    <div>
      <el-container style="height: 700px; border: 1px solid #eee">
        <el-header
          style="font-size: 40px;
            background-color: rgb(238, 241, 246);
            text-align: center;
          "
          >管理员页面</el-header
        >
        <el-container>
          <el-aside style="width:230px; border: 1px solid #eee">
            <el-menu :default-openeds="['1', '3']">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-message"></i>操作选项</template>
                <el-menu-item index="1-1">
                  <router-link to="/master/model-manage">模型管理</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/master/trade">待新增</router-link>
                </el-menu-item>
              </el-submenu>
            </el-menu>
            <el-button style="width:228px" class="button-container" type="danger" @click="logout()">退出</el-button>
          </el-aside>
          <el-main>
            <h2>添加模型</h2>
            <el-form ref="form" :model="form" label-width="80px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="参数">
                    <el-input v-model="form.age"></el-input>
                  </el-form-item>
                </el-col>
  
            </el-row>
                  <el-form-item>
                    <el-button type="primary" @click="addUser()" size="mini">添加</el-button>
                  </el-form-item>
            </el-form>
  
            <h2>模型列表<i class="el-icon-loading"></i></h2>
            <!-- 信息显示 -->
            <el-table :data="tableData" row-key="id" border>
              <el-table-column prop="id" label="id" width="240">
              </el-table-column>
              <el-table-column prop="name" label="模型名" width="220">
              </el-table-column>
              <el-table-column prop="p1" label="参数1" width="200">
              </el-table-column>
              <el-table-column prop="p2" label="参数2" width="200">
              </el-table-column>
              <el-table-column prop="p3" label="参数3" width="200">
              </el-table-column>
              <el-table-column prop="p4" label="参数4" width="200">
              </el-table-column>
              <el-table-column prop="p5" label="参数5" width="200">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
                </template>
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
          form:{
            name:'',
            age:''
          }
      };
    },
    methods: {
      deleteItem(uid) {
        console.log(uid);
        // let deleteForm=new FormData();
        // deleteForm.append('id',uid);
        this.$axios.post('/model-manage/delete-model/',{
          id:uid
        })
          .then(response => {
            // 处理成功响应
            console.log('删除成功');
            console.log(response);
            location.reload();
            // 执行其他操作，如刷新页面或更新数据列表等
          })
          .catch(error => {
            // 处理错误响应
            console.error('删除失败', error);
          });
      },
      addUser(){
        console.log(this.form),
        this.$axios.get('/api/insert_worker/', {
          params:{
            "name": this.form.name,
            "age": this.form.age}
        })
        .then(response => {
          // 插入成功，处理响应
          console.log(response.data);
          
          // 清空输入框
          this.form.name = '';
          this.form.age = '';
          
          // 刷新页面或更新数据列表等操作
          location.reload();
          // ...
        })
        .catch(error => {
          // 插入失败，处理错误
          console.error(error);
        });
      },
      logout(){
        this.$router.push('/login');
      }
    },
    mounted() {
      this.$axios.get('/model-manage/get-models/').then(
        result=>{
          console.log(result.data);
          this.tableData=result.data;
        }
      )
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
    width: 20%;
    padding: 10px;
  }
  .el-menu {
    background-color: #FFD8B5; /* 浅橙色背景颜色 */
    opacity: 0.9;
  }
  </style>