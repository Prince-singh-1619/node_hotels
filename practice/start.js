// function add(a, b){
//     return a+b
// }
// var result = add(2, 4)
// console.log(result)



// var fs = require('fs');
// var os = require('os');
// var user = os.userInfo()
// console.log(user.username)
// fs.appendFile('greeting.txt', 'Hi '+ user.username + 'e!\n', ()=>{  //this requires a callback function at last, otherwise it will give error
//     console.log('success')
//     //this will first create a txt file called greeting, if already created it'll just write the message
// })



const notes = require('./notes.js')
const _ = require('lodash')
console.log('Server file is available')

var age = notes.age
console.log(age)

let ans = notes.add(age, 7)
console.log(ans)

var arr = ['prince', 'prince', 1, 2, 1, 2, 2, 'akela', '2']
let filter = _.uniq(arr)
console.log(filter)