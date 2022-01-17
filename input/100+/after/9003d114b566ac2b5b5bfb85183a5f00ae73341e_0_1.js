function(date, refDate) {
        moment.lang('fr');
        if (date !== '') {
            var i = moment(refDate).hours(date.hours()).minutes(date.minutes()).seconds(date.seconds()).milliseconds(date.milliseconds());
            diff = 0;
            /*
             *console.log("===============");
             *console.log("===== next ====");
             *console.log("===============");
             */
            for (; i <= date; i.add('days', 1)) {
                //console.log("===== next day : ", i.format('D M YY dddd'));
                var timeDay = 0;
                if (refDate.format('D M YY') === date.format('D M YY')) {
                    //console.log("oneDay : ");

                    timeDay = date.diff( refDate, 'hours', true);

                    if (refDate.hours() <= 12 && date.hours() >= 14) {
                        timeDay -= 2;
                    }
                    diff += timeDay;
                }
                else if (i.format('D M YY') === refDate.format('D M YY')) {
                    //console.log("firstDay : ");

                    if (refDate.hours() < 18) {
                        var endDay = moment(refDate).hours(18).minutes(0).seconds(0).milliseconds(0);
                        timeDay += endDay.diff( refDate, 'hours', true);
                    }

                    if (refDate.hours() <= 12) {
                        timeDay -= 2;
                    }
                    diff += timeDay;
                }
                else if (i.format('D M YY') === date.format('D M YY')) {
                    //console.log("lastDay : ", i.format('D M YY'), date.format('D M YY'));
                    //console.log("lastDay : ");

                    if (date.hours() >= 9) {
                        var beginDay = moment(date).hours(9).minutes(0).seconds(0).milliseconds(0);
                        timeDay += date.diff( beginDay, 'hours', true);
                    }

                    if (date.hours() >= 14) {
                        timeDay -= 2;
                    }
                    //console.log("date.hours() : ", date.hours());
                    diff += timeDay;
                }
                else if (i.format('dddd') === 'samedi' || i.format('dddd') === 'dimanche' ||
                        holiday.indexOf(i.format('D M YY')) >= 0 ||
                        holiday.indexOf(i.format('D M')) >= 0
                         ) {
                    //console.log("holiday.indexOf(i.format('D M')) : ", holiday.indexOf(i.format('D M')));
                    //console.log("skip : ", i.format('D M YY dddd'));
                    //console.log("skip : ");
                    continue;
                }
                else{
                    //console.log("normal : ", i.format('D M YY dddd'));
                    timeDay += 7;
                    diff += timeDay;
                }
                //console.log("timeDay : ", timeDay);
                //console.log("diff : ", diff);
                //eventsManager.emit('log', {i: i.format('D M YY dddd'), timeDay: timeDay, diff: diff});
            }

            var diffRound = Math.round(diff * 100) / 100;
            return diffRound;
        }
        else {
            return '';
        }
    }