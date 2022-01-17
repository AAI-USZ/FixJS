function(strings) {
            var hash = {},
                i = strings.length;
            while (i--) {
                hash[strings[i]] = true;
            }
            return Object.keys(hash);
        }