function (date) {
                    var lastday = date.lastDayOfMonth().lastDayOfWeek();
                    var firstday = date.firstDayOfMonth().firstDayOfWeek();
                    return Array.generate(function (i, prev) {
                        prev = prev !== null ? prev.addDays(1) : firstday;
                        var d = prev;

                        scope.currentMonth.days[i] = d;

                        return (d - lastday > 0) ? false : d;
                    });
                }