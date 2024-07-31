/**
 *我不喜欢变量与if和for，于是不用了
*/

/*function forxh(list,i,sign){
  return (i==sign.length&&list)||forxh(list.concat(sign[i]),i+1,sign)
}*/
//console.log(forxh([],0,[1,2,3,4]))
function infurr(input, sign) {
  function getMv(left, right, sign) {
    function random(data) {
      return data[Math.floor(data.length * Math.random())];
    };
    return [random(sign[Math.floor(parseInt(`0x${left}`) / 4)]) + random(sign[parseInt(`0x${left}`) % 4 + parseInt(`0x${right}`) % 4]),
      random(sign[Math.floor(parseInt(`0x${right}`) / 4 + Math.floor(parseInt(`0x${left}`) / 4))]) + random(sign[parseInt(`0x${right}`) % 4])];
  };

  function add0(str) {
    return ((str.length === 2) && `00${str}`) || ((str.length === 3) && `0${str}`) || str;
  };
  function for_common(output_, i_, input_) {
    //console.log(output_)
    return (i_ == input_.length && output_) || for_common(output_.concat(add0(input[i_].charCodeAt(0).toString(16))), i_+1, input_);
  };
  function for_add_mi(output_, i_, input_) {
    //console.log(output_)
    return (i_ == input_.length/2 && output_) || for_add_mi([...output_.slice(0, i_), ...getMv(input_[i_], input_[input_.length - 1 - i_], sign), ...output_.slice(i_)], i_+1, input_);
  };
  sign.push(...sign);
  //let data = [],
  /*list = []; list_one = [],
  list_two = [],*/
  /*for (let i = 0; i < input.length; i++) {
    data.push(add0(input[i].charCodeAt(0).toString(16)));
    continue;
  };*/
  //console.log(for_add_mi([],0,for_common([],0,input).join("")))
  return for_add_mi([], 0, for_common([], 0, input).join("")).join("");
  //data = data.join("");
  /*for (let i = 0, len = data.length; i < len / 2; i++) {
    //list_one.push(getMv(data[i], data[len - 1 - i], sign)[0]);
    //list_two.unshift(getMv(data[i], data[len - 1 - i], sign)[1]);
    list.splice(i, 0, getMv(data[i], data[len - 1 - i], sign)[0], getMv(data[i], data[len - 1 - i], sign)[1]);
    continue;
  };*/
  //list_one.push(...list_two);
  //return list_one.join("");
  //return list.join("");
};
console.log(infurr("哥垮瓜框过宽沟", [["嗷", "喵"], ["呜"], ["啊"], ["~"]]))

//兽音解密
function outfurr(input, sign) {
  function getMc(left, right, sign) {
    /*let d = [parseInt(sign[left[0]]),
      parseInt(sign[left[1]]),
      parseInt(sign[right[0]]),
      parseInt(sign[right[1]])];*/
    /*return [(d[0] * 4 + d[1] - d[3] + ((d[1] - d[3] < 0) && 4 || 0)).toString(16),
      ((d[2] - d[0] + ((d[2] - d[0] < 0 && 4) || 0)) * 4 + d[3]).toString(16)];*/
    return [(parseInt(sign[left[0]]) * 4 + parseInt(sign[left[1]]) - parseInt(sign[right[1]]) + ((parseInt(sign[left[1]]) - parseInt(sign[right[1]]) < 0) && 4 || 0)).toString(16),
      ((parseInt(sign[right[0]]) - parseInt(sign[left[0]]) + ((parseInt(sign[right[0]]) - parseInt(sign[left[0]]) < 0 && 4) || 0)) * 4 + parseInt(sign[right[1]])).toString(16)];
  };
  /*let resign = {},
  list_one = [],*/
  /*list_two = [],*/
  //list = [];
  /*for (let i = 0; i < sign.length; i++) {
    for (let ele of sign[i]) {
      resign[ele] = String(i);
    };
    continue;
  };*/
  function getSign(output_, i_1, i_2, input_) {
    return (i_1 == 4 && output_) || (input_[i_1].length > i_2 && getSign({
      ...output_, ... {[input_[i_1][i_2]]: i_1
      }}, i_1, i_2+1, input_)) || getSign(output_, i_1+1, 0, input_);
  };
  //console.log(getSign({},0,0,[["嗷", "喵"], ["呜"], ["啊"], ["~"]]))
  /*for (let i = 0, len = input.length; i < len / 2; i += 2) {
    //list_one.push(getMc(input.slice(i, i + 2), input.slice(-i - 2 + len, len - i), resign)[0]);
    //list_two.unshift(getMc(input.slice(i, i + 2), input.slice(-i - 2 + len, len - i), resign)[1]);
    list_one.splice(i/2, 0, getMc(input.slice(i, i + 2), input.slice(-i - 2 + len, len - i), resign)[0], getMc(input.slice(i, i + 2), input.slice(-i - 2 + len, len - i), resign)[1]);
    continue;
  };*/
  function for_del_mi(output_, i_, input_, sign_) {
    return (i_ == input_.length/2 && output_) || for_del_mi([...output_.slice(0, i_/2), ...getMc(input_.slice(i_, i_ + 2), input_.slice(-i_ - 2 + input_.length, input_.length - i_), sign_), ...output_.slice(i_/2)], i_+2, input_, sign_);
  };
  //list_one.push(...list_two);
  /*for (let i = 0; i < list_one.length; i += 4) {
    list.push(String.fromCharCode(parseInt(list_one.slice(i, i + 4).join(""), 16)));
    continue;
  };
  return list.join("");*/
  function for_uncommon(output_, i_, input_) {
    return (i_ == input_.length && output_) || for_uncommon(output_.concat(String.fromCharCode(parseInt(input_.slice(i_, i_ + 4).join(""), 16))), i_+4, input_);
  };
  return for_uncommon([],0,for_del_mi([],0,input,getSign({},0,0,sign))).join("");
};

console.log(outfurr("呜喵呜呜~啊呜~呜啊呜啊啊呜~~呜啊呜喵~嗷~喵呜嗷啊喵~嗷啊啊呜喵啊~喵喵啊~嗷呜嗷~~~嗷呜啊啊啊喵~呜嗷~", [["嗷", "喵"], ["呜"], ["啊"], ["~"]]))
//console.log(getSign({}, 0, 0, [["嗷", "喵"], ["呜"], ["啊"], ["~"]]))
