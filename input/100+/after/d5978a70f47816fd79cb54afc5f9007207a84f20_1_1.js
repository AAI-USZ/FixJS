function colorDifference(a, b) {
        var a = parseHexColor(a);
        var b = parseHexColor(b);

        if(typeof(a) != 'undefined' && typeof(b) != 'undefined') {
            var result = 0;

            r = Math.abs(a.red - b.red);
            g = Math.abs(a.green - b.green);
            b = Math.abs(a.blue - b.blue);
            result = r+g+b;
            console.log(result);

            if (result <= 25) {
                return 100;
            } else if (result >= 113) {
                return 0;
            } else {
                console.log(result);
                console.log(Math.round(100-(1/50)*(Math.pow(result-25, 1.9))));
                return Math.round(100-(1/50)*(Math.pow(result-25, 1.9)));
            }
        }
    }