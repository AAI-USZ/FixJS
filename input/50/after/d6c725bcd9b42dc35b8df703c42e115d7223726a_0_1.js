function () {
            var result = arguments[0];
            for (var i = 1, n = arguments.length; i < n; i++) {
                add(result, arguments[i]);
            }
            return result;
        }