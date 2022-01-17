function checkCallbacks(start, arrayOfCallbacks) {

            var arg, i = arrayOfCallbacks.length;

            while (i > start) {

                arg = arrayOfCallbacks[--i];

                if (arg != null && typeof arg != 'function') throw new Error('callback is not a function');

            }

        }