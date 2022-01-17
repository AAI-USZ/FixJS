function () {
    var that = {};

    that.valid_duration = ['w', 'h', 'q', 'b'];

    that.Context = (function () {
            var currDuration = 'w';

            return {
                currentDuration: function (duration) {

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
                },
            };
        }() );


    return that;
}