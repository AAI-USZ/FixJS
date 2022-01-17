function(value, record) {
                    if (value) {
                        var date = value.split(/[\-T:]/);
                        return new Date(date[0], date[1]-1, date[2], date[3], date[4]);
                    } else {
                        return new Date();
                    }
                }