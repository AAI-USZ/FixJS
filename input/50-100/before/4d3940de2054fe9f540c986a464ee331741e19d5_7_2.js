function(){
        var DIGITS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789";
        return function(num) {
                var ret = "", base = 54;
                do {
                        ret += DIGITS.charAt(num % base);
                        num = Math.floor(num / base);
                        base = 64;
                } while (num > 0);
                return ret;
        };
}