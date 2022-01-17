function(name, sign, length, dot) {
        this.name = name;
        if ("><lovkqt".indexOf(name) !== -1) {
            this.type = STATUS;
        } else if ("&$[|]".indexOf(name) !== -1) {
            this.type = CONTROL;
        } else if (name.charAt(0) === "@") {
            this.type = EXTERNAL;
        } else {
            this.type = TONE;
        }
        this.sign = sign;
        if (length !== "") {
            this.length = length|0;
        } else {
            this.length = undefined;
        }
        this.dot = (dot || "").length;
    }