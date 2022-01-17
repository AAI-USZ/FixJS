function () {

        var table = '<table id="calendar-container">' +

            '<thead>' +

            '<tr class="th">' +

            '<th class="weekend">日</th>' +

            '<th>一</th>' +

            '<th>二</th>' +

            '<th>三</th>' +

            '<th>四</th>' +

            '<th>五</th>' +

            '<th class="weekend">六</th>' +

            '</tr>' +

            '</thead>' +

            '<tbody>';



        var lastMonth = (new Date());

        (function () {

            lastMonth.setTime(currentDate.getTime());

            lastMonth.setDate(1);

            if (currentDate.getMonth() == 0) {

                lastMonth.setMonth(11);

                lastMonth.setFullYear(currentDate.getFullYear() - 1);

            } else {

                lastMonth.setMonth(currentDate.getMonth() - 1);

            }

        })();



        var nextMonth = (new Date());

        (function () {

            nextMonth.setTime(currentDate.getTime());

            nextMonth.setDate(1);

            if (currentDate.getMonth() == 11) {

                nextMonth.setMonth(0);

                nextMonth.setFullYear(currentDate.getFullYear() + 1);

            } else {

                nextMonth.setMonth(currentDate.getMonth() + 1);

            }

        })();



        var dateArr = [];

        var _tempDate = new Date();

        _tempDate.setTime(currentDate.getTime());

        _tempDate.setDate(1);

        var leftDate = _tempDate.getDay();



        var currentMaxDays = exports.getMaxDays(currentDate, currentDate.getMonth());

        var prevMaxDays = exports.getMaxDays(lastMonth, lastMonth.getMonth());



        for (var i = 0; i < leftDate; i++) {

            dateArr.push({type:'prev', date:prevMaxDays - i});

        }

        dateArr.reverse();



        for (i = 1; i < currentMaxDays + 1; i++) {

            dateArr.push({type:'current', date:i});

        }



        //获取月末是星期几

        _tempDate.setDate(currentMaxDays);

        for (i = 1; i <= 7 - _tempDate.getDay() - 1; i++) {

            dateArr.push({type:'next', date:i});

        }



        //补足月末的天数

        var calendarStr = [], _current = '';

        for (var j = 0; j < dateArr.length; j++) {

            switch (dateArr[j].type) {

                case "prev":

                    _current = ' class="prev" id="date-' + lastMonth.getFullYear() + (lastMonth.getMonth() + 1) + dateArr[j].date + '"';

                    break;

                case "next":

                    _current = ' class="next" id="date-' + nextMonth.getFullYear() + (nextMonth.getMonth() + 1) + dateArr[j].date + '"';

                    break;

                case "current":

                    _current = ' class="current" id="date-' + currentDate.getFullYear() + (currentDate.getMonth() + 1) + dateArr[j].date + '"';

                    break;

            }

            if (j == 0 || (j + 1) % 7 == 1) {

                calendarStr.push('<tr>')

            }

            if ((j + 1) % 7 == 0 && j > 0) {

                calendarStr.push('<td' + _current + '><div class="wrapper"><div class="work-diary"></div><b class="day">' + dateArr[j].date + '</b></div></td></tr>')

            } else {

                calendarStr.push('<td' + _current + '><div class="wrapper"><div class="work-diary"></div><b class="day">' + dateArr[j].date + '</b></div></td>');

            }

            _current = '';

        }



        $yearNode.html(currentDate.getFullYear());

        $monthNode.html(currentDate.getMonth() + 1);

        $('#calendar-wrapper').html(table + calendarStr.join(''));



        exports.autoResetOffset();



        if (Param !== undefined && Param.onSwitch) {

            Param.onSwitch();

        }

    }