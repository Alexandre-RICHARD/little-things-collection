const t = [0,1,0,0,24,0]

const x = t.map((el, index) => {
    let showed = false;
    if (el > 0 || index === 5) {
        showed = true;
    } else if (index !== 0) {
        for (let i = 0; i < index ; i++) {
            console.log(`Index: ${index} - Value : ${t[i]}`)
            if (t[i] > 0) {
                showed = true;
            }
        }
    }
    return showed;
})

const wantedResult = [false, true, true, true, true, true];
console.log(x);
console.log(wantedResult.every((value, index) => value === x[index]))