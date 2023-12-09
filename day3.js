import readData from './readData.js';

//buid a grid (number of rows = number of lines, number of rows = number of charcers in each line)
const grid = [];
const partsList = []

const countRows = () => {
   let count = 0;
   for (const line of readData){
      count++
   }
   return count;
}

const countColumns = () => {
   let count = 0;
   for (const char of readData[0].split('')){
      count++
   }
   return count;
}

const buildGrid = () => {
   for (let i = 0; i<countRows(); i++){
      grid.push(Array(countColumns()).fill(null));
   }
}

const fillGrid = () => {
   for (let i = 0; i<grid.length; i++){
      //for every column, fill the column with characters from the line in readData
      for (let j = 0; j<grid[i].length; j++){
         grid[i][j] = readData[i].split('')[j];
      }
      grid[i][grid[i].length-1] = '.'; //add a '.' to the end of each line
   }
}

const markerLocations = () => {

   const markers = []
   //search grid for marker symbols
   for (let i = 0; i<grid.length; i++){
      for (let j = 0; j<grid[i].length; j++){
         let currentPoint = grid[i][j];

         if (isNaN(currentPoint) && currentPoint != '.'){
            // if marker symbol found, push to list of coords
            markers.push({"x": j, "y": i})
         }
      }
   }

   return markers;
}

const checkRight = (x, y, list) => {
   //if at the edge, stop
   if (y >= grid.length || x >= grid[y].length-1){
      return;
   }
   //if next char is not a number, stop
   if ( isNaN(grid[y][x+1])){
      return;
   }
   //keep checking until a non-number or edge is found
   list.push(grid[y][x+1]);
   checkRight(x+1, y, list);
}

const checkLeft = (x, y, list) => {
   if (y >= grid.length || x == 0 ){
      return;
   }
   if ( isNaN(grid[y][x-1])){
      return;
   }
   list.push(grid[y][x-1]);
   checkLeft(x-1, y, list);
}

const findRestofNumber = (x, y) => {
   let leftNumbers = [];
   let rightNumbers = [];
   let possibleNumbers = new Set();

   //check right for more numbers
   checkRight(x, y, rightNumbers)
   //check left for more numbers     
   checkLeft(x, y, leftNumbers)  
   //revers the numebrs found on left
   let actualLeftNums = leftNumbers.reverse().join('');
   //join all numbers together
   let completeNum = actualLeftNums + grid[y][x] + rightNumbers.join('');

   //sanitize number (get rid of any non-numbers)
   let array = completeNum.split('');
   for (let i = 0; i<array.length; i++){
      if ( isNaN(array[i]) ){

      //to prevent parsing numbers over 3 digits:
         //if symbol is somewhere in the middle
         //take slice before andfter symbol and push to partsList
         if ( i != 0 && i != array.length-1){
            let leftChunk = array.slice(0, i+1).join('');
            const rightChunk = array.slice(i+1, array.length).join('');
            //clean left chunk again
            let leftChunkArray = leftChunk.split('');
            for (let i = 0; i<leftChunkArray.length; i++){
               if ( isNaN(leftChunkArray[i]) ){
                  leftChunkArray.splice(i, 1);
               }
            }
            leftChunk = leftChunkArray.join('');

            possibleNumbers.add(leftChunk);
            possibleNumbers.add(rightChunk);
         }
         array.splice(i, 1);
      }
   }
   if (array.length <=4 ){
      const finalNumber = array.join('')
      possibleNumbers.add(finalNumber)
   }
  partsList.push(possibleNumbers);
}

const removeTwins = (arr) => {
   for ( let i = 0; i<arr.length; i++){
      if (arr[i] == arr[i+1]){
         arr.splice(i+1, 1);
         removeTwins(arr);
      }
   }
}

buildGrid();
fillGrid();
//find all special markers
for ( const marker of markerLocations()){
   //check area around markers for numbers
   const x = marker.x;
   const y = marker.y;
   //if number is found, add it's coords to check for rest of number
   //check left for number
   if ( !isNaN(grid[y][x-1]) ){
      findRestofNumber(x, y)   
   }
   //check top-left for number
   if (grid[y-1] !== undefined && !isNaN(grid[y-1][x-1])) {
      findRestofNumber(x, y-1)
    }
   //check above for number
   if (grid[y-1] !== undefined && !isNaN(grid[y-1][x]) ){
      findRestofNumber(x, y-1)
   }
   //check top-right
   if (grid[y-1] !== undefined && !isNaN(grid[y-1][x+1]) ){
      findRestofNumber(x, y-1)
   }
   //check right
   if( !isNaN(grid[y][x+1]) ){
      findRestofNumber(x, y)
   }
   //check bottom-right
   if (grid[y+1] !== undefined && !isNaN(grid[y+1][x+1]) ){
      findRestofNumber(x, y+1)
   }
   //check below
   if(grid[y+1] !== undefined && !isNaN(grid[y+1][x]) ){
      findRestofNumber(x, y+1)
   }
   //check bottom-left
   if (grid[y+1] !== undefined && !isNaN(grid[y+1][x-1]) ){
      findRestofNumber(x, y+1)
   }   
}
//turn partsList into an array of numbers
const flatList = [];
for (const set of partsList){
   for (const num of set){
      flatList.push(parseInt(num));
   }
}

removeTwins(flatList);
//const set = new Set(flatList);
let total = 0;
for (const num of flatList){
   total += parseInt(num);
}
console.log(flatList);
console.log(total);
