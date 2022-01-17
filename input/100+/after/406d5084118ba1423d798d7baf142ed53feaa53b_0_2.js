function calcIt(fNumber, operation, lNumber){
        var result, fCount = "", lCount = "", length = 0;
        fCount = (fNumber.indexOf(".", 0) != -1)?fNumber.substring(fNumber.indexOf(".", 0)+1, fNumber.length):"";
        lCount = (lNumber.indexOf(".", 0) != -1)?lNumber.substring(lNumber.indexOf(".", 0)+1, lNumber.length):"";
        length = (fCount.length >= lCount.length)?fCount.length:lCount.length;
        length = Math.pow(10, length);
        fNumber = fNumber * length;
        lNumber = lNumber * length;
        switch(operation){
            case "+":                
                result = (fNumber + lNumber)/length;
                break;
            case "-":
                result = (fNumber - lNumber)/length;
                break;
            case "*":
                result = (fNumber * lNumber)/Math.pow(length, 2);
                break;
            case "/":
                result = fNumber/lNumber;
                break;
        }
        return result;
    }