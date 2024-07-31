"""
  既然这样就写成脚本吧
"""

#解密部分
def outfurr(_input,_sign=None,d={},mode=None):
  return (mode==None and outfurr(_input,outfurr(_sign,None,{"output_":{},"i_1":0,"i_2":0},"getSign"),{"output_":[],"i_":0},"for_del_mi"))or(mode=="for_del_mi" and ((d["i_"] == len(_input) / 2 and outfurr(d["output_"],None,{"output_":[],"i_":0},"for_uncommon")) or outfurr(_input,_sign,{"output_":d["output_"][:int(d["i_"] / 2)]+outfurr({"left":_input[d["i_"]:d["i_"] + 2], "right":_input[-d["i_"] - 2 + len(_input):len(_input) - d["i_"]]}, _sign,None,"getMc")+d["output_"][int(d["i_"]/2):],"i_":d["i_"] + 2}, "for_del_mi")))or(mode=="for_uncommon" and ((d["i_"] == len(_input) and "".join(d["output_"])) or outfurr(_input,None,{"output_":d["output_"]+[chr(int("".join(_input[d["i_"]: d["i_"] + 4]), 16))],"i_": d["i_"] + 4}, "for_uncommon")))or(mode=="getSign" and ((d["i_1"] == 4 and d["output_"]) or (len(_input[d["i_1"]]) > d["i_2"] and outfurr(_input,None,{"output_":{**d["output_"],_input[d["i_1"]][d["i_2"]]:d["i_1"]},"i_1":d["i_1"],"i_2":d["i_2"]+1},"getSign")) or outfurr(_input,None,{"output_":d["output_"],"i_1":d["i_1"]+1,"i_2":0},"getSign")))or(mode=="getMc" and [hex(int(_sign[_input["left"][0]]) * 4 + int(_sign[_input["left"][1]]) - int(_sign[_input["right"][1]]) + ((int(_sign[_input["left"][1]]) - int(_sign[_input["right"][1]]) < 0) and 4 or 0))[2:],hex((int(_sign[_input["right"][0]]) - int(_sign[_input["left"][0]]) + ((int(_sign[_input["right"][0]]) - int(_sign[_input["left"][0]]) < 0 and 4) or 0)) * 4 + int(_sign[_input["right"][1]]))[2:]])
#加密部分
import random
def infurr(_input,_sign=None,d={},mode=None):
  return (mode==None and infurr(_input,_sign+_sign,{"output_":[],"i_":0},"for_common"))or(mode=="for_common" and ((d["i_"] == len(_input) and infurr("".join(d["output_"]),_sign,{"output_":[],"i_":0},"for_add_mi")) or infurr(_input,_sign,{"output_":d["output_"]+[infurr(hex(ord(_input[d["i_"]]))[2:],None,None,"add0")],"i_":d["i_"]+1}, mode)))or(mode=="for_add_mi" and ((d["i_"] == int(len(_input) / 2) and "".join(d["output_"])) or infurr(_input,_sign,{"output_":d["output_"][:d["i_"]]+infurr({"left":_input[d["i_"]], "right":_input[len(_input) - 1 - d["i_"]]}, _sign,None,"getMv")+d["output_"][d["i_"]:], "i_":d["i_"] + 1},mode)))or(mode=="add0" and (((len(_input) == 2) and f"00{_input}") or ((len(_input) == 3) and f"0{_input}") or _input))or(mode=="getMv" and([infurr(_sign[int(int(_input["left"],16) / 4)],None,None,"random") + infurr(_sign[int(_input["left"],16) % 4 + int(_input["right"],16) % 4],None,None,"random"),infurr(_sign[int(int(_input["right"],16) / 4 + int(int(_input["left"],16) / 4))],None,None,"random") + infurr(_sign[int(_input["right"],16) % 4],None,None,"random")]))or(mode=="random" and _input[random.randint(0,len(_input)-1)])



#获取输入
def getAction_termux(_as=None,_data=None):
  def clip(__data):
    print(__data)
    termux_api.clipbard_set(__data)
    termux_api.toast("已复制到剪切板")
    return ((termux_api.confirm("继续？"))["back"]and getAction_termux())or exit()
  return (not _as)and getAction_termux(["in","de"][(termux_api.radio(["in","de"],"加密or解密"))["back"]],(termux_api.text("操作字符","输入","m"))["back"])or(_as=="de"and clip(outfurr(_data,[["喵", "嗷"], ["呜"], ["~"], ["咪"]])))or(clip(infurr(_data,[["喵", "嗷"], ["呜"], ["~"], ["咪"]])))

def getAction_line(_as=None,_data=None):
  def clip(__data):
    print(__data)
    pyperclip.set(__data)
    getAction_line()
  return ((not _as) and getAction_line(input("in/de:"),input("输入:")))or(_as=="de"and clip(outfurr(_data,[["喵", "嗷"], ["呜"], ["~"], ["咪"]])))or(clip(infurr(_data,[["喵", "嗷"], ["呜"], ["~"], ["咪"]])))


import termux_api
if termux_api.isTermux:
  getAction_termux()
else:
  import pyperclip
  getAction_line()
