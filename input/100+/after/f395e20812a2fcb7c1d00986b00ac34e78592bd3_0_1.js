function () {
    var results = [];

    //console.log(types);
    //console.log(zones);

    var b = 0;

    for(var i = 0; i < this.types.length; i++) {
        if(this.types[i] == "P") {
            if(i % 2 != 0 && this.zones[i - 1] == 1 && this.zones[i] < 3) {
                results[i] = 1;
            } else if(i % 2 == 0 && this.zones[i] < 2){
                results[i] = 1;
            } else {
                results[i] = -1;
            }
            if(i % 2 == 0){
                b = results[i];
            } else {
                b = -1 * results[i];
            }
        } else if(this.types[i] == "O") {
            results[i] = 0;
        } else if(this.types[i] == "A") {
            if(i == 0) {
                results[i] = 0;
            } else {
                if (b == 1) {
                    results[i] = 1;
                } else {
                    results[i] = -1;
                }
            }
        } else if(this.types[i] == "F") {
            if(b == 1) {
                results[i] = 1;
            } else {
                results[i] = -1;
            }
        } else if(this.types[i] == "V" && this.zones[i] == 2 && i == 0){
            results[i] = -1;
        } else {
            results[i] = 0;
        }
        //console.log(zones[i] + types[i] + ". a=" + results[i] + "; b=" + b);
    }
    //console.log(results);
    return results;
}