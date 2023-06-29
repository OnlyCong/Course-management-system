from unittest import result
import flask
import json
import operator
import numpy as np
import networkx as nx
import random
import lianlu_test
from bigraph.bigraph import pa_predict,jc_predict,cn_predict


#后台启动 python server.py

#创建一个服务，把当前这个 python 文件当作一个服务
server= flask.Flask(__name__)
#配置路由
# @server.route()可以将普通函数转变为服务、接口的路径、请求方式，如果不写methods则默认get方法
#普通推荐
@server.route('/getData',methods=['post'])
def index():
    data = flask.request.data
    j_data =  json.loads(data)
    print("index=======", j_data)
    # value1是从页面中传过来的值
    value1=j_data['value1']
    print("value1", j_data['value1'])
    #主函数
    B=lianlu_test.ger_graph()  
    pa=pa_predict(B) #预测的是暂时未连接的边
    
    key_list=lianlu_test.ger_keylist(pa,0,1001)#对键值进行节点切片

    pp1=lianlu_test.ger_dic(key_list,pa)#对字典查找，建立新的切片
    # pre1=ger_pre_edge(1001,pp1,57)#课程数;新的切片字典;评分前n的键值
    pre_vue=lianlu_test.ger_pre_edge(1001,pp1,3)#课程数;新的切片字典;评分前n的键值

    value1=int(value1)
    f=get_res(value1,pre_vue)
    # f=get_res(value1)

    return json.dumps({"msg":"接口调用成功","data":f,"code":0},  ensure_ascii=False)

def get_res(value,target):
    # target=[[1,2],[1,3],[1,4],[5,9]]
    t1=[i for i in target if i[0]==value]
    print(t1)
    res=[]
    for i in t1:
        c=i[1]
        res.append(c)
    res=",".join('%s' %id for id in res)
    return res


#新用户推荐
@server.route('/getData2',methods=['post'])

def index2():
    data = flask.request.data
    j_data =  json.loads(data)
    print("index=======", j_data)
    # value2是从页面中传过来的值
    value2=j_data['value2']
    value3=j_data['value3']
    # print("value2", j_data['value2'])
    # print(value2,value3)
    #转换数据形式
    value2=int(value2)
    value3 = value3.strip(',').split(',')
    value3=list(map(int,value3))

    new_edge=ger_add_edge(value2,value3)
    # print(ger_add_edge)

    #主函数(从1001开始加)
    B,new_node=lianlu_test.new_B(new_edge)
    pa=pa_predict(B) #预测的是暂时未连接的边
    
    key_list=lianlu_test.ger_keylist(pa,0,new_node)#对键值进行节点切片

    pp1=lianlu_test.ger_dic(key_list,pa)#对字典查找，建立新的切片
    # pre1=ger_pre_edge(1001,pp1,57)#课程数;新的切片字典;评分前n的键值
    pre_vue=lianlu_test.ger_pre_edge(new_node,pp1,3)#课程数;新的切片字典;评分前n的键值

    # value1=int(value1)
    result=get_res(value2,pre_vue)

  
    return json.dumps({"msg":"接口调用成功","data":result,"code":0},  ensure_ascii=False)

def ger_add_edge(a,b):
    all_edges=[]
    for i in b:
        edges=(a,i)
        all_edges.append(edges)
    return all_edges



server.run(port=7777,debug=True,host='0.0.0.0')# 指定访问端口、host