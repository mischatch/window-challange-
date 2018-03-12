
var stringify = require('stringify');

stringify.registerWithRequire({
  appliesTo: { includeExtensions: ['.txt', '.html'] },
  minify: true,
  minifyAppliesTo: {
    includeExtensions: ['.html']
  },
  minifyOptions: {
    // html-minifier options
  }
});

let file = require('./input.txt');

// splitting input string file by lines
let inputArray = file.trim().split("\n");

// Splitting each array by whitespace and converting strings to integers
let arr1 = inputArray[0].split(' ').map(el => parseInt(el));
let arr2 = inputArray[1].split(' ').map(el => parseInt(el));

// let arr1 = [5, 3];
// let arr2 = [188930, 194123, 201345, 154243, 154243,];

console.log(arr1, arr2);
// Input
// 5 3
// 188930 194123 201345 154243 154243
// arr 1 - array of days and window to look
// arr 2 - days

// find sum of numbers fo increasing and decreasing ranges in a window


function inDec(arr1, arr2){
  let n = arr1[0];
  let window = arr1[1];
  let i = 0;
  while (i < n - window){
    let subArr = arr2.slice(i, window + i); // subranges with a size of a window
    console.log(checkRange(subArr)); // checking array
    i++;
  }
}


function checkRange(arr){
  let res = 0;
  let i = 0;
  while (i <= arr.length - 2 ) {
    for (var j = 2; j <= arr.length; j++) {
      let sub = arr.slice(i, j);
      if(sub[0] < sub[1]){ // checking if the whole rnage increasing
        res += increase(sub);
      } else if(sub[0] > sub[1]){ // checking if the whole rnage decreasing
        res += decrease(sub);
      } else {
        checkRange(sub.slice(1));
      }
    }
    i++;
  }
  return res;
}

function increase(arr){
  for (var i = 0; i < arr.length - 1; i++) {
    if(arr[i] > arr[i + 1] || arr[i] === arr[i + 1]){
      return 0;
    }
  }
  return 1;
}

function decrease(arr){
  for (var i = 0; i < arr.length - 1; i++) {
    if(arr[i] < arr[i + 1] || arr[i] === arr[i + 1]){
      return 0;
    }
  }
  return -1;
}

// inDec(arr1, arr2);
