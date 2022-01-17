function(array, iterator, context) {
        return baidu.type.isArray(array) ? array.each(iterator, context) : array;
    }