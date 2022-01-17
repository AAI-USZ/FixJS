function (ev) {

            var $target = $(ev.currentTarget);

            if ($target.hasClass('show-all')) {

                $frontObj.removeClass('weak highlight', 1);

            } else {

                $('ul.user-filter span.front').removeClass('highlight').addClass('weak');

                $target.removeClass('weak').addClass('highlight');

            }

            exports.filterData();

        }