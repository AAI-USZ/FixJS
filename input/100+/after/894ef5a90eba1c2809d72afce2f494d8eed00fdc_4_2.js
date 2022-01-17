function (require, exports, module) {

    var $ = require('jquery');



    exports.init = function () {

        var $frontObj = $('ul.user-filter span.front');

        $frontObj.live('click', function (ev) {

            var $target = $(ev.currentTarget);

            if ($target.hasClass('show-all')) {

                $frontObj.removeClass('weak highlight', 1);

            } else {

                $('ul.user-filter span.front').removeClass('highlight').addClass('weak');

                $target.removeClass('weak').addClass('highlight');

            }

            exports.filterData();

        });

    };



    exports.filterData = function () {

        var $frontObj = $('ul.user-filter span.front');

        var $calendarWrapper = $('#calendar-wrapper');

        var $target = $frontObj.filter('.highlight');

        $calendarWrapper.find('span.front').show();

        if ($target.size() > 0) {

            var front = $target.attr('front');

            $calendarWrapper.find('span.front').hide();

            $calendarWrapper.find('.front' + front).show();

        }

    };



    exports.init();

}