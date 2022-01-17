function hash_set_value(key, value) {
    // Set value for key in hash
    var hash = $(location).attr('hash').substring(2).toLowerCase().replace(/\/$/, '');
    var keys;
    var values;

    if (value === undefined) {
        value = '';
    }

    // console.log('Hash:', hash);
    if (hash.length > 0) {
        keys = hash.split('/').filter(function(element, index) { return (index % 2 === 0); });
        values = hash.split('/').filter(function(element, index) { return (index % 2 === 1); });
    }
    else {
        keys = [];
        values = [];
    }

    index_of_key = keys.indexOf(key);

    if (index_of_key > -1) {
        // console.log('Found', key);
        values[index_of_key] = value;
    }
    else {
        // console.log('Not Found', key);
        keys.push(key);
        values.push(value);
    }

    // console.log(hash.split('/'));
    // console.log('Keys', keys);
    // console.log('Values', values);
    hash = '/';
    for (var i=0; i < keys.length; i++) {
        // console.log(i, keys[i], values[i])
        if (values[i].length > 0 ) {
            hash += keys[i] + '/' + values[i] + '/';
        }
    }
    // console.log(hash);

    $(location).attr('hash', hash);
}