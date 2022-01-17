function merge(array, args) {
            array = slice.call(array, 0);
            return update(array, args);
        }