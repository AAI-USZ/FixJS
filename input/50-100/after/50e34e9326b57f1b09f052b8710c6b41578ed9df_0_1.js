function(array){
    var pro = baidu.$Array.prototype
        ,ap = Array.prototype;

    baidu.type(array) != "array" && (array = []);

    for (var key in pro) {
        ap[key] || (array[key] = pro[key]);
    }

    return array;
}