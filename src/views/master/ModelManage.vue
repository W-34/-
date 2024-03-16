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
                <el-menu-item index="1-1">
                  <router-link to="/master/model-manage">模型攻击测试</router-link>
                </el-menu-item>
                <el-menu-item index="1-1">
                  <router-link to="/master/model-manage">模型防御测试</router-link>
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
  
            <h2>模型列表</h2>
            <!-- 信息显示 -->
            <el-table :data="tableData" row-key="id" v-loading="loadingTable" border>
              <el-table-column prop="id" label="id" width="50">
              </el-table-column>
              <el-table-column prop="name" label="模型名" width="180">
              </el-table-column>
              <el-table-column prop="p1" label="参数1" width="180">
              </el-table-column>
              <el-table-column prop="p2" label="参数2" width="180">
              </el-table-column>
              <el-table-column prop="p3" label="参数3" width="180">
              </el-table-column>
              <el-table-column prop="p4" label="参数4" width="180">
              </el-table-column>
              <el-table-column prop="p5" label="参数5" width="180">
              </el-table-column>
              <el-table-column prop="p6" label="参数6" width="180">
              </el-table-column>
              <el-table-column prop="p7" label="参数7" width="180">
              </el-table-column>
              <el-table-column prop="p8" label="参数8" width="180">
              </el-table-column>
              <el-table-column prop="p9" label="参数9" width="180">
              </el-table-column>
              <el-table-column prop="p10" label="参数10" width="180">
              </el-table-column>
              <el-table-column prop="p11" label="参数11" width="180">
              </el-table-column>
              <el-table-column prop="p12" label="参数12" width="180">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="300">
                <template slot-scope="scope">
                  <el-button fixed="true" size="mini" type="primary"  :loading="buttonStates[scope.row.id]===1" 
                  @click="runModel(scope.row.id)">{{ getButtonText(scope.row.id) }}</el-button>
                  <el-button ref="actionButton" fixed="true" size="mini" type="success"  :loading="false" 
                  @click="watchResult(scope.row.id)">查看结果</el-button>
                  <el-button fixed="true" type="danger" size="mini" @click="deleteItem(scope.row.id)"
                    >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <el-dialog
              title="模型运行结果"
              :visible.sync="dialogVisible"
              width="50%">
              <span ref="dialog_message"></span>
              <div class="scrollable-text">
                <pre>{{ resultContent }}</pre>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
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
          form:{
            name:'',
            age:''
          },
          dialogVisible: false,
          loadingTable:true,
          buttonStates: [],
          resultContent:'',
      };
    },
    methods: {
      deleteItem(uid) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/model-manage/delete-model/',{
            id:uid
          }).then(()=>{
            // 处理成功响应
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            location.reload();
          })
          .catch(error => {
            // 处理错误响应
            console.error('删除失败', error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      runModel(uid) {
        this.$set(this.buttonStates, uid, 1);
        this.$axios.post('/model-manage/run-model/',{
          id:uid
        })
          .then(response => {
            console.log(response);
            this.$set(this.buttonStates, uid, 2);
          })
          .catch(error => {
            // 处理错误响应
            console.error('运行失败', error);
            this.$set(this.buttonStates, uid, 0);
          });
      },
      getButtonText(uid){
        let state=this.buttonStates[uid];
        if(state==1)
          return "运行中"
        else if(state==2)
          return "运行完成"
        else
          return "运行"
      },
      loadResultContent(path){
        console.log(path);
        this.$axios.post("/model-manage/get-file/",{
          "path":path
        }).then(response => {
            this.resultContent = response.data;
          })
          .catch(error => {
            console.error('Error loading txt file:', error);
          });
      },
      watchResult(id){
        // console.log(dialog_message);
        this.$axios.post('/model-manage/get-model-result/',{
          "id":id
        }).then(
        result=>{
          console.log(result.data[0].result);
          this.dialogVisible=true;
          this.$nextTick(()=>{
            if(result.data[0].result!=null){
              this.$refs.dialog_message.innerText='训练结果路径：'+result.data[0].result;
              this.loadResultContent(result.data[0].result);
            }
            else {
              this.$refs.dialog_message.innerText="该模型暂无运行结果";
            }
          });
        }
      )
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
          this.tableData=result.data;
          this.loadingTable=false;
          this.buttonStates = new Array(this.tableData.length).fill(0);
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
  .scrollable-text {
    max-height: 500px; /* 设置最大高度 */
    overflow-y: auto; /* 垂直方向滚动条 */
  }
  </style>