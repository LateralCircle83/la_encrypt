import json
import subprocess
import os

##########is termux#########

def isTermux():
  return os.path.exists("/data/data/com.termux")

###########termux api ui##########

root_co="termux-dialog"
def cmd(_input):
  resp=subprocess.run(_input,stdout=subprocess.PIPE,text=True)
  return json.loads(resp.stdout)
def callback(c,d):
  return {"code":c,"back":d}
"""返回格式标准
    return({返回码，数据})
"""
"""yes or no的对话框
    {'code': 0, 'text': 'no'}
"""
def confirm(_i=None,_t=None):
  #resp= subprocess.run([root_co,"confirm"]+((_i and ["-i",_i])or [])+((_t and ["-t",_t])or[]),stdout=subprocess.PIPE,text=True)
  data=cmd([root_co,"confirm"]+((_i and ["-i",_i])or [])+((_t and ["-t",_t])or[]))
  return callback(data["code"]==0,data["text"]=="yes")
  #return json.loads(resp.stdout)
#print(confirm("index","title"))

"""复选框
{'code': -1, 'text': '[no1, no2]', 'values': [{'index': 0, 'text': 'no1'}, {'index': 1, 'text': 'no2'}]}
"""
def checkbox(_v,_t=None):
  #resp=subprocess.run([root_co,"checkbox","-v",",".join(_v)]+((_t and ["-t",_t])or[]),stdout=subprocess.PIPE,text=True)
  data=cmd([root_co,"checkbox","-v",",".join(_v)]+((_t and ["-t",_t])or[]))
  l_d=[]
  for s in data["values"]:
    l_d.append(s["index"])
  return callback(data["code"]==-1,l_d)
  #return json.loads(resp.stdout)
#print(checkbox(["no1","no2"],"title"))

"""数字选择器
{'code': -1, 'text': '4'}
[最小，最大，默认]
"""
def counter(_r=None,_t=None):
  #resp=subprocess.run([root_co,"counter"]+((_r and ["-r",",".join([str(_r[0]),str(_r[1]),str(_r[2])])])or[])+((_t and ["-t",_t])or[]),stdout=subprocess.PIPE,text=True)
  data=cmd([root_co,"counter"]+((_r and ["-r",",".join([str(_r[0]),str(_r[1]),str(_r[2])])])or[])+((_t and ["-t",_t])or[]))
  return callback(data["code"]==-1,int(data["text"]))
  #return json.loads(resp.stdout)
#print(counter([0,10,5],"title"))
"""日期选择器
{'code': -1, 'text': '2024-07-30'}
"""
def date(_d=None,_t=None):
  #resp=subprocess.run([root_co,"date"]+((_d and ["-d",_d])or[])+((_t and ["-t",_t])or[]),stdout=subprocess.PIPE,text=True)
  data=cmd([root_co,"date"]+((_d and ["-d",_d])or[])+((_t and ["-t",_t])or[]))
  return callback(data["code"]==-1,data["text"])
  #return json.loads(resp.stdout)
#print(date("yyyy-MM-dd","title"))

"""单选框
{'code': -1, 'text': 'no1', 'index': 0}
"""
def radio(_v,_t=None):
  #resp=subprocess.run([root_co,"radio","-v",",".join(_v)]+((_t and ["-t",_t])or[]),stdout=subprocess.PIPE,text=True)
  data=cmd([root_co,"radio","-v",",".join(_v)]+((_t and ["-t",_t])or[]))
  return callback(data["code"]==-1,data["index"])
  #return json.loads(resp.stdout)
#print(radio(["no1","no2"],"title"))

"""底部单选框
{'code': 0, 'text': 'on1', 'index': 0}
"""
def sheet(_v,_t=None):
  #resp=subprocess.run([root_co,"sheet","-v",",".join(_v)]+((_t and ["-t",_t])or[]),stdout=subprocess.PIPE,text=True)
  data=cmd([root_co,"sheet","-v",",".join(_v)]+((_t and ["-t",_t])or[]))
  return callback(data["code"]==0,data["index"])
  #return json.loads(resp.stdout)
#print(sheet(["on1","on2"],"title"))

"""下拉框单选
{'code': -1, 'text': 'on2', 'index': 1}
"""
def spinner(_v,_t=None):
  #resp=subprocess.run([root_co,"spinner","-v",",".join(_v)]+((_t and ["-t",_t])or[]),stdout=subprocess.PIPE,text=True)
  data=cmd([root_co,"spinner","-v",",".join(_v)]+((_t and ["-t",_t])or[]))
  return callback(data["code"]==-1,data["index"])
  #return json.loads(resp.stdout)
#print(spinner(["on1","on2"],"title"))

"""输入框
{'code': -1, 'text': 'answer', 'index': 1}
-mn 多行/数字   -p 密码
"""
def text(_i=None,_t=None,_mn=None,_p=None):
  #resp=subprocess.run([root_co,"text"]+((_i and ["-i",_i])or[])+((_mn=="m"and ["-m"])or(_m=="n"and ["-n"])or[])+((_p and ["-p"])or[])+((_t and ["-t",_t])or[]),stdout=subprocess.PIPE,text=True)
  data=cmd([root_co,"text"]+((_i and ["-i",_i])or[])+((_mn=="m"and ["-m"])or(_mn=="n"and ["-n"])or[])+((_p and ["-p"])or[])+((_t and ["-t",_t])or[]))
  return callback(data["code"]==-1,data["text"])
  #return json.loads(resp.stdout)
#print(text("提示","title","m",False))

"""时间选择器
{'code': -1, 'text': '20:40', 'index': 1}
"""
def time(_t=None):
  #resp=subprocess.run([root_co,"time"]+((_t and ["-t",_t])or[]),stdout=subprocess.PIPE,text=True)
  data=cmd([root_co,"time"]+((_t and ["-t",_t])or[]))
  return callback(data["code"]==-1,data["text"])
  #return json.loads(resp.stdout)
#print(time("title"))

"""外
"""
def toast(_t,_b=None,_c=None,_g=None):
  subprocess.run(["termux-toast"]+((_b and ["-b",_b])or[])+((_c and ["-c",_c])or[])+((_g and ["-g",_g])or[])+[_t])
  return
#toast("hellow termux","white","black","top")

###########clipbard############

def clipbard_get():
  data=subprocess.run(["termux-clipboard-get"],stdout=subprocess.PIPE,text=True)
  return data.stdout

def clipbard_set(_data):
  subprocess.run(["termux-clipboard-set",_data],stdout=subprocess.PIPE,text=True)
  return