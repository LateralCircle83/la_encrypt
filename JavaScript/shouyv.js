/*我不知道我在干什么
  但是这个加密法貌似不好用
*/
//{"00":["呜","唔"],"11":["~","↗"],"10":["嗷","噢"],"01":["啊","♡"]}
function infurr(input, sign) {
  let list = []
  for (let i = 0, len = input.length / 2; i < len; i++) {
    list.push(getMw(input.slice(2 * i, 2 * i + 2), sign))/*sign[input.slice(2*i,2*i+1)][Math.floor(*Math.random())]*/
  }
  return list.join('')
}
function getMw(input, sign) {
  return sign[input][Math.floor(sign[input].length * Math.random())]
}
function outfurr(input, sign) {
  let resign = {}
  for (let key in sign) {
    for (let i = 0, len = sign[key].length; i < len; i++) {
      resign[sign[key][i]] = key
    }
  }
  let list = []
  for (let i = 0, len = input.length; i < len; i++) {
    list.push(resign[input[i]])
  }
  return list.join("")
}
//console.log(infurr("111001101000100010010001111010001010011010000001111001011001000010000011111001111000110010101011111001111000110010101011111011111011110010000001111011111011110010000001",{"00":["呜","唔"],"11":["~","↗"],"10":["嗷","噢"],"01":["啊","♡"]}))
//console.log(outfurr("↗噢啊嗷噢唔嗷呜噢♡唔啊~嗷嗷唔嗷嗷啊噢噢唔呜啊↗嗷啊♡噢啊呜呜嗷唔呜↗~嗷啊~噢呜↗呜噢噢嗷~↗噢♡↗噢呜↗呜嗷噢噢↗~噢~~噢↗↗唔嗷唔唔啊↗嗷↗~噢↗↗唔噢唔呜啊",{"00":["呜","唔"],"11":["~","↗"],"10":["嗷","噢"],"01":["啊","♡"]}))
