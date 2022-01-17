function (err) {
            if (err !== null) {
                callback(err);
            } else {
                $.ajax({
                    url: _deployment + "apilogin.php",
                    data: {
                        username: username,
                        password: password,
                        format: "json"
                    },
                    dataType: "jsonp",
                    success: function (result) {
                        if(_debug === true) {
                            console.info("Login Result: ", result);
                        }
                        // Error handling.
                        if(result[0].error_code === undefined || result[0].error_code == "0") {
                            _key = result[0].key_id;
                            callback(null, _key);
                        } else {
                            callback(new Error(result[0].message));
                        }
                    }
                });
            }
        }