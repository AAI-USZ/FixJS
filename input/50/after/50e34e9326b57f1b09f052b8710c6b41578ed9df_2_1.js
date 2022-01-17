function(array, filter, context) {
    return baidu.type.isArray(array) ? array.filter(filter, context) : [];
}