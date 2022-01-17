function hash_get_value(key) {
    // Get value for key in hash
    hash = $(location).attr('hash').substring(2).toLowerCase();
    keys = hash.split('/').filter(function(element, index) { return (index % 2 == 0) });
    values = hash.split('/').filter(function(element, index) { return (index % 2 == 1) });
    index_of_key = keys.indexOf(key)
    if (index_of_key > -1) {
        return values[index_of_key].toLowerCase();
    }

    return undefined
}