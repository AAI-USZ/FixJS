function map(promise, mapFunc) {

            return when(promise, function (array) {

                return _map(array, mapFunc);

            });

        }