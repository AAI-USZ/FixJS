function checkKeywords(object, type) {

        var reserved = type === 'normal' || !type ? reservedNormal : reservedStatics,
            x;

        for (x = reserved.length - 1; x >= 0; x -= 1) {
            if (hasOwn(object, reserved[x])) {
                throw new Error('"' + object.$name + '" is using a reserved keyword: ' + reserved[x]);
            }
        }
    }