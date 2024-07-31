/*
  这个应该很像兽音译者了，尽管加密不同
*/

/*function to2core(data){
    let list = []
    for(let i=0;i<data.length;i++){
        list.push(data[i].charCodeAt().toString(2))
    }   
    return list.join("");
}
console.log(to2core("₠"))
/*function tostring(data) {  
    // 将二进制字符串转换为 ArrayBuffer，然后创建一个 Uint8Array 视图来访问它  
    const length = data.length;  
    if (length % 8 !== 0) {  
        return false  
    }  
    const byteArray = new Uint8Array(new ArrayBuffer(length / 8));  
    // 遍历二进制字符串，每 8 位一组转换为 Uint8Array 中的一个字节  
    for (let i = 0; i < length; i += 8) {  
        // 使用 parseInt 将 8 位二进制字符串转换为十进制数（字节）  
        const byte = parseInt(data.substr(i, 8), 2);  
        byteArray[i / 8] = byte;  
    }  
    // 使用 Buffer.from 创建一个新的 Buffer 实例，该实例包含与 Uint8Array 相同的数据  
    const buffer = Buffer.from(byteArray.buffer);  
    // 最后，将 Buffer 解码为字符串（假设它是 UTF-8 编码的）  
    return buffer.toString('utf8');  
}  */
/*function tostring(data){
  
}*/
//console.log(tostring("111000101000001010100000"))
//console.log(" ".charCodeAt().toString(16))
//console.log(0x10)
//console.log(String.fromCharCode(0x4B))

//[["嗷"],["呜"],["啊"],["~"]]
function infurr(input,sign) {
  function getMv(left,right,sign) {
  function random(data){
    //console.log(data)
    return data[Math.floor(data.length*Math.random())]
  }
  //console.log(sign)
  //console.log()
  return [random(sign[Math.floor(parseInt(`0x${left}`)/4)])+random(sign[parseInt(`0x${left}`)%4+parseInt(`0x${right}`)%4]),random(sign[Math.floor(parseInt(`0x${right}`)/4+Math.floor(parseInt(`0x${left}`)/4))])+random(sign[parseInt(`0x${right}`)%4])]
}
  function add0(str){
    return ((str.length===2)&&`00${str}`)||((str.length===3)&&`0${str}`)||str
  }
  sign.push(...sign)
  let list_one=[],list_two=[],data=[]
  for (let i=0;i<input.length;i++){
    data.push(add0(input[i].charCodeAt(0).toString(16)))
  }
  //console.log(data)
  data=data.join("")
  //console.log(data)
  for(let i=0,len=data.length;i<len/2;i++){
    //console.log(data[i],data[len-1-i])
    list_one.push(getMv(data[i],data[len-1-i],sign)[0])
    //console.log(getMv(data[i],data[len-1-i],sign)[0])
    list_two.unshift(getMv(data[i],data[len-1-i],sign)[1])
  }
  list_one.push(...list_two)
  //console.log(list_one)
  return list_one.join("")
}

let signn=[["嗷","喵"],["呜"],["啊"],["~"]]
//console.log(infurr("7",signn))

function outfurr(input,sign){
  function getMc(left,right,sign){
  let d=[parseInt(sign[left[0]]),parseInt(sign[left[1]]),parseInt(sign[right[0]]),parseInt(sign[right[1]])]
  //console.log(d,(d[0]*4+d[1]-d[3]+((d[1]-d[3]<0)&&4||0)).toString(16),((d[2]-d[0]+((d[2]-d[0]<0&&4)||0))*4+d[3]).toString(16))
  return [(d[0]*4+d[1]-d[3]+((d[1]-d[3]<0)&&4||0)).toString(16),((d[2]-d[0]+((d[2]-d[0]<0&&4)||0))*4+d[3]).toString(16)]
}
  let resign ={},list_one=[],list_two=[],list=[]
  for (let i=0;i<sign.length;i++){
    for (let ele of sign[i]) {
      resign[ele]=String(i)
    }
  }
  //console.log(resign)
  for (let i=0,len=input.length;i<len/2;i+=2){
    //console.log(input.slice(i,i+2),input.slice(-i-2+len,len-i))
    list_one.push(getMc(input.slice(i,i+2),input.slice(-i-2+len,len-i),resign)[0])
    list_two.unshift(getMc(input.slice(i,i+2),input.slice(-i-2+len,len-i),resign)[1])
  }
  //console.log(list_one)
  list_one.push(...list_two)
  //console.log(list_one)
  for (let i =0;i<list_one.length;i+=4) {
    //console.log(parseInt(list_one.slice(i,i+4).join(""),16))
    list.push(String.fromCharCode(parseInt(list_one.slice(i,i+4).join(""),16)))
  }
  return list.join("")
}
/*function getMc(left,right,sign){
  let d=[parseInt(sign[left[0]]),parseInt(sign[left[1]]),parseInt(sign[right[0]]),parseInt(sign[right[1]])]
  //console.log(d,(d[0]*4+d[1]-d[3]+((d[1]-d[3]<0)&&4||0)).toString(16),((d[2]-d[0]+((d[2]-d[0]<0&&4)||0))*4+d[3]).toString(16))
  return [(d[0]*4+d[1]-d[3]+((d[1]-d[3]<0)&&4||0)).toString(16),((d[2]-d[0]+((d[2]-d[0]<0&&4)||0))*4+d[3]).toString(16)]
}*/
//console.log(outfurr("嗷啊呜啊啊啊嗷喵",signn))
console.log(infurr("①",signn))
