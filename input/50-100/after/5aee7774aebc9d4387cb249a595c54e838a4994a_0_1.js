function (duration) {

                    if (typeof duration !== 'undefined') {
                        if ($.inArray(!isNaN(duration) ? parseInt(duration) : duration, that.valid_duration) == -1) {
                            throw {
                                name: 'typeError',
                                message: "Invalid duration. Duration needs to be char"
                            }
                        }

                        currDuration = duration;
                    }

                    return currDuration;
                }