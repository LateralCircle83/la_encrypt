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
  let inputi = await input("输入:")
  let sign = await input("密码:")
  let response=encrypt.reverse(inputi,sign)
  console.log("结果:"+response)
  clipboardy.writeSync(response)
  main()
}
main()