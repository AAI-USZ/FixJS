function isEqual(a, b) {

        if (a === b) {

            return true;

        }

        if (a !== null && typeof a !== 'undefined' && typeof a.equals !== 'undefined') {

            return a.equals(b);

        }

        if (b !== null && typeof b !== 'undefined' && typeof b.equals !== 'undefined') {

            return b.equals(a);

        }



        if (a !== null && b !== null && typeof a !== 'undefined' && typeof b !== 'undefined') {

            return a.toString() === b.toString();

        }

        return false;

    }