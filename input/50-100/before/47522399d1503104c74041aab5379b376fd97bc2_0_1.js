function (seq) {
    // ENH: warn about non-DNA characters
    var out = [];
    // Traverse the string in reverse
    for (var i = seq.length - 1; i != 0; i--) {
        // Swap base pairs
        out.push(DnaComplements[seq[i]]);
    }
    return out.join('');
}