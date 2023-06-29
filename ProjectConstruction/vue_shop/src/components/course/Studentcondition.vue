<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生学习情况查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input placeholder="请输入教师编码" v-model="teacher_id_input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="choose_btn" class="bb">查看选课情况</el-button>
      </el-form-item>
    </el-form>

    <el-card v-show="isshow">
      <el-table :data="page_data" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="coures_id" label="课程编号" width="100"></el-table-column>
        <el-table-column prop="name" label="课程名称" width="200"></el-table-column>
        <el-table-column prop="course_time" label="课程时间" width="100"></el-table-column>
        <el-table-column prop="course_points" label="课程知识点" width="500"></el-table-column>

        <el-table-column prop="student_id" label="选课学生" width="100"></el-table-column>
        <el-table-column label="学生掌握情况" width="120">
          <tempalte slot-scope="scope">
            <el-button type="primary" size="small" @click="search(scope.row)">查询</el-button>
          </tempalte>
        </el-table-column>

      </el-table>

      <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="[1, 5, 10, 15, 20]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

      <template>
        <div class="Echarts" v-show="isshow1">
          <div style="height: 20px;"></div>
          <div id="main" style="width: 1200px;height:400px;"></div>
        </div>
      </template>
    </el-card>
  </div>
</template>
<script>
  const echarts = require("echarts");
  export default {
    data() {
      return {
        currentPage: 1, // 当前页码
        total: "", // 总条数
        pageSize: 5, // 每页的数据条数
        searchdialogVisible: false,
        teacher_id_input: "",
        isshow: false,//显示表格数据
        isshow1: false,//显示柱状图数据
        errpoint: false,//无该知识点，请重新输入！
        x_data: [],
        series_data: [],
        total_course: [],
        page_data: [],
        total: 0,
        del_point: '',
        edit_point: '',
        editdialogVisible: false,//增加知识点弹窗
        deldialogVisible: false,//删除知识点弹窗
        points_list: '',
      };
    },
    created() { },

    methods: {
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then((_) => {
            done();
          })
          .catch((_) => { });
      },

      //展示当前分页页面数据
      showData() {
        this.page_data = this.total_course.slice(this.pageSize * (this.currentPage - 1), this.currentPage * this.pageSize)
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.showData();
      },

      //当前页改变时触发 跳转其他页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.showData();
      },

      //查询选课情况按钮
      async choose_btn() {
        this.isshow1 = false;
        this.isshow = true;

        const { data: res } = await this.$http({
          methods: "get",
          url: "/dbapi/init3",
          params: {
            teacher_id: this.teacher_id_input
          }
        })

        this.total = res.length;
        this.total_course = res;
        this.showData();
        this.searchdialogVisible = true;
      },

      myEcharts(id) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById("main"));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: `学生${id}知识点掌握分析图`,
          },
          tooltip: {},
          legend: {
            data: ["知识点掌握程度"],
          },
          xAxis: {
            data: this.x_data
          },
          yAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['极差', '较差', '一般', '较好', '完全']
          },
          series: [
            {
              name: "知识点掌握程度",
              type: "bar",
              data: this.series_data,

            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },

      async search(data) {

        if (!data.course_ablity) {
          alert("该生还未评价！")
          return
        }

        this.x_data = data.course_points.split(',')
        this.series_data = data.course_ablity
        console.log(this.series_data)

        this.myEcharts(data.student_id)

        this.isshow1 = true;
      },
    },

    mounted() {
      this.myEcharts();
    },
  };
</script>>

<style lang="less" scoped>
  .bb {
    margin-left: 20px;
  }

  .el-button {
    margin: 0 5px;
  }
</style>