function(objects) {
    var newObj = {};
    objects.forEach(function(object) {
        for (var i in object) {
            if (object.hasOwnProperty(i)) {
                newObj[i] = object[i];
            }
        }
    });
    return newObj;
}