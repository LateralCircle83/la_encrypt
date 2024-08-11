//加密
function infurr(input, sign, list = []) {
  const add0 = (data) => "00".slice(0, 4- data.length) + data
  const random = (data) => data[Math.floor(data.length * Math.random())]
  const getMv = (left, right, lite, output = []) => {
    for (let i = 0; i < lite; i++) {
      output.splice(i, 0, random(sign[Math.floor(parseInt(`0x${left[i]}`)*0.25)])+random(sign[parseInt(`0x${left[i]}`) % 4 + parseInt(`0x${right[3-i]}`) % 4]), random(sign[Math.floor(parseInt(`0x${right[3-i]}`) *0.25 + Math.floor(parseInt(`0x${left[i]}`) *0.25))]) + random(sign[parseInt(`0x${right[3-i]}`) % 4]))
    }
    return output
  }
  sign.push(...sign)
  for (let i = 0, len = input.length; Math.ceil(len*0.5) > i; i++) {
    list.splice(i*4, 0, ...getMv(add0(input[i].charCodeAt(0).toString(16)), add0(input[len-i-1].charCodeAt(0).toString(16)), 2 + Math.min(len-2*i-1, 1)*2))
  }
  return list.join("")
}
console.log(infurr("121", [["喵", "嗷"], ["呜"], ["~"], ["咪"]]))
//解密
function outfurr(input, sign, list = [], resign = {}) {
  sign.forEach((v, i) => {
    v.forEach((ele) => {
      resign[ele] = i
    })
  })
  const getMc = (left, right, lite, output = [])=> {
    for (let i = 0; i < 4+4*lite; i += 2) {
      output.splice(i*0.5, 0, (resign[left[i]]*4+(resign[left[i+1]] - resign[right[7-i]]+4)%4).toString(16), ((resign[right[6-i]]-resign[left[i]]+4)%4*4+resign[right[7-i]]).toString(16))
    }
    return [String.fromCharCode(parseInt(output.slice(0, 4).join(""), 16)), String.fromCharCode(parseInt(output.slice(4, 8).join(""), 16))]
  }
  for (let i = 0, len = input.length; i < Math.ceil(len*0.0625)*8; i += 8) {
    list.splice(i*0.125, 0, ...getMc(input.slice(i, i+8), input.slice(len-i-8, len-i), Math.min(len-8-2*i, 1)))
  }
  return list.join("")
}

console.log(outfurr("喵呜嗷咪嗷咪喵呜嗷~喵咪喵咪嗷~喵嗷喵嗷喵咪嗷呜", [["喵", "嗷"], ["呜"], ["~"], ["咪"]]))