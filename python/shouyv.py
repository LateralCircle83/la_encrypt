"""
  第一次写python,不会搞
  所以全是函数没有变量
"""

import random
def outfurr(_input,_sign):
  def getSign(output_, i_1, i_2, input_):
    return (i_1 == 4 and output_) or (len(input_[i_1]) > i_2 and getSign({**output_,input_[i_1][i_2]:i_1},i_1,i_2+1,input_)) or getSign(output_,i_1+1,0,input_)
  def getMc(left,right,sign):
    return [hex(int(sign[left[0]]) * 4 + int(sign[left[1]]) - int(sign[right[1]]) + ((int(sign[left[1]]) - int(sign[right[1]]) < 0) and 4 or 0))[2:],hex((int(sign[right[0]]) - int(sign[left[0]]) + ((int(sign[right[0]]) - int(sign[left[0]]) < 0 and 4) or 0)) * 4 + int(sign[right[1]]))[2:]]
  def for_del_mi(output_,i_,input_,sign_):
    return (i_ == len(input_) / 2 and output_) or for_del_mi(output_[:int(i_ / 2)]+getMc(input_[i_:i_ + 2], input_[-i_ - 2 + len(input_):len(input_) - i_], sign_)+output_[int(i_/2):], i_ + 2, input_, sign_)
  def for_uncommon(output_,i_,input_):
    return (i_ == len(input_) and output_) or for_uncommon(output_+[chr(int("".join(input_[i_: i_ + 4]), 16))], i_ + 4, input_)
  return "".join(for_uncommon([],0,for_del_mi([],0,_input,getSign({},0,0,_sign))))
#print(outfurr("喵嗷喵咪喵咪嗷呜嗷呜喵咪嗷咪喵呜嗷呜喵咪喵咪呜嗷呜喵喵嗷喵咪呜呜嗷嗷喵嗷喵咪喵呜嗷喵嗷嗷嗷咪呜嗷",[["喵", "嗷"], ["呜"], ["~"], ["咪"]]))
def infurr(_input,_sign):
  _sign.append(_sign)
  def getMv(left,right,sign):
    def random_(data):
      return data[random.randint(0,len(data)-1)]
    return [random_(_sign[int(int(left,16) / 4)]) + random_(_sign[int(left,16) % 4 + int(right,16) % 4]),random_(_sign[int(int(right,16) / 4 + int(int(left,16) / 4))]) + random_(_sign[int(right,16) % 4])]
  def add0(str_):
    return ((len(str_) == 2) and f"00{str_}") or ((len(str_) == 3) and f"0{str_}") or str_
  def for_common(output_,i_,input_):
    return (i_ == len(input_) and output_) or for_common(output_+[add0(hex(ord(input_[i_]))[2:])], i_ + 1, input_)
  def for_add_mi(output_,i_,input_):
    return (i_ == int(len(input_) / 2) and output_) or for_add_mi(output_[:i_]+getMv(input_[i_], input_[len(input_) - 1 - i_], _sign)+output_[i_:], i_ + 1, input_)
  return "".join(for_add_mi([],0,"".join(for_common([],0,_input))))
#print(infurr("114514",[["喵", "嗷"], ["呜"], ["~"], ["咪"]]))
signn=[["喵", "嗷"], ["呜"], ["~"], ["咪"]]
print(infurr("114514",signn))
"""print((input("in/de:")=="de" and outfurr(input("输入:"),signn))or infurr(input("输入:"),signn))
def infurr(_input,_sign=None,d={},mode=None):
  return (mode==None and infurr(_input,_sign+_sign,{"output_":[],"i_":0},"for_common"))or(mode=="for_common" and ((d["i_"] == len(_input) and infurr("".join(d["output_"]),_sign,{"output_":[],"i_":0},"for_common")) or infurr(_input,_sign,{"output_":d["output_"]+[infurr(hex(ord(_input[d["i_"]]))[2:],,,"add0")],"i_":d["i_"]+1}, mode)))or(mode=="for_common" and ((d["i_"] == int(len(_input) / 2) and "".join(d["output_"])) or infurr(_input,_sign,{"output_":d["output_"][:d["i_"]]+infurr({"left":_input[d["i_"]], "right":_input[len(_input) - 1 - d["i_"]]}, _sign,,"getMv")+d["output_"][d["i_"]:], "i_":d["i_"] + 1},mode)))or(mode=="add0"&&(((len(_input) == 2) and f"00{_input}") or ((len(_input) == 3) and f"0{_input}") or _input))or(mode=="getMv"&&([infurr(_sign[int(int(_input["left"],16) / 4)],,,"random") + infurr(_sign[int(_input["left"],16) % 4 + int(["right"],16) % 4],,,"random"),infurr(_sign[int(int(_input["right"],16) / 4 + int(int(_input["left"],16) / 4))],,,"random") + infurr(_sign[int(_input["right"],16) % 4],,,"random")]))or(mode=="random"&&_input[random.randint(0,len(_input)-1)])
"""
