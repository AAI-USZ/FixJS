function(array){
    var pro = baidu.$Array.prototype
        ,ap = Array.prototype;

    for (var key in pro) {
        ap[key] || (array[key] = pro[key]);
    }

    return array;
}