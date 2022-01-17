function () {
    /**
     * @namespace Holds various utility functions.
     */
    return prime.utils = troop.base.extend()
        .addMethod({
            /**
             * Tests whether an object is empty.
             * @param object {object} Test object.
             * @returns {boolean}
             */
            isEmpty: function (object) {
                var key;
                for (key in object) {
                    if (object.hasOwnProperty(key)) {
                        return false;
                    }
                }
                return true;
            },

            /**
             * Sets a value on the path specified by argument list.
             * Last param is the value.
             * @param object {object} Root object.
             */
            set: function (object) {
                var tmp = object,
                    length = arguments.length - 2,
                    i, key;
                for (i = 1; i < length; i++) {
                    key = arguments[i];
                    if (typeof tmp[key] !== 'object') {
                        tmp[key] = {};
                    }
                    tmp = tmp[key];
                }
                tmp[arguments[i]] = arguments[i + 1];
            },

            /**
             * Deletes value on path with all its parents that remain empty.
             * Path is specified by argument list.
             * @param object {object} Root object.
             * @returns {boolean} Whether object is empty after removal.
             */
            unset: function (object) {
                var path = arguments[1],
                    key;

                if (!(path instanceof Array)) {
                    // taking arguments and forming a path from it
                    path = Array.prototype.slice.call(arguments);
                    path.shift();
                }

                // taking next key from path
                key = path.shift();

                if (object.hasOwnProperty(key)) {
                    // when we reached the end of the path
                    // or have an empty node
                    if (path.length === 0 ||
                        this.unset(object[key], path)
                        ) {
                        // removing
                        delete object[key];
                    }
                }

                return this.isEmpty(object);
            },

            /**
             * Creates shallow copy of object.
             * @param object {object} Object to be copied.
             * @returns {object} Object copy.
             */
            shallow: function (object) {
                var result = {},
                    key;
                for (key in object) {
                    if (object.hasOwnProperty(key)) {
                        result[key] = object[key];
                    }
                }
                return result;
            }
        });
}