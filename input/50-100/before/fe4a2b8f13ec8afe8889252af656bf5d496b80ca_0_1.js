function(key)
        {
            if (typeof(localStorage) === 'undefined') {
                value = read_cookie(key);
            } else {
                value = localStorage[key];
            }

            if (typeof(value) === 'undefined' || value === null)
            {
                return null;
            }

            return JSON.parse(value);
        }