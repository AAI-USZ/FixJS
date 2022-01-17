function isEqual(a, b) {

        if (typeof a !== 'undefined' && typeof a.equals !== 'undefined') {

            return a.equals(b);

        }



        return a === b;

    }