<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <!-- 添加角色区域 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="btn">添加角色</el-button>
                    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                        <span>
                            <el-form label-width="70px">
                                <el-form-item label="角色名称">
                                    <el-input placeholder="输入角色名称" v-model="input1"></el-input>
                                </el-form-item>

                                <el-form-item label="角色描述">
                                    <el-input placeholder="输入角色相关权限" v-model="input2"></el-input>
                                </el-form-item>
                            </el-form>
                        </span>

                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>


                        </span>
                    </el-dialog>
                </el-col>
            </el-row>
            <!-- 展示列表区域 -->
            <el-table :data='rolelist' border stripe>
                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="item1 in scope.row.children" :key='item1.id'>
                            <!-- 渲染一级权限 -->
                            <el-col :span='5'>
                                <el-tag>{{item1.authName}}</el-tag>
                                <i class=el-icon-caret-right></i>

                            </el-col>
                            <!-- 渲染二级权限,三级权限 -->
                            <el-col :span='19'>
                                <!-- 通过for循环渲染二级权限 -->
                                <el-row v-for="item2 in item1.children" :key="item2.id">

                                    <el-col :span='6'>
                                        <el-tag type="success">{{item2.authName}}</el-tag>
                                        <i class=el-icon-caret-right></i>

                                    </el-col>

                                    <el-col :span='18'>
                                        <el-tag v-for="item3 in item2.children" :key="item3.id"
                                            type="warning">{{item3.authName}}</el-tag>

                                    </el-col>

                                </el-row>
                            </el-col>


                        </el-row>
                        <!-- <pre>
                                {{scope.row}} 
                            </pre> -->

                    </template>
                </el-table-column>
                <!-- 索引列 -->

                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>

            </el-table>

        </el-card>



    </div>
</template>

<script>
    export default {
        data() {
            return {
                rolelist: [],
                dialogVisible: false,
                input1: '',
                input2: ''
            }
        },
        created() {
            this.getRoleslist()
        },

        methods: {
            //获取权限列表
            async getRoleslist() {
                const { data: res } = await this.$http.get('roles')
                if (res.meta.status !== 200) return this.$message.error('获取角色列表失败');
                this.rolelist = res.data
                console.log(this.rolelist)
            },

            btn() {
                this.dialogVisible = true

            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => { });
            },
        }

    }
</script>

<style lang="less" scoped>
    .el-tag {
        margin: 7px;
    }
</style>