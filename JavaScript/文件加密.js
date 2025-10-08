const fs = require('fs').promises;  
const encrypt = require("./la_encrypt"); // 确保 encrypt.js 有一个合适的解密函数  
const readline = require('readline');  
//const coun=10000000
const rl = readline.createInterface({  
    input: process.stdin,  
    output: process.stdout  
});  
  
async function input(prompt) {  
    return new Promise((resolve, reject) => {  
        rl.question(prompt, (answer) => {  
            resolve(answer);  
            //rl.close();  
        });  
    });  
}  
  
async function main() {  
    try {  
        let inp = await input("请输入文件路径:")
        let sign = await input("密码:")
        let data = await fs.readFile(inp, 'hex')
        /*let decryptedData
        if (data.length < coun){
            decryptedData=encrypt.reverse(data)
        }else{
            let list=[]
            for (let i=coun,len=data.length;len-i>=0;i=i+coun) {
                list.push(encrypt.reverse(data.slice(i-coun,i)))
                continue
            }
            list.push(encrypt.reverse(data.slice(coun*list.length))||"")
            decryptedData=list.join("")
        }*/
        let decryptedData = encrypt.reverse(data,parseInt(sign)); // 假设 encrypt 模块有一个 decrypt 方法  
        await fs.writeFile(inp, decryptedData, 'hex'); // 根据需要选择适当的编码  
        console.log(`解密后的数据已写入 ${inp}`);  
        main()
    } catch (error) {  
        console.error("发生错误：", error);  
        process.exit()
    }  
}  
  
main();