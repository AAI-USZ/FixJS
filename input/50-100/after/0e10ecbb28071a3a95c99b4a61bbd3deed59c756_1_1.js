function(key, value, callback) {
            new Request.JSON({
                url: '/frog/pref/',
                noCache: true,
                async: false,
                headers: {"X-CSRFToken": Cookie.read('csrftoken')},
                onSuccess: function(res) {
                    Object.append(this, res.value);
                    if (callback) {
                        callback();
                    }
                }.bind(this)
            }).POST({key: key, val: value});
        }