import fs from 'fs';

const data = fs.readFileSync('./data.txt', 'utf8');
const list = data.split("\n")

export default list;