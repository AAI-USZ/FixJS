function (require) {



    var $ = require('jquery');



    /*日历控件*/

    var calendar = require('calendar');

    var showLog = require('show-log');



    calendar.init(new Date(), {

        onSwitch:showLog.init

    });



    /*写工作日志*/

    require('record-log').init({

        onUpdate:showLog.init

    });



    require('user-filter');



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