import readData from './readData.js';

//buid a grid (number of rows = number of lines, number of rows = number of charcers in each line)
const grid = [];
const markerMap = [];
const numberMap = [];

const isNum = ( char ) => {
    if ( char != `\r` && char != `\n` && !isNaN(char) ){
        return true;
    } 
    return false;  
}

const isMarker = ( char ) => {
    if ( char != `.` && isNaN(char) ){
        return true;
    }
}

for ( let i = 0; i < readData.length; i++ ){
    const chars = readData[ i ].split('');
    for ( let j = 0; j < chars.length; j++ ){
        //add marker coordinates to map
        if ( isMarker(chars[j]) ){
            markerMap.push( { "x": chars[j], "y": i, "marker": chars[j] } );
        }

        if ( isNum(chars[j]) ){
            numberMap.push( { "x": chars[j], "y": i, "number": chars[j] } );
        }
    }
}

console.log(markerMap);
console.log(numberMap);