import Vue from 'vue'
// import { Button } from 'element-ui'
// import {Form,FormItem} from 'element-ui'
// import {Input} from 'element-ui'
// //导入弹框提示
// import {Message} from  'element-ui'

import {
    Button, Form, FormItem, Input, Container, Header, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem, Breadcrumb, BreadcrumbItem,
    Card, Row, Col, Table, TableColumn, Switch, Pagination, Dialog, Message, MessageBox, Tag, Upload, Descriptions, DescriptionsItem, Radio, Rate, Loading
} from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Upload)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Radio)
Vue.use(Rate)
Vue.use(Loading)
//挂载
Vue.prototype.$message = Message

