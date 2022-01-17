function() {
    var re = /^([CDEFGABcdefgab])([-+#b]?)([0-9]?)$/;
    var map = {c:0,d:2,e:4,f:5,g:7,a:9,b:11};
    return function(a) {
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
    };
}