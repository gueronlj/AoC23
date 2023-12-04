import readData from './readData.js';

const dict = { 
    "one" : 1,
    "two" : 2,
    "three" : 3, 
    "four" : 4,
    "five" : 5,
    "six" : 6,
    "seven" : 7,
    "eight" : 8,
    "nine" : 9
}

const getChars = (str) => {
    let chars = [];
    for (const char of str){
        chars.push(char);
    }
    return chars
}

const numbersMap = (str) => {
    //FIX:
    //numbersMap is skipping duplicate numbers

    let map = new Map();
    const chars = getChars(str)

    for (const key of Object.keys(dict)){
        if (str.search(key) != -1){
            let position = str.search(key);
            map.set(position, dict[key]);
            //the number might repeat, grab the last instance of it
            position = str.lastIndexOf(key)
            map.set(position, dict[key]);
        }  
    }
    
    for ( const char of chars){
        if(!isNaN(char) && char != '\r'){
        
            let position = str.search(char);
            map.set(position, parseInt(char));

            //the number might repeat, grab the last instance of it
            position = str.lastIndexOf(char)
            map.set(position, parseInt(char));
        }
        
    }

    return map
}

const orderedMap = (map) => {
    let sortedMap = new Map([...map.entries()].sort((a, b) => a[0] - b[0]));
    console.log(sortedMap);
    return sortedMap
}

const calibrationValues = (map) =>{  
    //turn map into array
    let values = [];
    const mapArray = Array.from(map);
    //find and join the first and last numbers
    values = [mapArray[0][1], mapArray[mapArray.length-1][1]];
    values = values.join('');
    console.log(counter, values);
    return values
}

let sum = 0
let counter = 0
for (const line of readData){
    counter ++
    const calibrations = calibrationValues(orderedMap(numbersMap(line)))
    sum += parseInt(calibrations);
}

//WRONG ANSWER (TOO HIGH)
console.log("Total: ", sum);

//FAILED CASES: 59eightthreesevenctwon5,  36mplfgblgff3

//TODO:  refactor to use a class
