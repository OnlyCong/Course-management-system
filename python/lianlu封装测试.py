import operator
import numpy as np
import networkx as nx
import random
import math
from matplotlib import pyplot as plt
from networkx.algorithms import bipartite
from bigraph.bigraph import pa_predict,jc_predict,cn_predict
from bigraph.preprocessing import import_files,make_graph
from sklearn.metrics import consensus_score
from sknetwork.ranking import BiPageRank 
from sknetwork.ranking import Katz
from networkx.algorithms import bipartite


#建图
def loadData1(file_name):   ## load data(针对csv)
    edges = []
    with open(file_name,encoding='utf-8-sig') as f:
        line = f.readlines()
        for i in line:
            line = i.strip('\n') 
            line = i.split(',')
            edge = (int(float(line[0])),int(float(line[1])))
            edges.append(edge)
    f.close() 
    return edges

def ger_graph():
    edges=loadData1('D:\研究生资料\研一\课程数据测试\data_all\data1000.csv') 
    B=nx.Graph()
    nodes1=[]
    nodes2=[]
    for i in range(0,1001):     
        nodes1.append(i)
    for i in range(82535,83148):
        nodes2.append(i)

    B.add_nodes_from(nodes1,bipartite=0)
    B.add_nodes_from(nodes2,bipartite=1)
    B.add_edges_from(edges)
    print(B.size())
    hidden_edges=random.sample(edges,711) #随机隐藏n%数量的边
    B.remove_edges_from(hidden_edges)

    return B



def ger_keylist(pp,n1,n2):
    key=pp.keys()
    key_list=[]
    list1=[]
    for i in range (n1,n2):   
        list1=list(filter(lambda x:i in x,key))
        key_list.append(list1)
    return key_list

#对原字典切片
def ger_dic(key_list,pp): #键值的列表切片，预测后的排名字典
    dic_list=[]
    k=0
    for i in key_list:
        # k+=1
        # print(k)
        dic2={}
        for j in range(len(i)):
            dic1={i[j]:pp[i[j]]}
            #print(dic1)
            dic2.update(dic1)
        dic_list.append(dic2)
    return dic_list

def ger_pre_edge(n,dicts,p): #将每个节点，分数最高的边整合,p(前p个)
    pre=[]
    p1=[]
    for i in range(n):
        sort_dic = dict(sorted(dicts[i].items(), key=operator.itemgetter(1),reverse=True)) #按照vaule值排序
        p1=list(sort_dic.keys())[:p]
        pre+=p1
    return pre 

def new_B(new_edge):
    edges=loadData1('D:\研究生资料\研一\课程数据测试\data_all\data1000.csv') 
    
    nums=len(new_edge)
    for i in range(nums):
        edges.append(new_edge[i])    
        
    B=nx.Graph()
    nodes1=[]
    nodes2=[]
    res_list = [x[0] for x in new_edge]
    add_node=len(set(res_list))
    node_num=1001+add_node
    

    for i in range(0,node_num):     
        nodes1.append(i)
    for i in range(82535,83148):
        nodes2.append(i)

    # print(len(edges))
    B.add_nodes_from(nodes1,bipartite=0)
    B.add_nodes_from(nodes2,bipartite=1)
    B.add_edges_from(edges)

    num=B.size()
    print(num)
    hidden_num=math.floor(num/10)
    hidden_edges=random.sample(edges,hidden_num) #随机隐藏n%数量的边
    B.remove_edges_from(hidden_edges)

    return B,node_num


# def ger_dic(pp,n1,n2): #将评分的生成的字典排序 (这个函数不用)
#     it = iter(pp.keys())
#     list_ = []
#     k = 0
#     for i in range(n1,n2):   
#         dict_={}
#         for j in range(k,len(pp)):
#             if list(pp.keys())[j][0] == i:
#                 x = next(it)
#                 dict_[x] = pp[x]
#                 k +=1
#             else:
#                 break
#         print(dict_)
#         print(len(list(dict_.keys())))
#         list_.append(dict_)
#     return list_


# # #pa_predict,主函数
# B=ger_graph()
# # print(B.size())
# pa=pa_predict(B) #预测的是暂时未连接的边
# # print(pa)
# key_list=ger_keylist(pa,0,1001)#对键值进行节点切片
# # print(key_list)
# # print(key_list[0])
# pp1=ger_dic(key_list,pa)#对字典查找，建立新的切片
# # print(pp1[0])
# # pre1=ger_pre_edge(1001,pp1,57)#课程数;新的切片字典;评分前n的键值
# # print('end')
# pre_vue=ger_pre_edge(1001,pp1,3)#课程数;新的切片字典;评分前n的键值
# print(pre_vue)
# # np.savetxt('.\pa预测链接.txt',pre_vue,fmt='%d')


#测试加入新的边
new_edge=[(1001,82535),(1001,82536)]

B,new_node=new_B(new_edge)
print(new_node)
print(B.size())
pa=pa_predict(B) #预测的是暂时未连接的边


key_list=ger_keylist(pa,0,new_node)#对键值进行节点切片
pp1=ger_dic(key_list,pa)#对字典查找，建立新的切片
pre_vue=ger_pre_edge(new_node,pp1,3)#课程数;新的切片字典;评分前n的键值
print(pre_vue)
















# #jc_predict
# pj=jc_predict(B) #预测的是暂时未连接的边          
# key_list=ger_keylist(pj,82535,83148)#对键值进行节点切片
# pp2=ger_dic(key_list,pj)#对字典切片
# pre2=ger_pre_edge(613,pp2,99)#课程数;新的切片字典;评分前n的键值 v                                                  
# c2 = [x for x in hidden_edges if x in pre2]
# print(len(c2)/711)



# # # # #cn_predict
# pc=cn_predict(B) #预测的是暂时未连接的边
# key_list=ger_keylist(pc,82535,83148)#对键值进行节点切片
# pp3=ger_dic(key_list,pc)#对字典切片
# pre3=ger_pre_edge(613,pp3,99)#课程数;新的切片字典;评分前n的键值
# # print(len(pre3))
# c3 = [x for x in hidden_edges if x in pre3]
# print(len(c3)/711)
















