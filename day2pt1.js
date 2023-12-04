import readData from './readData.js';

class MyMap  {
    constructor(){
        this.gameId = 0;
        this.rounds = new Array();
    }

    setGameId( id ){
        this.gameId = id;
    }

    parseGameId( str ){
        let index = str.search(':');
        const id = str[index-3] + str[index-2] + str[index-1];

        if(id[0]=='e'){
            this.setGameId(parseInt(id[2]))
        } else {
            this.gameId = parseInt(id);
        }  
    }

    getGameId(){
        return this.gameId;
    }

    setRounds = ( arr ) => {
        this.rounds = arr;
    }

    getRounds(){
        return this.rounds;
    }

    setBLues( int ){
        this.blues = int;
    }

    parseBlues( str ){
        console.log(str);
        let sum = 0
        let slice = ''
        if (str.includes('blue')){
            let i = str.search('blue');

            if(str[i-3] == ' '){
                slice = str[i-2];
            } else {
                slice = (str[i-3] + str[i-2]);
            }
        } 
       
        sum += parseInt(slice);
        console.log(sum);
        this.blues = sum;
    }

    getBlues(){
        return this.blues;
    }
};

for( const line of readData ){
    //create map of line
    let map = new MyMap();
    map.parseGameId(line);
    map.setRounds(line.split(';'));
    console.log(map.getGameId());
   
    for( const str of map.getRounds() ){
        map.parseBlues(str);
    }

    console.log(map.getBlues());
        
}