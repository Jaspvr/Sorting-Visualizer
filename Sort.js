let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

let algotouse = "";

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

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

async function InsertionSort(array){
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
        for (let k = 0; k < bars.length; k++) {
          if (k != firstIndex + 1) {
            bars[k].style.backgroundColor = "black";
          }
        }
      firstIndex--;

    }
    //since we kept the original second index now we can update it to the correct place
    array[firstIndex+1] = tempValue;
    bars[firstIndex + 1].style.height = array[firstIndex + 1] * heightFactor + "px";
    secondIndex++;
  }
  //update colour of all bars (essentially just the last lightgreen bar)
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "black";
  }
  //done
  return array;
}


async function swap(array, bars, left, right){
  var left1 = array[left];
  var right1 = array[right];

  array[left] = right1;
  array[right] = left1;
  bars[left].style.height = array[left]*heightFactor + "px";
  bars[left].style.backgroundColor = "lightgreen";
  bars[right].style.height = array[right]*heightFactor + "px";
  bars[right].style.backgroundColor = "lightgreen";
  await sleep(speedFactor);
}

async function quickSort(array, leftPointer, rightPointer) {
  var temp;
  let bars = document.getElementsByClassName("bar");
  if (array.length > 1) {
    let bars = document.getElementsByClassName("bar");
    let pivotIndex = Math.floor((rightPointer + leftPointer) / 2);
    var pivot = array[pivotIndex]; //middle element
    bars[pivotIndex].style.backgroundColor = "red";
 
    
    for (let i = 0; i < bars.length; i++) {
      if (i != pivotIndex) {
        bars[i].style.backgroundColor = "black";
      }
    }
 
 
    i = leftPointer;
    j = rightPointer; 
    while (i <= j) {
      while (array[i] < pivot) {
        i++;
      }
      while (array[j] > pivot) {
        j--;
      }
      if (i <= j) {
        await swap(array, bars, i, j); //sawpping two elements
        i++;
        j--;
      }
    }
    temp = i;
   
     //index returned from partition
    if (leftPointer < temp - 1) {
      //more elements on the leftPointer side of the pivot
      await quickSort(array, leftPointer, temp - 1);
    }
    if (temp < rightPointer) {
      //more elements on the rightPointer side of the pivot
      await quickSort(array, temp, rightPointer);
    }
  }
 
 
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "black";
  }
  return array;
 }
 
 



async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "black";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "lightgreen";
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }
  return array;
}



sort_btn.addEventListener("click", function () {
  switch (algotouse) {
    case "bubble":
      bubbleSort(unsorted_array);
      break;
    case "merge":
      if (
        confirm(
          "Merge Sort is not visualized properly. Do you want to continue?"
        )
      ) {
        mergeSort(unsorted_array);
      } else {
        break;
      }
      //console.log(mergeSort(unsorted_array));
      break;
    case "heap":
      HeapSort(unsorted_array);
      break;
    case "insertion":
      InsertionSort(unsorted_array);
      break;
    case "quick":
      console.log(unsorted_array.length);

      quickSort(unsorted_array, 0, unsorted_array.length - 1);
      break;
    default:
      bubbleSort(unsorted_array);
      break;
  }
})
