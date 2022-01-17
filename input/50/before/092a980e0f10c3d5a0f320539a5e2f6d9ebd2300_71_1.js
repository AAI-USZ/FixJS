function (match, num) {
            return typeof args[num] !== 'undefined' ? args[num] : match;
        }