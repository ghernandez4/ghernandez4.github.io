/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////
//implement bubbleSort function
async function bubbleSort(array) {
for (i = 0; i <= array.length - 1; i++) {
    for(j = array.length - 1; j >= i + 1; j--) {
        if (array[j].value < array[j - 1].value){
            swap(array, j, j - 1);
            updateCounter(bubbleCounter);
            await sleep();
        }
    }
}
}
//implement quickSort function
async function quickSort(array, left, right) {
if ((right - left) >= 1) {
    var index = await partition(array, left, right);
}
    if (left < index - 1) {
        await quickSort(array, left, index - 1);
    }
    if (right > index) {
        await quickSort(array, index, right);
    }

}

//implement partition function
async function partition(array, left, right) {
    var pivot = array[Math.floor((right + left)/2)].value;
    while (left < right) {
    while (array[left].value < pivot) {
        left++;
    }
    while (array[right].value > pivot) {
        right--;
    }
    if (left < right) {
        swap(array, left, right);
        updateCounter(quickCounter);
        await sleep();
    }
}
    return left + 1;
}

//swaps functions when called
function swap(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp
    drawSwap(array,a,b);
}
///////////////////////////////////////////////////////////////////////
/////////////////Merge Sort////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
async function merge(arr, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;
 
    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);
 
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
 
    // Merge the temp arrays back into arr[l..r]
 
    // Initial index of first subarray
    var i = 0;
 
    // Initial index of second subarray
    var j = 0;
 
    // Initial index of merged subarray
    var k = l;
 
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
 
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
 
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}
 
// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
async function mergeSort(arr,l, r){
    if(l >= r){
        return;
    }
    var m = l + parseInt((r-l)/2);
    await mergeSort(arr,l,m);
    await mergeSort(arr,m+1,r);
    await merge(arr,l,m,r);
}
 

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}