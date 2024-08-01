//顺反加密主函数
function repart(input) {

  //for (var i=0,arout=[],arr=input.split(""),output;i<arr.length;i++,console.log(i)) arout.push(((i+1)%2&&(arr[i]))||(((arr.length%2 != 0)&&arr[arr.length-i-1])||arr[arr.length-i]))
  //return arout.join("")
  //for (var i=0,arout="",len=input.length;i<len;i++) arout+=(((i+1)%2&&(input[i]))||(((len%2 != 0)&&input[len-i-1])||input[len-i]))
  //return arout
  let arout = [];
  for (let i = 0, len = input.length; i < len; i++) {
    arout.push(((i + 1) % 2 && (input[i])) || (((len % 2 != 0) && input[len - i - 1]) || input[len - i]));
    continue;
  };
  return arout.join("");
}
//顺反加密接入
/*function reverse(data, sign) {
    if (data.length < sign) {
        return (repart(data))
    } else {
        let list = []
        for (let i = sign, len = data.length; len - i >= 0; i = i + sign) {
            list.push(repart(data.slice(i - sign, i)))
            continue
        }
        list.push(repart(data.slice(sign * list.length)) || "")
        return (list.join(""))
    }
}*/
//兽音加密
//const sign_d = [["嗷", "喵"], ["呜"], ["啊"], ["~"]]
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
  sign.push(...sign);
  let data = [],
  list = []; /*list_one = [],
  list_two = [],*/
  for (let i = 0; i < input.length; i++) {
    data.push(add0(input[i].charCodeAt(0).toString(16)));
    continue;
  };
  data = data.join("");
  for (let i = 0, len = data.length; i < len / 2; i++) {
    //list_one.push(getMv(data[i], data[len - 1 - i], sign)[0]);
    //list_two.unshift(getMv(data[i], data[len - 1 - i], sign)[1]);
    list.splice(i, 0, getMv(data[i], data[len - 1 - i], sign)[0], getMv(data[i], data[len - 1 - i], sign)[1]);
    continue;
  };
  //list_one.push(...list_two);
  //return list_one.join("");
  return list.join("");
};
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
  let resign = {},
  list_one = [],
  /*list_two = [],*/
  list = [];
  for (let i = 0; i < sign.length; i++) {
    for (let ele of sign[i]) {
      resign[ele] = String(i);
    };
    continue;
  };
  for (let i = 0, len = input.length; i < len / 2; i += 2) {
    //list_one.push(getMc(input.slice(i, i + 2), input.slice(-i - 2 + len, len - i), resign)[0]);
    //list_two.unshift(getMc(input.slice(i, i + 2), input.slice(-i - 2 + len, len - i), resign)[1]);
    list_one.splice(i/2, 0, getMc(input.slice(i, i + 2), input.slice(-i - 2 + len, len - i), resign)[0], getMc(input.slice(i, i + 2), input.slice(-i - 2 + len, len - i), resign)[1]);
    continue;
  };
  //list_one.push(...list_two);
  for (let i = 0; i < list_one.length; i += 4) {
    list.push(String.fromCharCode(parseInt(list_one.slice(i, i + 4).join(""), 16)));
    continue;
  };
  return list.join("");
};


//主类
class La_encrypt {
  static reverse(data, sign) {
    if (sign == null && typeof data == "string") return repart(data);
    if (typeof data != "string" || typeof sign != "number" || sign <= 0) return false;
    if (data.length < sign) {
      return repart(data);
    } else {
      let list = [];
      for (let i = sign, len = data.length; len - i >= 0; i = i + sign) {
        list.push(repart(data.slice(i - sign, i)));
        continue;
      };
      list.push(repart(data.slice(sign * list.length)) || "");
      return (list.join(""));
    };
  };
  static infurr(data, _sign) {
    if (typeof data != "string" || (typeof _sign == "object" && _sign.length !== 4)) return false;
    return infurr(data, _sign || [["嗷", "喵"], ["呜"], ["啊"], ["~"]]);
  };
  static defurr(data, _sign) {
    if (typeof data != "string" || data.length%2 != 0 || (typeof _sign == "object" && _sign.length !== 4)) return false;
    return outfurr(data, _sign || [["嗷", "喵"], ["呜"], ["啊"], ["~"]]);
  };
};

//module.exports.reverse = reverse
module.exports = La_encrypt;