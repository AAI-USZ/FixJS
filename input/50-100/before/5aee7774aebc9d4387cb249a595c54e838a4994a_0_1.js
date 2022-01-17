function (duration) {

                    if (typeof duration !== 'undefined') {
                        if (typeof duration !== 'string' || $.inArray(duration, that.valid_duration) == -1) {
                            throw {
                                name: 'typeError',
                                message: "Invalid duration. Duration needs to be char"
                            }
                        }

                        currDuration = duration;
                    }

                    return currDuration;
                }