// flag to prevent running simultaneous sorts by clicking 
// "start" multiple times
var STARTED = false;

$(document).ready(function(){
    $("#goButton").on("click", function(){
        if (!STARTED){
            STARTED = true;

            if (bubbleSort){
                bubbleSort(bubbleList);
            }
            if (quickSort){
                quickSort(quickList, 0, quickList.length-1);
            }
        }
    })
})
