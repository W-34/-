<template>
    <div>
        <div class="background">
            <img :src="imgSrc" width="100%" height="100%" alt=""/>
        </div>
        <h1 class="title">test系统</h1>
        <div class="login_container"   >
            <!-- 登录块 -->
            <div class="login_box">
                <!-- 表单区域 -->
                <h2  >Login</h2>
                <el-form ref="loginFormRef" :model="loginForm"   :rules="loginRules" :v-model="login" class="login_form" label-width="0">
                    <!-- 用户id -->
                    <el-form-item prop="id">
                       <el-input v-model="loginForm.customerName" prefix-icon="iconfont icon-yonghu" class="in"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item  prop="password">
                       <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima"  show-password class="in"></el-input>
                    </el-form-item>
                    <!-- 按钮 -->
                    <el-form-item  class="btns">
                       <el-button type="primary" @click="login" >提交</el-button>
                       <el-button type="info" @click="resetLoginForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
    </template>
     
    <script>
    export default{
        data(){
            return {
                imgSrc:require('@/img/back.jpg'),
                //表单数据
                loginForm:{
                    customerName:"",
                    password:""
                },
                //验证对象
                loginRules:{
                    //校验id
                    id:[
                        { required: true, message: '用户id为必填项', trigger: 'blur' },
                        { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
                    ],
                    //校验密码
                    password:[
                        { required: true, message: '用户密码为必填项', trigger: 'blur' },
                        { min: 8, max: 8, message: '长度8个字符', trigger: 'blur' }
                    ],
                },
            };
        },
        methods: {
            resetLoginForm(){//重置用户名和密码方法
                this.$refs.loginFormRef.resetFields();
            },
            login(){

                // 发送登录请求
                let formdata=new FormData()
                formdata.append("username",this.loginForm.customerName)
                formdata.append("password",this.loginForm.password)
                this.$axios.post('/login',formdata)
                    .then(response => {
                    // 登录成功，处理返回的数据
                    console.log(response.data);
                    if(this.loginForm.customerName==="master"&& this.loginForm.password==="12345678"){
                        this.$router.push('/master');
                    }
                    // else if (response.data.msg==="worker") {
                    //     this.$Worker_id=response.data.data.workerId;
                    //     console.log(this.$Worker_id)
                    //     this.$router.push('/worker');
                    // } else if(response.data.msg==="user"){
                    //     this.$User_id=response.data.data.customerID;
                    //     console.log(this.$User_id)
                    //     this.$router.push('/user');
                    // }
                    else{
                        location.reload();//重新加载页面
                        alert("登录错误，请重新登录~");
                    }
                }).catch(function (error){
                    console.log(error)
                })
            },
        },
    }
    </script>


<!-- style -->
    <style  scoped>
    .login_container{
        background-color:palegreen;
        
    }
    .title{
        position: absolute;
  top: 20px;
  left: 470px;
        font-size: 70px;
        color: #0f1550; /* 设置标题文字颜色为白色 */
        font-family: 'cursive',cursive;
    }
    .login_box{
        width: 450px;
        height: 300px;
        /* background-color: #ffffff; */
        background: rgba(255,255,255,0.3);
        border: 1px solid black;
        opacity: 0.85;
        filter: alpha(opacity=90);
        border-radius: 20px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        
    }
    .avatar_box{
            width: 130px;
            height: 130px;
            border:-30px solid #eee;
            border-radius: 50%;
            padding: 0px;
            box-shadow: 0 0 2px #ddd;
            left:50%;
            
    }
    .btns{
        display: flex;
        justify-content: space-around;    
    }
    .login_form{
        position: absolute;
        bottom: 0%;
        width: 100%;
        border: 30px;
    }
    .background{
        width:100%;  
        height:100%;  /**宽高100%是为了图片铺满屏幕 */
        z-index:-1;
        position: absolute;
        opacity: 0.9;
    }
    .in{
        margin-left: 10%;
        margin-right: 10%;
        width: 350px;
    }
    h1,h2,h3{
     
    font-size:xxpx;
     
    color:rgb(7, 7, 7);
     
    text-align:center;
     
    }
    </style>