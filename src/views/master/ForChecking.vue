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
                  <i class="el-icon-message"></i>操作选项</template>
                <el-menu-item index="1-1">
                  <router-link to="/master/worker">模型</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/master/trade">交易记录管理</router-link>
                </el-menu-item>
                <el-menu-item index="1-3">
                <router-link to="/master/check">just for check</router-link>
              </el-menu-item>
              </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
            <h1 style="text-align:center; color: red ">{{message}}</h1>

            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="customerId">
                    <el-input v-model="formInline.user" placeholder="用户id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border>
            <el-table-column prop="date" label="用户id" width="300">
            </el-table-column>
            <el-table-column prop="money" label="总余额" width="220">
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
                message:"this is a page for check",
                formInline: {
                    user: ''
                },
                tableData:[],
            }
        },
        methods: {
            onSubmit() {
                this.$axios.get("/try", {
                    params: { id: this.formInline.user }
                    })
                    .then(result => {
                        // 处理成功响应
                        this.tableData.data=result.data.data;
                        this.tableData.money=this.formInline.user;// 输出后端返回的单个值
                    })
            }
        }
    }
</script>
<style>
</style>