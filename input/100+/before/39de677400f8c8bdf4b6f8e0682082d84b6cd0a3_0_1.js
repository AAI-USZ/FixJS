function (val, key) {
        console.log(key);
        each(val, function (val, key) {
            console.log('  - ', key)
        })
    }