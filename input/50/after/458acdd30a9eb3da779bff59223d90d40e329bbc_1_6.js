function(m) {
            var str = esc(params[m.substring(1)]);
            if (str == '') {
                throw(m.substring(1) + " is required");
            }
            return str;
        }