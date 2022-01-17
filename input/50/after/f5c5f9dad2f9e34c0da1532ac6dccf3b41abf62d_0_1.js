function deepEqualNoKey(objA, objB, name) {
        delete objA[name].$keyup;

        deepEqual(objA, objB);
    }