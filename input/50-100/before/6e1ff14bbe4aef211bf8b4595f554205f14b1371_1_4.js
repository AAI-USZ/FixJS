function checkHasFreezeBug() {

        if (!isFunction(Object.freeze)) {
            return false;
        }

        // Create a constructor
        var A = function () {},
            a;

        A.prototype.foo = '';
        Object.freeze(A.prototype);   // Freeze prototype

        // Create an instance
        a = new A();

        try {
            a.foo = 'baz';            // Throws a['foo'] is read only
            if (a.foo !== 'baz') {    // Or fails silently in at least IE9
                return true;
            }
        } catch (e) {
            return true;
        }

        return false;
    }