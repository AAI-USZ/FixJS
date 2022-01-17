function(array) {
            var hash = {},
                i = array.length;
            while (i--) {
                hash[array[i]] = true;
            }
            return Object.keys(hash);
        }