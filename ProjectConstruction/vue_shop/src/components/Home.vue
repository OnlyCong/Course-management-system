<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo4.png" alt="">
        <span>课程管理系统</span>

      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="250px">
        <!-- <div class="toggle-button" @click="togglecollapse">|||</div> -->
        <el-menu background-color="#87CEFA" text-color=#fff :unique-opened="true" :router="true"
          :default-active="activePath">
          <el-submenu :index="item.id+' '" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单 -->
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->

            <el-menu-item :index="'/'+subItem.path+''" v-for="subItem in item.children" :key="subItem.id"
              @click="SaveNaveState('/'+subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>


<script>
  export default {
    data() {
      return {
        flag: 123,
        menulist: [],
        iconsobj: {
          125: "el-icon-user",
          103: "el-icon-warning-outline",
          101: "el-icon-goods",
          102: "el-icon-edit-outline",
          145: "el-icon-edit",
        },
        activePath: "",
      };
    },

    mounted() {
      console.log("mounted===");
      this.getRoleslist();
      // this.getMenulist();
      this.activePath = window.sessionStorage.getItem("avtivePath");

      //eventbus监听事件,传递right-num事件
      // this.$bus.$on('right-num',(num)=>{
      //   console.log('this指向')
      //   console.log(this)
      //   this.flag=num

      // })
    },

    methods: {
      //登录数据请求
      logout() {
        window.sessionStorage.clear();

        window.location.href = "/?random=" + new Date().getTime() + "/#/login";
        //根据编程，强制跳转到登录界面
        // this.$router.push('/login')
      },

      //直接通过功能权限表获取不同角色对应的菜单
      async getRoleslist() {
        const { data: res } = await this.$http.get('roles')
        if (res.meta.status !== 200) return this.$message.error('获取角色列表失败');
        const rolelist = res.data;
        console.log(rolelist);

        let num = window.sessionStorage.getItem("num");
        //用于权限不同的渲染，等待login的标志符传递过来
        if (num == "1") {//管理员
          this.menulist = rolelist[0].children;
        } else if (num == "2") {//学生
          this.menulist = rolelist[2].children;
        } else if (num == "3") {//老师
          this.menulist = rolelist[1].children
        }
      },

      /*//获取所有的菜单数据请求,再根据不同角色功能权限删除不需要项获取该角色的页面菜单(!!!麻烦!!!)
      async getMenulist() {
        const { data: res } = await this.$http.get("menus");
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        const all_menu = res.data;
        console.log(all_menu)

        let num = window.sessionStorage.getItem("num");

        //用于权限不同的渲染，等待login的标志符传递过来
        if (num == "1") {//管理员
          all_menu.splice(2, 1);
          all_menu.splice(4, 2);
        } else if (num == "2") {//学生
          all_menu.splice(0, 1);
          all_menu.splice(0, 1);
          all_menu.splice(2, 1);

          all_menu[0].children.splice(1, 2);
        } else if (num == "3") {//老师
          all_menu.splice(0, 1);
          all_menu.splice(0, 1);
          all_menu.splice(2, 1);
          all_menu.splice(2, 1);
          all_menu.splice(2, 1);
          // console.log(all_menu[0].children);
          all_menu[0].children.splice(3, 1);
        }

        this.menulist = all_menu;
        console.log(all_menu);
      },*/

      SaveNaveState(activePath) {
        //根据点击事件，把对应的index值保存到sessionstoreage中
        window.sessionStorage.setItem("activePath", activePath);
        this.activePath = activePath;
      },
    },
  };
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #add8e6;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    /* 按钮上下居中 */
    align-items: center;
    color: #ffffff;
    font-size: 20px;

    >div {
      display: flex;
      justify-self: center;

      span {
        margin-left: 15px;
        padding-top: 15px;
      }
    }
  }

  .el-aside {
    background-color: #87cefa;
  }

  .el-main {
    background-color: #eaedf1;
  }

  .iconfont {
    margin-right: 10px;
  }

  /* // .toggle-button{
  //   background-color:#F0FFFF ;
  //   font-size: 10px;
  //   color:#008B8B;
  //   text-align: center;
  //   letter-spacing: 0.2em;
  //   cursor: pointer;
  // } */
</style>