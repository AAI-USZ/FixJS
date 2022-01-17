function(input){
        if (input.length < 1){
            return false;
        }
        var cInput = input.charAt(0);
        return /^[\u09be\u09bf\u09c0\u09c1\u09c2\u09c3\u09c7\u09c8\u09cb\u09cc\u09c4]$/.test(cInput);
    }