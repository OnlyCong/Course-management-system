<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程管理</el-breadcrumb-item>
            <el-breadcrumb-item>课程编辑</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input placeholder="请输入教师编码" v-model="teacher_id_input"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="choose_btn" class="bb">查看课程</el-button>
            </el-form-item>
        </el-form>

        <el-card v-show="isshow">
            <el-table :data="page_data" style="width: 100%" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="coures_id" label="课程编号" width="100"></el-table-column>
                <el-table-column prop="name" label="课程名称" width="200"></el-table-column>
                <el-table-column prop="course_time" label="课程时间" width="100"></el-table-column>
                <el-table-column prop="course_points" label="课程知识点" width="500"></el-table-column>

                <el-table-column label="知识点管理" width="256px">
                    <template slot-scope="scope">
                        <el-button @click="delpoints(scope.row)" type="primary" size="small">删除知识点</el-button>
                        <el-dialog title="请输入您想要删除的知识点" :visible.sync="deldialogVisible" width="30%"
                            :before-close="handleClose">
                            <el-input type="textarea" v-model="del_point"></el-input>
                            <span style="color: red; font-size: 12px;" v-show="errpoint">无该知识点，请重新输入！</span>

                            <span slot="footer" class="dialog-footer">
                                <el-button @click="deldialogVisible= false; del_point = ''">取 消</el-button>
                                <el-button type="primary" placeholder="请输入新更改的时间" @click="del">确 定</el-button>
                            </span>
                        </el-dialog>

                        <el-button type="primary" size="small" @click="update(scope.row)">添加知识点</el-button>
                        <el-dialog title="请输入您想要增加的知识点" :visible.sync="editdialogVisible" width="30%"
                            :before-close="handleClose">
                            <el-input type="textarea" v-model="edit_point"></el-input>

                            <span slot="footer" class="dialog-footer">
                                <el-button @click="editdialogVisible = false">取 消</el-button>
                                <el-button type="primary" placeholder="请输入新更改的时间" @click="edit">确 定</el-button>
                            </span>
                        </el-dialog>
                    </template>
                </el-table-column>

            </el-table>

            <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[1, 5, 8, 15, 20]" :page-size="pageSize"
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

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
            },

            //当前页改变时触发 跳转其他页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
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
                this.page_data = res;
                console.log(res)
                this.searchdialogVisible = true;
            },

            //删除知识点
            delpoints(data) {
                this.deldialogVisible = true
                this.errpoint = false;
                this.points_list = data.course_points
                this.idx_list = data.course_ablity
            },
            del() {
                //知识点数组
                let pl = this.points_list.split(',')
                let index = pl.indexOf(this.del_point)
                if (index !== -1) {
                    pl.splice(index, 1)
                } else {
                    this.errpoint = true;
                    return;
                }

                let final_point = pl.join(',')

                //更新知识点数组
                this.$http({
                    method: "post",
                    url: "/dbapi/update1",
                    //修改条件
                    data: {
                        //第一个值替换对象，第二个值是替换后的值
                        fliterpoint: this.points_list,
                        point: final_point,
                    },
                }).then((res) => {
                    console.log(res);
                });

                this.choose_btn();

                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.del_point = '';
                this.deldialogVisible = false
                this.errpoint = false;
            },

            //增加知识点
            update(data) {
                this.editdialogVisible = true
                this.points_list = data.course_points
                this.idx_list = data.course_ablity
            },
            edit() {
                //知识点掌握情况
                let pl_ = this.points_list.split(',')
                pl_.push(this.edit_point)
                let final_point = pl_.join(',')

                this.$http({
                    method: "post",
                    url: "/dbapi/update2",
                    //修改条件
                    data: {
                        //第一个值替换对象，第二个值是替换后的值
                        fliterpoint: this.points_list,
                        point: final_point,
                    },
                }).then((res) => {
                    console.log(res);
                });

                this.choose_btn();

                this.$message({
                    message: '新增成功',
                    type: 'success'
                })

                this.editdialogVisible = false
            },
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