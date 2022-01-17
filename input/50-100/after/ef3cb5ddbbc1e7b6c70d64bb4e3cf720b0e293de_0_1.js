function(name, sign, octave) {
        var x = atom.table[name] || 0;
        if (sign === "-") {
            --x;
        } else if (sign === "+" || sign === "#") {
            ++x;
        }
        x += (octave + 1) * 12;
        return x;
    }