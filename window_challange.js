
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



console.log(arr1, arr2);
// arr1 = [5, 3]; arr1 === [N, K]
// arr2 = [188930, 194123, 201345, 154243, 154243]; arr2.length === N

// Solution in steps:
// — Iterate through N days of average home sale price data(arr 2) with step 1, to consider all possible ranges within a window
// — Send each selected range to checkRange(subArr). Here we're checking which range we're dealing with, . There are two helper functions -
// increase and decrease to check range to the end and depending on a function to return back to checkRange either 1, -1 or 0.
// If first two element of array in checkRange are the same, and we cannot determine wheather range is encreasing or decreasing,
// we're slicing the array and make a recursive call to the same function.



function inDec(arr1, arr2){
  let n = arr1[0];
  let window = arr1[1];
  let i = 0;
  while (i < n - window + 1){
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
      let sub = arr.slice(i, j); // creating sub ranges
      if(sub[0] < sub[1]){ // checking if the whole rnage increasing
        res += increase(sub);
      } else if(sub[0] > sub[1]){ // checking if the whole rnage decreasing
        res += decrease(sub);
      } else {
        checkRange(sub.slice(1)); // elements are equal
      }
    }
    i++;
  }
  return res;
}

function increase(arr){
  for (var i = 0; i < arr.length - 1; i++) {
    if(arr[i] > arr[i + 1] || arr[i] === arr[i + 1]){ // if range is not consecutive - return 0
      return 0;
    }
  }
  return 1;
}

function decrease(arr){
  for (var i = 0; i < arr.length - 1; i++) {
    if(arr[i] < arr[i + 1] || arr[i] === arr[i + 1]){ // if range is not consecutive - return 0
      return 0;
    }
  }
  return -1;
}

inDec(arr1, arr2);
