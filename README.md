# la_encrypt
>倒序,兽音译者加密
>>**此兽音译者不同于兽音译者**

## [la_encrypt.js](https://raw.githubusercontent.com/LateralCircle83/la_encrypt/main/la_encrypt.js)

    应用实例
```javascript
const encrypt = require("./la_encrypt.js")
console.log(encrypt.reverse("1234567890",10)) //1038567492
console.log(encrypt.infurr("114514",[["嗷", "喵"], ["呜","唔"], ["啊","嗯"], ["~","的❤"]])) //喵嗷嗷咪喵咪嗷呜嗷呜嗷咪嗷咪喵呜嗷呜嗷咪嗷咪呜嗷呜喵嗷喵喵咪呜呜喵喵喵喵喵咪嗷呜喵嗷嗷嗷喵咪呜喵
console.log(encrypt.defurr("喵嗷嗷咪喵咪嗷呜嗷呜嗷咪嗷咪喵呜嗷呜嗷咪嗷咪呜嗷呜喵嗷喵喵咪呜呜喵喵喵喵喵咪嗷呜喵嗷嗷嗷喵咪呜喵",[["嗷", "喵"], ["呜","唔"], ["啊","嗯"], ["~","❤"]]))
```
## 在[python](https://github.com/LateralCircle83/la_encrypt/tree/main/python)
    由于我对python不熟悉，所以实现方式十分离谱
    适配termux-api需要[termux-api.py]，否则直接input
    又因为太懒了所以戈
