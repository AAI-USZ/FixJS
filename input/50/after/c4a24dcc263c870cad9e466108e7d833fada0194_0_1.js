function(first, second){
    for (var prop in second){
        first[prop] = second[prop];
    }
}