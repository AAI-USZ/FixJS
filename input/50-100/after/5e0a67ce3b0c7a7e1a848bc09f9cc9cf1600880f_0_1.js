function() {
    var tone_table = ["c", "c+", "d", "d+", "e", "f", "f+", "g", "g+", "a", "a+", "b"];
    return function(a) {
        var i = (a|0) % 12;
        var j = (a|0) / 12;
        return tone_table[i] + ((j|0)-2);
    };
}