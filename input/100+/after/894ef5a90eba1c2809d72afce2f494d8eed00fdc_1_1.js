function (require) {



    var $ = require('jquery');



    /*日历控件*/

    var calendar = require('calendar');

    var showLog = require('show-log');

    var userFilter = require('user-filter');





    calendar.init(new Date(), {

        onSwitch:[function () {

            showLog.init([userFilter.filterData])

        }]

    });



    /*写工作日志*/

    require('record-log').init({

        onUpdate:[showLog.init, userFilter.filterData]

    });



    /**/

    require('user-filter');

    if (!typeof console) {

        window.console = {

            log:function (str) {

                document.status = str;

            }

        }

    }

}