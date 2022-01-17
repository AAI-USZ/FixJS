function() {
    var re = /^([CDEFGAB])([-+#b]?)([0-9]?)$/;
    var map = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
    return function(a) {
        var m, result = 0;
        if ((m = a.match(re)) !== null) {
            result = map[m[1]];
            switch (m[2]) {
            case "+": case "#":
                ++result;
                break;
            case "-": case "b":
                --result;
                break;
            }
            result += 12 * ((m[3]|0)+2);
        }
        return result;
    };
}