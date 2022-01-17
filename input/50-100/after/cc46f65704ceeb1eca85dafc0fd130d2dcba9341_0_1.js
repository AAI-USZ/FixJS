function(obj) {
    	var funcNameRegex = /function (.{1,})\(/;
   		
        if (typeof obj === "undefined" || obj === null || (typeof obj === "number" && isNaN(obj))) {
            return false;
        //fixed the array type checking by winson 20120702
        } else if ((funcNameRegex).exec(obj.constructor.toString())[1]  === "Array") {
            return "array";
        } else {
            return typeof obj;
        }
    }