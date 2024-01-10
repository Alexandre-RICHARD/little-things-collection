const arr = [0, 1, 2, 3, 4];

const addIndex = () => {
  return arr.map((element, index) => {
    return element + index;
  });
};

console.log(addIndex());

const binary = (decimal) => {
  if (decimal === 0) {
    return '0';
  }
  const result = [];
  for (i = 10; i > 0; i--) {
    if (decimal >= Math.pow(2, i - 1)) {
      result.push(1);
      decimal = decimal - Math.pow(2, i - 1);
    } else {
      result.push(0);
    }
  }
  const string = result.join("");
  const reducedString = string.substring(result.join("").search(/[1]/g));
  console.log(decimal.toString(16));
  return reducedString;

};

console.log(binary(1611));
