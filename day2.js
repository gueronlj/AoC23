import readData from './readData.js';

const parseGameId = ( str ) => {
    let index = str.search(':');
    const id = str[index-3] + str[index-2] + str[index-1];

    if(id[0]=='e'){
        return parseInt(id[2])
    } else {
        return parseInt(id);
    }
}

const parseRounds = (str) => {
    const rounds = str.split(';');
    return rounds
}

const verify = (total, color) => {
    let bool = true;
    if(color == 'blue'){
        if(total > 14){
            bool = false;
        }
    } else if (color == 'red'){
        if(total > 12){
            bool = false;
        }
    } else if (color == 'green'){
        if(total > 13){
            bool = false;
        }
    }
    return bool

}

const parseColors = (str, color) => {
    if(str.includes(color)){
        let i = str.search(color)
        let number = 0;
        if (str[i-3] != ''){
            //then its 2 digit value, get both digits
            number = str[i-3] + str[i-2];
        } else {
            //else get 1 digit
            number = str[i-2];
        }
        return parseInt(number);
    }
     else {
        return 0;
    }
}

let total = 0

for (const line of readData){

    const map = {
        "gameId": parseGameId(line),
        "blues": 0,
        "reds": 0,
        "greens": 0
    }

    const roundsArr = parseRounds(line)
    console.log(roundsArr);

    for (const string of roundsArr){
        //count colors
        let blues = parseColors(string, 'blue');
        let reds = parseColors(string, 'red');
        let greens = parseColors(string, 'green');

        //check validity of each round
        if  ( !verify(blues, 'blue') || !verify((reds), 'red') || !verify(greens, 'green')){
            //not valid so doint count this game
            map.gameId = 0;
        }
         //get totals for each color per round
        map.blues = map.blues += blues
        map.reds = map.reds += reds
        map.greens = map.greens += greens
    }
    console.log(map);
    total += map.gameId
    
}

console.log(total);