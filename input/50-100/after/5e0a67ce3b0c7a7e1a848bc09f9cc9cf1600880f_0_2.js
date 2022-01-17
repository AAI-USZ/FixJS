function(a) {
        var m, result = 0;
        if ((m = a.match(re)) !== null) {
            result = map[m[1].toLowerCase()];
            switch (m[2]) {
            case "+": case "#":
                ++result;
                break;
            case "-": case "b":
                --result;
                break;
            }
            result += 12 * ((m[3]|0) + 1);
        }
        return result;
    }