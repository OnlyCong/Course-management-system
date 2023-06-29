<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程评价</el-breadcrumb-item>
      <el-breadcrumb-item>我的课程评价</el-breadcrumb-item>
    </el-breadcrumb>

    <h3>您好，欢迎来到课程评价单元</h3>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input placeholder="请输入您的id" v-model="student_id_input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="choose_btn" class="bb">确定</el-button>
      </el-form-item>

    </el-form>
    <el-card>
      <el-table :data="course_list" style="width: 100%" border stripe>
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="course_points" label="课程知识点"></el-table-column>
        <el-table-column label="自我评估" width="220px">
          <template slot-scope="scope">
            <span v-if="scope.row.course_ablity">已完成评价</span>
            <el-button type="primary" size="small" @click="score(scope.row)" v-else>课程评价</el-button>

            <el-dialog title="对知识点掌握情况进行自我评价" :visible.sync="editdialogVisible" width="30%" :before-close="handleClose">
              <span>打分提示：三星及以上表示掌握较好，三星以下表示掌握一般</span>

              <el-form>
                <el-form-item v-for="(item,index) in points_list">
                  {{item}}
                  <!-- {{index}} -->
                  <el-rate v-model="values[index]" show-text :colors="colors" :texts="texts">
                  </el-rate>
                </el-form-item>
              </el-form>

              <span slot="footer" class="dialog-footer">
                <el-button @click="editdialogVisible = false">取 消</el-button>
                <el-button type="primary" placeholder="请输入新更改的时间" @click="edit()">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>

      </el-table>

    </el-card>


  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        student_id_input: '',
        course_list: [],
        course_id_input: '',
        editdialogVisible: false,
        points_list: [],
        values: [],
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        texts: ['极差', '较差', '一般', '较好', '完全']
      };
    },
    created() {

    },
    methods: {
      async choose_btn() {
        const { data: res } = await this.$http({
          methods: "get",
          url: "/dbapi/init4",
          params: {
            student_id: this.student_id_input,
          },
        })
        this.course_list = res
        console.log(res)

      },
      score(data) {
        console.log(data)
        this.values = []
        this.course_id_input = data.coures_id;
        this.points_list = data.course_points.split(',')
        this.editdialogVisible = true
        console.log(this.points_list)
        console.log(this.course_id_input)
      },
      edit() {
        this.editdialogVisible = false
        this.$message({
          message: '提交成功',
          type: 'success'
        })

        //存入 course_ablity
        console.log(this.values)
        if (this.isValid(this.values)) {
          this.$http({
            method: "post",
            url: "/dbapi/update5",
            //修改条件
            data: {
              //第一个值替换对象，第二个值是替换后的值
              fliterid: this.course_id_input,
              ablity: this.values,
            },
          }).then((res) => {
            console.log(res);
          });

          this.$message({
            message: '完成评价',
            type: 'success'
          })
        }
        this.choose_btn()
      },

      isValid(values) {
        for (const i of values) {
          if (!i) return false;
        }
        return true;
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