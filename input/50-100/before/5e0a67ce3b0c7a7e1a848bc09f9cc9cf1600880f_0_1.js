function() {
    var tone_table = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    return function(a) {
        var i = (a|0) % 12;
        var j = (a|0) / 12;
        return tone_table[i] + ((j|0)-2);
    };
}