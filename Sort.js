//VARIABLES
//Get from user
var new_array = document.getElementById("new_array_btn");
var sort_btn = document.getElementById("sort_btn");
var bars_container = document.getElementById("bars_container");
var select_algo = document.getElementById("algo");
var speed = document.getElementById("speed");
var slider = document.getElementById("slider");

//variables for user values
var minRange = 1;
var maxRange = slider.value;
var numOfBars = slider.value;
var heightFactor = 4;
var speedFactor = 100;
var unsorted_array = new Array(numOfBars);

//get the algorithm selected by the user
var algo = "";
sort_btn.addEventListener("click", function () {
  if (algo === "selection") {
    selectionSort(unsorted_array);
  } else if (algo === "insertion") {
    insertionSort(unsorted_array);
  } else if (algo === "heap") {
    heapSort(unsorted_array);
  } else if (algo === "bubble") {
    bubbleSort(unsorted_array);
  } else if (algo === "merge") {
    mergeSort(unsorted_array);
  } else if (algo === "quick") {
    quickSort(unsorted_array, 0, unsorted_array.length - 1);
  } else {
    bubbleSort(unsorted_array);
  }
})

//EVENT LISTENERS:
//take slider input of number of items in array and maximum height of a bar
slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

//take in speed asked by user
speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

//take in the algorithm selected, "change" because selected by user
select_algo.addEventListener("change", function () {
  algo = select_algo.value;
});

//load in the array as bars
document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

//generate a new array
new_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});


//FUNCTIONS TO AID EVENTS AND ALGORITHMS:
//to add a delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//creates the set of bars on the screen
function renderBars(array) {
  //for each bar
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    //add a CSS component to bars for colouring and height changing
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    //add this 
    bars_container.appendChild(bar);
  }
}

//To fill colour in bars after they go green/red during swaps
function fillBars(exclude1, exclude2){
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < bars.length; i++) {
    if(i != exclude1 || i!= exclude2){
      bars[i].style.backgroundColor = "black";
    }
  }
}

//bar colour and height change
function cAndHChange(index1, index2, bars, array){
  bars[index1].style.height = array[index1] * heightFactor + "px";
  bars[index1].style.backgroundColor = "lightgreen";
  bars[index2].style.height = array[index2] * heightFactor + "px";
  bars[index2].style.backgroundColor = "lightgreen";
}

//random array to be made into bars
function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//SORTING ALGORITHMS
async function quickSort(array, low, high) {
  let bars = document.getElementsByClassName("bar");
  if (low < high) {
  //Partitioning
  //far right is pivot
  var pivot = array[high];

  //lower element index
  var i = low - 1;

  //iterate through array
  for (var j = low; j < high; j++) {
    fillBars(-1, -1);
      if (array[j] <= pivot) {
          i++;
          //Swap if element is less than equal to pivot
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
          cAndHChange(i, j, bars, array);
          await sleep(speedFactor);
      }
  }

  //Swap
  var temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;
  cAndHChange(i+1, high, bars, array);

  var pivotIndex = i + 1;

  //Left and right subarrays
  quickSort(array, low, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, high);
  }
  fillBars(-1,-1);
  return array;
}

async function bubbleSort(array){
  let bars = document.getElementsByClassName("bar");
  var i = 0;
  var swapped;
  //before second last element
  while(i < array.length-1){
      swapped = false;
      var j = 0;
      fillBars(-1, -1);
      //find max, go until the length-1 - i(number of times we have put the value at the end)
      while(j < array.length-(i+1)){
          fillBars(-1, -1);
          if(array[j] > array[j+1]){
              //swap
              var temp = array[j];
              array[j] = array[j+1];
              array[j+1] = temp;
              cAndHChange(j, j+1, bars, array);
              swapped = true;
              await sleep(speedFactor);
          }
          j++;
      }
      //no elements were swapped
      if(swapped == false){
          fillBars(-1, -1);
          return array;
      }
      i++;
  }

}

async function heapSort(array){
  let bars = document.getElementsByClassName("bar");
  //first convert array into a heap data structure
  //we can do this by calling a heapify function starting from last non leaf node n/2-1
  for(var i = array.length/2 -1; i>=0; i--){
      heapify(array, array.length, i);
  }
  
  var i = array.length-1;
  while(i>0){
      //delete the root node and replace it with the last node in the heap
      //remove new last node, and heapify the elements again
      //continue process until sorted array, then reverse the order
      var temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      cAndHChange(i, 0, bars, array);
      await sleep(speedFactor);
     
      heapify(array, i, 0);
      i--;
      fillBars(-1, -1);
  }
  console.log("heap");
  fillBars(-1, -1);
  return array;
}
async function heapify(array, length, rootIndex){
  let bars = document.getElementsByClassName("bar");
  var left = 2*rootIndex + 1;
  var right = 2*rootIndex + 2;
  var root = rootIndex;
  //largest with left child, if child is bigger then assign value to largest
  if (left < length && array[left] > array[root]) {
      root = left;
  }
  //largest with right child
  if (right< length && array[right] > array[root]) {
      root = right;
  }
  // If the root is not the largest, swap and recursively heapify the affected subtree
  if (root != rootIndex) {
      var temp = array[rootIndex];
      array[rootIndex] = array[root];
      array[root] = temp;
      heapify(array, length, root);
  }
}


async function selectionSort(array){
  let bars = document.getElementsByClassName("bar");
  //int placeHolder;
  var minElement;
  var count = 0;

  while(count+1<array.length){
      minElement = array[count+1];
      //find min element
      var minElementIndex = count+1;
      for(var i = count+1; i<array.length; i++){
          if(array[i] < minElement){
              minElement = array[i];
              minElementIndex = i;
          }
      }
      //swap place holder and smallest element if it smallest element is smaller
      var placeHolder = array[count];
      if(placeHolder > minElement){
        fillBars(-1, -1);
        array[count] = minElement;
        array[minElementIndex] = placeHolder;
        //give the current bars coloour and update their height on the screen
        cAndHChange(count, minElementIndex, bars, array);
        //delay
        await sleep(speedFactor);
      }
      
      count++;
  }
  fillBars(-1, -1);
  return array;
}

async function insertionSort(array){
  let bars = document.getElementsByClassName("bar");
  var firstIndex;
  var secondIndex = 1;
  var tempValue;
  //move through the array until the end
  while(secondIndex < array.length){
    tempValue = array[secondIndex];
    firstIndex = secondIndex -1;
    //only the firstIndex is being updated so dont use secondIndex for any
    //keep swapping back until in order by moving the previous one ahead
    while(firstIndex >= 0 && tempValue < array[firstIndex]){
        array[firstIndex+1] = array[firstIndex];
        
        //give the current bars coloour and update their height on the screen
        bars[firstIndex+1].style.height = array[firstIndex+1] * heightFactor + "px";
        bars[firstIndex + 1].style.backgroundColor = "lightgreen";
        //delay
        await sleep(speedFactor);

        //update colour of all bars, (lightgreen to black)
        fillBars(firstIndex+1, -1);
      firstIndex--;

    }
    //since we kept the original second index now we can update it to the correct place
    array[firstIndex+1] = tempValue;
    bars[firstIndex + 1].style.height = array[firstIndex + 1] * heightFactor + "px";
    secondIndex++;
  }
  //update colour of all bars (essentially just the last lightgreen bar)
  fillBars(-1, -1);
  //done
  return array;
}

async function mergeSort(array) {
  let bars = document.getElementsByClassName("bar");
  console.log("start");
  //if empty or sorted
  if (array == null || array.length <= 1) {
    // for (let i = 0; i < bars.length; i++) {
    //   if(i != exclude1 || i!= exclude2){
    //     bars[i].style.backgroundColor = "black";
    //     bars[i].style.height = array[i] * heightFactor + "px";
    //   }
    // }
    console.log("merge");
    for (let i = 0; i < bars.length; i++) {

      bars[i].style.backgroundColor = "black";
      bars[i].style.height = array[i] * heightFactor + "px";
      //await sleep(speedFactor);
    }
    return array
  }
  console.log("1");
   
  let temp = array.slice();

  mergeSortRec(array, temp, 0, array.length - 1);
}

async function mergeSortRec(array, temp, low, high) {
  let bars = document.getElementsByClassName("bar");
  fillBars(-1, -1);
  if (low < high) {
    var mid = Math.floor((low + high) / 2);

    //merge sort left and right halfs
    //console.log("2");
    mergeSortRec(array, temp, low, mid);
    mergeSortRec(array, temp, mid + 1, high);
    
    //Put the two halfs together:
  
    temp = array.slice();
    //store indices
    var left = low;
    var right = mid + 1;
    var current = low;
    //merge array and temp array
    while (left <= mid && right <= high) {
     
      
        if (temp[left] <= temp[right]) {
            array[current] = temp[left];
            left++;
            bars[current].style.height = array[current] * heightFactor + "px";
            //console.log("4");
            bars[current].style.backgroundColor = "lightgreen";
            //await sleep(speedFactor);
            
        } else {
            array[current] = temp[right];
            right++;
            bars[current].style.height = array[current] * heightFactor + "px";
            //console.log("5");'
        }
    
        console.log("a")
        current++;
        //await sleep(speedFactor);
        //await sleep(speedFactor);
    }
    //await sleep(speedFactor);
    //await sleep(speedFactor);
    //if any elements remain then put then into the final array
    while (left <= mid) {
        array[current] = temp[left];
        left++;
        current++;
        //let bars = document.getElementsByClassName("bar");
        //bars[current].style.height = array[current] * heightFactor + "px";
        //console.log("6");
    }
    //await sleep(speedFactor);
    for (let i = 0; i < bars.length; i++) {

      bars[i].style.backgroundColor = "black";
      bars[i].style.height = array[i] * heightFactor + "px";
      //await sleep(speedFactor);
      //await sleep(speedFactor);
    }
    //console.log("7");
  }
}




