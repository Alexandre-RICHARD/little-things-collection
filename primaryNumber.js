const primaryNumberSearching = (limit) => {
    const result = [];

    if (limit >= 2) {
        // Variable stop qui sera régulièrement utilisée
        let stop = false;

        // On rentre dans la boucle du nombre à tester
        for (let i = 2; i < limit + 1; i++) {
            stop = false;
            if (stop === false) {
                for (let y = 2; y < i; y++) {
                    if (i % y === 0) {
                        stop = true;
                    }
                }
            }
            if (stop === false) {
                result.push(i);
            }
        }
        console.log(result);
        console.log(result.length);
    } else {
        console.log("La limite doit être supérieure ou égale à 2");
    }
};

let resultdos = [2]

const dos = (limit) => {
    for (let i = 3; i < limit + 1; i+= 2) {
        if (i % 3 > 0 && i % 5 > 0 && i % 7 > 0 && i % 11 > 0 && i % 13 > 0) {
            let n;
            let j = 17;
            while (j * j <= i) {
                if (i % j === 0) {
                    n = true;
                    break;
                }
                j += 2;
            }
            if (!n) {
                resultdos.push(i);
            }
        }
    }
    console.log(resultdos);
    console.log(resultdos.length);
};

// primaryNumberSearching(150000);
dos(10000)