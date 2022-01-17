function (require, exports, module) {

    var $ = require('jquery');

    var $calendarWrapper = $('#calendar-wrapper');

    exports.init = function () {

        var $frontObj = $('ul.user-filter span.front');

        $frontObj.live('click', function (ev) {

            var $target = $(ev.currentTarget);

            var front = $target.attr('front');

            if ($target.hasClass('show-all')) {

                $calendarWrapper.find('span.front').show();

                $frontObj.removeClass('weak highlight', 1);

            } else {

                $('ul.user-filter span.front').removeClass('highlight').addClass('weak');

                $target.removeClass('weak').addClass('highlight');

                $calendarWrapper.find('span.front').hide().siblings('span.front' + front).show();

            }

        });

    };



    exports.init();

}