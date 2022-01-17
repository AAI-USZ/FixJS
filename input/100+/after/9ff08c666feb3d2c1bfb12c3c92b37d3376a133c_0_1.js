function(arr, comp) {
    if (typeof(comp) !== 'function') {
        comp = function(a, b) {
            return String(a).localeCompare(b);
        };
    }

    // Rather than dividing input, simply iterate chunks of 1, 2, 4, 8, etc.
    // Chunks are the size of the left or right hand in merge sort.
    // Stop when the left-hand covers all of the array.
    var len = arr.length, chk;
    for (chk = 1; chk < len; chk *= 2) {
        arr = pass(arr, comp, chk);
    }
    return arr;
}