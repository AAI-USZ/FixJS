function iter(arr) {
    var i = 0;
    return {
        next: function () {
            if (i < arr.length)
                return arr[i++];
            throw StopIteration;
        }
    };
}