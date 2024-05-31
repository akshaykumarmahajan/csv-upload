let unique = [...new Set(data.map(item => item.Tag))]
console.log('Unique: ', unique)
let newRes = {};
let output = {
    "category": "dtc",
    "period": [
        // {
        //     "052024": []
        // }, {
        //     "062024": []
        // }
    ]
};
for (let i = 0; i < unique.length; i++) {
    newRes[unique[i]] = [];
    for (let j = 0; j < data.length; j++) {
        if (unique[i] == data[j].Tag) {
            newRes[unique[i]].push(data[j])
        }
    }
}
let res = {};
for (let key in newRes) {
    res[key] = [...new Set(newRes[key].map(item => item.Repositry))];
    res[key].push('all');
}
let monthId = '052024';

output.period.push({ [monthId]: res}); //output.period[0]['052024'].push(res);

console.log('res: ', res);
console.log('output: ', JSON.stringify( output));
