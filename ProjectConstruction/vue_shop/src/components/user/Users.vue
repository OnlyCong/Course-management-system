<template>
    <div>
        <h3>
            <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>

            </el-breadcrumb>
            <!-- 卡片视图区域 -->
            <!-- 搜索与添加区 -->
            <el-card>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input placeholder="请输入内容" v-model="queryInfo.query">
                            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="addDialogVisible=true">添加用户</el-button>
                    </el-col>
                </el-row>
                <!-- 用户列表区域 -->
                <el-table :data="userlist" border stripe>
                    <el-table-column type='index'></el-table-column>
                    <el-table-column label='姓名' prop="username"></el-table-column>


                    <el-table-column label='邮箱' prop="email"></el-table-column>
                    <el-table-column label='电话' prop="mobile"></el-table-column>
                    <!-- <el-table-column label='角色' prop="role_name"></el-table-column> -->

                    <el-table-column label='状态' prop="mg_state">
                        <template slot-scope='scope'>
                            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
                            </el-switch>
                        </template>

                        <!-- 分配按钮 -->
                    </el-table-column>
                    <el-table-column label='操作' width="220px">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="min"
                                @click="showedit(scope.row.id)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" size="min"
                                @click="removeUserById(scope.row.id)"></el-button>



                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页区域 -->
                <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum" :page-sizes="[1, 5, 10, 15, 20]" :page-size="queryInfo.pagesize"
                    layout="total,sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>


            </el-card>

            <!-- 触发了添加用户按钮后的表单渲染,添加用户的对话框 -->
            <el-dialog title="添加用户" :visible.sync="addDialogVisible" @close="addDialogClosed" width="50%">
                <span>
                    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="用户名称" prop="username">
                            <el-input v-model="addForm.username"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input v-model="addForm.password"></el-input>
                        </el-form-item>

                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="addForm.email"></el-input>
                        </el-form-item>

                        <el-form-item label="电话" prop="mobile">
                            <el-input v-model="addForm.mobile"></el-input>
                        </el-form-item>
                    </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 修改用户的对话框 -->
            <el-dialog title="修改用户信息" :visible.sync="editdialogVisible" width="50%" @close="editdialogClosed">
                <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                    <el-form-item label="用户名">
                        <el-input v-model="editForm.username" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editForm.email"></el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="mobile">
                        <el-input v-model="editForm.mobile"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="editdialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="edituserinfo">确 定</el-button>
                </span>
            </el-dialog>

        </h3>
    </div>
</template>

<script>
    export default {
        data() {
            var checkEmail = (rule, value, cb) => {
                // 验证邮箱的正则表达式
                const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

                if (regEmail.test(value)) {
                    // 合法的邮箱
                    return cb()
                }

                cb(new Error('请输入合法的邮箱'))
            }

            // 验证手机号的规则
            var checkMobile = (rule, value, cb) => {
                // 验证手机号的正则表达式
                // const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                const regMobile = /^1[0-9]{10}$/

                if (regMobile.test(value)) {
                    return cb()
                }

                cb(new Error('请输入合法的手机号'))
            }
            return {
                //获取用户列表的参数对象
                queryInfo: {
                    query: '',
                    //当前的页数
                    pagenum: 1,
                    //当前每页显示2条数据
                    pagesize: 5
                },
                userlist: [],
                total: 0,
                //控制添加表单对话框的隐藏
                addDialogVisible: false,
                //添加用户的表单数据
                addForm: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''

                },
                //添加表单验证规则对象
                addFormRules: {
                    username: [
                        { require: true, message: '请输入用户名', trigger: 'blur' },
                        {
                            min: 3,
                            max: 10,
                            message: "用户名长度在3-10之间",
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {
                            min: 6,
                            max: 15,
                            message: '密码的长度在6~15个字符之间',
                            trigger: 'blur'
                        }
                    ],
                    email: [
                        { require: true, message: '请输入邮箱号', trigger: 'blur' },
                        { validator: checkEmail, trigger: 'blur' }
                    ],
                    mobile: [
                        { require: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: checkMobile, trigger: 'blur' }
                    ]
                },
                //修改用户对话框的显示和隐藏
                editdialogVisible: false,
                editForm: {},
                //修改表单的验证规则对象
                editFormRules: {
                    email: [
                        { require: true, message: '请输入邮箱号', trigger: 'blur' },
                        { validator: checkEmail, trigger: 'blur' }

                    ],
                    mobile: [
                        { require: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: checkMobile, trigger: 'blur' }
                    ]

                }


            }
        },
        saveAdd() {
            this.$refs['addParam'].validate(valid => {//此处为验证，refs里面为form表单的ref定义名称
                if (!valid) {//如果验证不通过，则不走下面的方法内容
                    return false;
                }
            })
        },



        created() {
            this.getUserList()
        },


        methods: {

            async getUserList() {

                const { data: res } = await this.$http.get('users', { params: this.queryInfo })

                if (res.meta.status !== 200) return this.$message.error('获取用户列表失败');

                this.userlist = res.data.users
                this.total = res.data.total
                console.log(res)
                console.log(this.queryInfo)

            },
            //监听pagesize的变换
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize
                this.getUserList()

            },
            //监听页码值的变化
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage
                this.getUserList()
            },

            //监听switch开关状态的改变
            async userStateChanged(userinfo) {
                console.log(userinfo)
                const { data: res } = await this.$http.put(
                    `users/${userinfo.id}/state/${userinfo.mg_state}`
                )
                if (res.meta.status !== 200) {
                    userinfo.mg_state = !userinfo.mg_state
                    return this.$message.error('失败');
                }
                this.$message.error('更新同步状态成功')

            },

            //监听添加新用户的对话框关闭事件
            addDialogClosed() {
                this.$refs.addFormRef.resetFields()
            },


            //单击事件添加新用户
            addUser() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return
                    const { data: res } = await this.$http.post('users', this.addForm)
                    if (res.meta.status !== 201) {
                        this.$message.error("失败")
                    }
                    this.$message.success('成功')
                    this.addDialogVisible = false
                    //刷新列表
                    this.getUserList()
                })
            },

            //展示编辑用户对话框
            async showedit(id) {
                console.log(id)
                const { data: res } = await this.$http.get('users/' + id)
                if (res.meta.status !== 200) return this.$message.error('查询用户信息失败');

                this.editdialogVisible = true
                this.editForm = res.data

            },
            //监听编辑用户对话框的关闭事件
            editdialogClosed() {
                this.$refs.editFormRef.resetFields()


            },

            //修改用户信息并提交,表单预验证
            edituserinfo() {
                this.$refs.editFormRef.validate(async valid => {
                    // console.log(valid)
                    if (!valid) return
                    //发起数据请求
                    const { data: res } = await this.$http.put('users/' + this.editForm.id, {
                        email: this.editForm.email,
                        mobile: this.editForm.mobile
                    })
                    console.log(res)
                    if (res.meta.status !== 200) return this.$message.error('更新用户信息失败');
                    else {
                        //更新成功了，就关闭对话框，刷新数据列表
                        this.editdialogVisible = false
                        this.getUserList()
                        this.$message.success('更新用户信息成功')
                    }

                })
            },
            // 根据Id删除对应的用户信息
            async removeUserById(id) {
                // 询问用户是否删除用户
                const confirmRusult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '永久删除该用户', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
                console.log(confirmRusult)
                // 用户点击了删除,则返回字符串 confirm
                // 用户取消了删除,则返回字符串 cancel
                if (confirmRusult !== 'confirm') {
                    return this.$message.info('已经取消了删除')
                }
                this.$http.delete('users/' + id).then(res => {
                    const { data: response } = res
                    console.log(response)
                    if (response.meta.status !== 200) {
                        return this.$message.error('该用户删除失败')
                    }
                    this.$message.success('该用户已经删除')
                    this.getUserList()
                })
            },


        }


    }

</script>


<style lang='less' scoped>
    .el-card {
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15) !important;
    }

    .el-table {
        margin-top: 15px;
        font-size: 12px;
    }
</style>