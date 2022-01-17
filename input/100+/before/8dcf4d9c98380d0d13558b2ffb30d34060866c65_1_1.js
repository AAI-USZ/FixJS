function(search, callback) {
    var count = search.length;
    var found = [];

    for (var i = 0; i < search.length; i++) {
        this.getImage(search[i], function(error, result){
            found.push(result);
            --count;
            if (count == 0) callback(error, found);
        });
    }
}