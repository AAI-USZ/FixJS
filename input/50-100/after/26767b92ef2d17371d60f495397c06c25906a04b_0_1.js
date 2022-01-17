function(column0Row0, column1Row0, column0Row1, column1Row1) {
        this[0] = typeof column0Row0 === 'undefined' ? 0.0 : column0Row0;
        this[1] = typeof column1Row0 === 'undefined' ? 0.0 : column1Row0;
        this[2] = typeof column0Row1 === 'undefined' ? 0.0 : column0Row1;
        this[3] = typeof column1Row1 === 'undefined' ? 0.0 : column1Row1;
    }