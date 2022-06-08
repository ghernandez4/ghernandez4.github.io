// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
    render($("#display"), image);
    $("#red").on("click", redFilter);
    $('#blue').on('click', blueFilter);
    $('#green').on('click', greenFilter);
    $('#blur').on('click', smudgeFilter);
    $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
    reset();
    render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
//applies red filter when called
function redFilter() {
    // Multiple TODOs: Call your apply function(s) here
    applyFilterNoBackground(reddify);
    // do not change the below line of code
    render($("#display"), image);
}
//applies blue filter when called
function blueFilter() {
    applyFilterNoBackground(increaseBlue);
    render($('#display'), image);
}
//applies green filter when called
function greenFilter() {
    applyFilterNoBackground(increaseGreen);
    render($('#display'), image);
}

//blurs image
function smudgeFilter() {
    applyFilterNoBackground(smudge);
    render($('#display'), image);
}
/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

//Unused function

// TODO 1, 2 & 4: Create the applyFilter function here
//function applyFilter(filterFunction) {
//    for (var i = 0; i < image.length; i++) {
//        var column = image[i];
//
//        for (var c = 0; c < column.length; c++) {
//                var rgbString  = image[i][c];
//                var rgbNumbers = rgbStringToArray(rgbString);
//                filterFunction(rgbNumbers);
//                rgbString = rgbArrayToString(rgbNumbers);
//                image[i][c] = rgbString;
//        }
//    }
// }

//Applies filter without changing the background
function applyFilterNoBackground(filterFunction) {
    for (var r = 0; r < image.length; r++) {
        var columnR = image[r];

        for (var d = 0; d < columnR.length; d++) {
                var rgbStringNoBackground = image[r][d];
                if (rgbStringNoBackground === image[0][0]) {
                    image[r][d] = image[0][0];
                } else {
                var rgbNumbersNoBackground = rgbStringToArray(rgbStringNoBackground);
                filterFunction(rgbNumbersNoBackground);
                rgbStringNoBackground = rgbArrayToString(rgbNumbersNoBackground);
                image[r][d] = rgbStringNoBackground;
                }
        }
    }
}

//keeps rgb values between 0 and 255
function keepInBounds(num) {
return ((num > 255) ? 255
        :(num < 0) ? 0
        :num);
}
// increases red each time it is called
function reddify(arr) {
    arr[RED] = keepInBounds(arr[RED] + 50);
}

//increases blue filter each time it is called
function increaseBlue(arr) {
    arr[BLUE] = keepInBounds(arr[BLUE] + 50);
}
//increases green filter each time it is called
function increaseGreen(arr) {
    arr[GREEN] = keepInBounds(arr[GREEN] + 50);
}

// CHALLENGE code goes below here
//smudges image when called
function smudge(arr) {
    for (i = 0; i < image.length; i++) {
        var columnS = image[i]
        for (y = 1; y < columnS.length; y++) {
            var curPixel = image[i][y];
            var prevPixel = image[i][y - 1];
            var valPixel = rgbStringToArray(curPixel);
            var valPrevPixel = rgbStringToArray(prevPixel)
            valPixel[RED] = valPrevPixel[GREEN];
            curPixel = rgbArrayToString(valPixel);
            image[i][y] = curPixel
        }
    }
}