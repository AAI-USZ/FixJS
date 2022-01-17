function () {
            var result = {};
            for (var i = 0, length = arguments.length; i < length; i++) {
                add(result, arguments[i]);
            }
            return result;
        }