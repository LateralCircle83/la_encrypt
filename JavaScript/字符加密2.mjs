//const encrypt = require("./la_encrypt")
import encrypt from "./la_encrypt.js"
//const cl = require('clipboardy')
import clipboardy from 'clipboardy'
//const readline = require('readline')
import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function input(prompt) {
    return new Promise((resolve, reject) => {
        rl.question(prompt, (answer) => {
            resolve(answer)
            //rl.close();  
        })
    })
}
async function main() {
  let input2 =await input("in/de:")
  let input1 = await input("输入:")
  let sign = [["嗷", "喵"],["呜"],["啊"],["~"]]
  let response=(input2=="in"&&encrypt.infurr(input1,sign))||(input2=="de"&&encrypt.defurr(input1,sign))
  console.log("结果:"+response)
  clipboardy.writeSync(response)
  main()
}
main()