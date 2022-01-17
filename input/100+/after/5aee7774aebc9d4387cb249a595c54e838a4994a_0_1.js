function () {
    var that = {};

    that.valid_duration = ['w', 'h', 'q', 8, 16, 32, 64];

    that.Context = (function () {
            var currDuration = 'w';

            return {
                currentDuration: function (duration) {

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
                },
            };
        }() );


    return that;
}