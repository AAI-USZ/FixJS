function splitKeyword(str){
        if(str){
            return str.replace(/[\+\s　]+/g, " ").split(" ");
        }
        return [];
    }