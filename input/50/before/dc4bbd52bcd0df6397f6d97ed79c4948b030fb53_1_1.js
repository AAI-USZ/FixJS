function (id, e) {
                        var json = JSON.parse(e.responseText);
                        callback(json);
                    }