<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程查询</el-breadcrumb-item>
    </el-breadcrumb>



    <!-- 查询部分 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="课程编码查询">
        <el-input placeholder="请输入课程编码" v-model.trim="queryInfo.query"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getdataobj">搜索</el-button>
      </el-form-item>
      <el-form-item label="课程名称查询">
        <el-input placeholder="请输入课程名称" v-model.trim="queryInfo.query2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getdataobj2">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <el-table :data="page_data" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <!-- <el-table-column prop="date" label="日期" width="180"></el-table-column> -->
        <el-table-column prop="coures_id" label="课程编号" width="180"></el-table-column>
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="course_time" label="课程时间"></el-table-column>
        <!-- 
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <el-button @click="delrow(scope.row)" type="primary" size="small"
              >移除</el-button
            >
            <el-button type="primary" size="small" @click="update(scope.row)"
              >编辑</el-button
            >
            <el-dialog
              title="请修改上课时间"
              :visible.sync="editdialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <el-input type="textarea" v-model="edit_time"></el-input>

              <span slot="footer" class="dialog-footer">
                <el-button @click="editdialogVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  placeholder="请输入新更改的时间"
                  @click="edit"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column> -->
      </el-table>

      <!-- 分页区域 -->
      <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="[1, 5, 8, 15, 20]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        res_data: [],
        page_data: [],
        total: 0,
        //添加用户的表单数据
        data_add: {
          coures_id: "",
          name: "",
          course_time: "",
        },
        currentPage: 1, // 当前页码
        total: "", // 总条数
        pageSize: 5, // 每页的数据条数
        //获取用户列表的参数对象
        queryInfo: {
          //查id
          query: "",
          //查课程名称
          query2: "",
        },
        edit_time: "",
        row_time: "",

        //编辑内容的弹窗
        editdialogVisible: false,
      };
    },
    created() {
      this.getdataobj();
      this.getpageobj();
      this.getTotalObj();
    },
    methods: {
      async getdataobj() {
        const { data: res } = await this.$http({
          methods: "get",
          url: "/dbapi/init",
          params: {
            coures_id: this.queryInfo.query,
          },
        });
        console.log(res);
        this.total = res.length;
        this.page_data = res;
      },
      async getpageobj() {
        const { data: res } = await this.$http({
          methods: "get",
          url: "/dbapi/page",
          params: {
            currentpage: this.currentPage,
            pagesize: this.pageSize,
          },
        });
        console.log(res);
        this.page_data = res;
      },
      async getdataobj2() {
        const { data: res } = await this.$http({
          methods: "get",
          url: "/dbapi/init2",
          params: {
            name: this.queryInfo.query2,
          },
        });
        console.log(res);
        this.total = res.length;
        this.page_data = res;
      },
      getTotalObj() {
        this.$http({
          methods: "get",
          url: "/dbapi/init0",
          params: {
          },
        }).then((res) => {
          console.log(res)
          console.log(res.data.length);
          this.total = res.data.length;
        });
      },

      handleSizeChange(val) {
        if (val >= this.total) return;
        console.log(`每页 ${val} 条`);
        //this.currentPage = 1;
        this.pageSize = val;
        this.getpageobj();
      },
      //当前页改变时触发 跳转其他页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getpageobj();
      },

      handleClose(done) {
        this.$confirm("确认关闭？")
          .then((_) => {
            done();
          })
          .catch((_) => { });
      },
    },
  };
</script>>