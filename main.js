import fs from 'fs';

const data = fs.readFileSync('./data.txt', 'utf8');
const list = data.split("\n")

const reduceNumsArr = (arr) =>{
    const nums =  [arr[0], arr[arr.length-1]]
    const integer = nums.join('')
    return parseInt(integer);
}

const findNums = (arr) => {
    let numbers = []
    for (let i = 0; i<arr.length; i++){
        //if character at line[j] is number
            //add to list
        if(/^[0-9]*$/.test(arr[i])){
            numbers.push(arr[i])
        }  
    }
    return reduceNumsArr(numbers) 
}

let sum = 0;
for (let i =0; i<list.length; i++){
    let charArr = list[i].split('')
    sum += findNums(charArr)
    
}
console.log(sum)
