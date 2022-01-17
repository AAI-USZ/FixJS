function hash_get_value(key) {
    // Get value for key in hash
    var hash = $(location).attr('hash').substring(2).toLowerCase();
    var keys = hash.split('/').filter(function(element, index) { return (index % 2 == 0) });
    var values = hash.split('/').filter(function(element, index) { return (index % 2 == 1) });
    var index_of_key = keys.indexOf(key)
    if (index_of_key > -1) {
        return values[index_of_key].toLowerCase();
    }

    return undefined
}