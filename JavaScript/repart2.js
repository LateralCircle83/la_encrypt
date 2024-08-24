function repart (input,output=[]){
    const len =Math.floor((input.length-1)/2)*2+1
    for (let i=0;i<len;i++){
        output.push(input[len-i-1-(i%2)*(len-2*i-1)])
    }
    return output.concat(input[len]).join('')
}
console.log(repart('72543618'))