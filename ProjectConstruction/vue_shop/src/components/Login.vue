<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo3.png" alt="">
      </div>
      <div class="title">
        <span>课程管理系统</span>

      </div>
      <!-- 登录表单区域 model是绑定数据，用于data，rules是表单验证 ref拿到表单的实例对象，用于method-->
      <el-form ref="loginformref" :model="loginform" :rules="loginformrules" label-width="0px" class="login_form">
        <!-- 登录名 指定prop让验证规则生效-->
        <el-form-item prop="username">
          <el-input v-model="loginform.username" prefix-icon="iconfont icon-user">

          </el-input>
        </el-form-item>
        <!-- 密码 指定prop让规则生效 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginform.password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <!-- 选择权限区域 -->
        <el-form-item>
          <el-radio v-model="radio" label="1">管理员</el-radio>
          <el-radio v-model="radio" label="2">学生</el-radio>
          <el-radio v-model="radio" label="3">老师</el-radio>

        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetloginform">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>

</template>

<script>

  export default {
    data() {
      return {
        //登录表单的数据访问对象,绑定，这里是vue的知识
        loginform: {
          username: 'admin',
          password: '123456'
        },
        //用户权限
        // input:'',
        radio: '1',
        //表单的验证规则对象
        loginformrules: {
          //验证用户名是否合法
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8个字符', trigger: 'blur' }
          ],
          //验证密码是否合法
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }

          ]
        }
      }
    },
    methods: {
      resetloginform() {
        this.$refs.loginformref.resetFields();

      },
      //表单预验证,
      login() {
        console.log("login===");
        if (this.radio == 1) {
          this.$store.state.num = this.$store.state.num
        }

        if (this.radio == 2) {
          this.$store.state.num += 1
          console.log(this.$store.state.num)
        }
        if (this.radio == 3) {
          this.$store.state.num += 2
        }
        window.sessionStorage.setItem("num", this.radio);
        //bus总线通信  
        // console.log(typeof(this.input))
        // console.log('-------')
        // console.log(this.input)

        // this.$bus.$emit('right-num',parseInt(this.input))

        this.$refs.loginformref.validate(async valid => {
          if (!valid) return;
          const { data: res } = await this.$http.post('login', this.loginform);

          if (res.meta.status !== 200) return this.$message.error('登录失败');
          this.$message.success('登陆成功')
          console.log(res)
          //通过编程式导航跳转到后台主页
          window.sessionStorage.setItem('token', res.data.token)

          window.location.href = "/?random=" + new Date().getTime() + "/#/home";

          // this.$router.push('/home')
        });

      },
    }
  }



</script>

<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;

  }

  .login_box {
    width: 450px;
    height: 400px;
    background-color: #ffffff;
    /* 圆角设置 */
    border-radius: 3px;
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;


  }

  .title {
    height: 100px;
    line-height: 200px;
    text-align: center;
    font-size: 25px;


  }

  .login_box .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px;

    position: absolute;

    left: 50%;
    transform: translate(-50%, -50%);


    img {
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;

    }

  }

  .login_box .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

  }



  .login_box .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>