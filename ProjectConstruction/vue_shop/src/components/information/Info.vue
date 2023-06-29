<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>学校信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>学校相关信息</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="font-size: 16px; font-weight:bold;">学校相关信息</span>
            </div>
            <el-descriptions title="">
                <el-descriptions-item label="学校名称">xxx职业技术学院</el-descriptions-item>
                <el-descriptions-item label="联系电话">0571-86915114</el-descriptions-item>
                <el-descriptions-item label="所在地">xx市</el-descriptions-item>
                <el-descriptions-item label="备注">
                    <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="学校地址">xx省xx市xxx</el-descriptions-item>
            </el-descriptions>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="font-size: 16px; font-weight:bold;">学校简介</span>
            </div>
            <div class="poster">
                <div class="poster-left">
                    <div class="poster-top">
                        <div style="width:0;height:0;clear:both"></div>
                        <div class="lemma-summary J-summary" label-module="lemmaSummary">
                            <div class="para" label-module="para" data-id="gntwjelce3" data-pid="1">
                                杭州电子科技大学（Hangzhou Dianzi
                                University），简称“杭电”，位于杭州市，是浙江省人民政府与国防科技工业局共建高校，是一所电子信息特色突出，经管学科优势明显，工、理、经、管、文、法、艺等多学科相互渗透的教学研究型大学，是浙江省首批重点建设的5所高校之一，是省属高校中唯一拥有国防特色重点专业的高校，是长三角高水平行业特色大学联盟成员，入选国家“111计划”、教育部“卓越工程师教育培养计划”、“国家级大学生创新创业训练计划”、“国家级新工科研究与实践项目”、“国家级特色专业建设点”、“全国毕业生就业典型经验高校，是博士学位授予单位，具有硕士推免权和全球雅思考点。对口支援衢州学院。
                            </div>
                            <div class="para" label-module="para" data-id="gntwjelcfu" data-pid="2">
                                学校始创于1956年，初名杭州航空工业财经学校，而后历经杭州航空工业学校、浙江电机专科学校、浙江机械工业学校、杭州无线电工业管理学校、杭州无线电工业学校等时期，1980年经国务院批准改建为杭州电子工业学院，先后隶属于机械工业部、电子工业部和信息产业部等中央部委，2003年原杭州出版学校整体并入，2004年更名为杭州电子科技大学。
                            </div>
                            <div class="para" label-module="para" data-id="gntwjelchh" data-pid="3">
                                截至2023年2月，学校有下沙、文一、东岳、下沙东及青山湖等5个校区，占地面积2500余亩；设有19个学院及教学单位，举办1所独立学院，开设45个本科招生专业；拥有9个一级学科博士点，4个博士后科研流动站，19个一级学科硕士点，18个专业学位硕士点；有全日制在校学生28000余人；全校教职工2600余人，专任教师2000余人。
                            </div>
                        </div>
                    </div>
                    <div class="poster-bottom">
                        <div class="baseBox">
                            <div class="dl-baseinfo">
                                <dl class="">
                                    <dt>创办时间</dt>
                                    <dd class="collapseDD" title="1956年">
                                        1956年
                                    </dd>
                                </dl>
                                <dl class=" bottomLine">
                                    <dt>主管部门</dt>
                                    <dd class="collapseDD" title="浙江省">
                                        浙江省
                                    </dd>
                                </dl>
                            </div>
                            <div class="dl-baseinfo">
                                <dl class="">
                                    <dt>知名校友</dt>
                                    <dd class="collapseDD" title="王东升、戴珊、刘体斌、郑钧">
                                        王东升、戴珊、刘体斌、郑钧
                                    </dd>
                                </dl>
                                <dl class=" bottomLine">
                                    <dt>学校官网</dt>
                                    <dd class="collapseDD" title="http://www.hdu.edu.cn">
                                        <a target="_blank" href="http://www.hdu.edu.cn"
                                            data-log="text">http://www.hdu.edu.cn</a>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="poster-right">
                    <div class="summary-pic">
                        <img src="@/assets/HDU.png" alt="杭州电子科技大学">
                    </div>
                </div>
            </div>
        </el-card>
    </div>

</template>

<script>
    // import XLSX from 'xlsx'

    export default {

        data() {
            return {


            }
        }
    }

</script>

<style lang="less" scoped>
    .el-descriptions {
        padding-left: 50px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
<style src="./HDU.css"></style>