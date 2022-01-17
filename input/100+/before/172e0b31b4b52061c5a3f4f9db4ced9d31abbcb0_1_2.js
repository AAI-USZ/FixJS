function(inst) {
            var that = $(this),
                format;
            // Force format for html5 date inputs (experimental)
            if (that.is('input')) {
                switch (that.attr('type')) {
                    case 'date':
                        format = 'yy-mm-dd';
                        break;
                    case 'datetime':
                        format = 'yy-mm-ddTHH:ii:ssZ';
                        break;
                    case 'datetime-local':
                        format = 'yy-mm-ddTHH:ii:ss';
                        break;
                    case 'month':
                        format = 'yy-mm';
                        defaults.dateOrder = 'mmyy';
                        break;
                    case 'time':
                        format = 'HH:ii:ss';
                        break;
                }
                // Check for min/max attributes
                var min = that.attr('min'),
                    max = that.attr('max');
                if (min)
                    defaults.minDate = $.scroller.parseDate(format, min);
                if (max)
                    defaults.maxDate = $.scroller.parseDate(format, max);
            }

            // Set year-month-day order
            var s = $.extend({}, defaults, inst.settings),
                offset = 0,
                wheels = [],
                ord = [],
                o = {},
                f = { y: 'getFullYear', m: 'getMonth', d: 'getDate', h: getHour, i: getMinute, s: getSecond, ap: getAmPm },
                p = s.preset,
                dord = s.dateOrder,
                tord = s.timeWheels,
                regen = dord.match(/D/),
                ampm = tord.match(/a/i),
                hampm = tord.match(/h/),
                hformat = p == 'datetime' ? s.dateFormat + s.separator + s.timeFormat : p == 'time' ? s.timeFormat : s.dateFormat,
                defd = new Date(),
                stepH = s.stepHour,
                stepM = s.stepMinute,
                stepS = s.stepSecond,
                mind = s.minDate,
                maxd = s.maxDate;

            format = format ? format : hformat;

            if (p.match(/date/i)) {

                // Determine the order of year, month, day wheels
                $.each(['y', 'm', 'd'], function(i, v) {
                    var i = dord.search(new RegExp(v, 'i'));
                    if (i > -1)
                        ord.push({ o: i, v: v });
                });
                ord.sort(function(a, b) { return a.o > b.o ? 1 : -1; });
                $.each(ord, function(i, v) {
                    o[v.v] = i;
                });

                var w = {};
                for (var k = 0; k < 3; k++) {
                    if (k == o.y) {
                        offset++;
                        w[s.yearText] = {};
                        var start = mind ? mind.getFullYear() : s.startYear,
                            end = maxd ? maxd.getFullYear() : s.endYear;
                        for (var i = start; i <= end; i++)
                            w[s.yearText][i] = dord.match(/yy/i) ? i : (i + '').substr(2, 2);
                    }
                    else if (k == o.m) {
                        offset++;
                        w[s.monthText] = {};
                        for (var i = 0; i < 12; i++)
                            w[s.monthText][i] =
                                dord.match(/MM/) ? s.monthNames[i] :
                                dord.match(/M/) ? s.monthNamesShort[i] :
                                dord.match(/mm/) && i < 9 ? '0' + (i + 1) : i + 1;
                    }
                    else if (k == o.d) {
                        offset++;
                        w[s.dayText] = {};
                        for (var i = 1; i < 32; i++)
                            w[s.dayText][i] = dord.match(/dd/i) && i < 10 ? '0' + i : i;
                    }
                }
                wheels.push(w);
            }

            if (p.match(/time/i)) {
                var w = {};
                if (tord.match(/h/i)) {
                    o.h = offset++; // Hours wheel order
                    w[s.hourText] = {};
                    for (var i = 0; i < (hampm ? 12 : 24); i += stepH)
                        w[s.hourText][i] = hampm && i == 0 ? 12 : tord.match(/hh/i) && i < 10 ? '0' + i : i;
                }
                if (tord.match(/i/)) {
                    o.i = offset++; // Minutes wheel order
                    w[s.minuteText] = {};
                    for (var i = 0; i < 60; i += stepM)
                        w[s.minuteText][i] = tord.match(/ii/) && i < 10 ? '0' + i : i;
                }
                if (tord.match(/s/)) {
                    o.s = offset++; // Seconds wheel order
                    w[s.secText] = {};
                    for (var i = 0; i < 60; i += stepS)
                        w[s.secText][i] = tord.match(/ss/) && i < 10 ? '0' + i : i;
                }
                if (ampm) {
                    o.ap = offset++; // ampm wheel order
                    var upper = tord.match(/A/);
                    w[s.ampmText] = { 0: upper ? 'AM' : 'am', 1: upper ? 'PM' : 'pm' };
                }
                wheels.push(w);
            }

            function get(d, i, def) {
                if (o[i] !== undefined)
                    return +d[o[i]];
                if (def !== undefined)
                    return def;
                return defd[f[i]] ? defd[f[i]]() : f[i](defd);
            }

            function step(v, step) {
                return Math.floor(v / step) * step;
            }

            function getHour(d) {
                var hour = d.getHours();
                hour = hampm && hour >= 12 ? hour - 12 : hour;
                return step(hour, stepH);
            }

            function getMinute(d) {
                return step(d.getMinutes(), stepM);
            }

            function getSecond(d) {
                return step(d.getSeconds(), stepS);
            }

            function getAmPm(d) {
                return ampm && d.getHours() > 11 ? 1 : 0;
            }

            function getDate(d) {
                var hour = get(d, 'h', 0);
                return new Date(get(d, 'y'), get(d, 'm'), get(d, 'd'), get(d, 'ap') ? hour + 12 : hour, get(d, 'i', 0), get(d, 's', 0));
            }

            inst.setDate = function(d, fill, time) {
                // Set wheels
                for (var i in o)
                    this.temp[o[i]] = d[f[i]] ? d[f[i]]() : f[i](d);
                this.setValue(true, fill, time);
            }

            inst.getDate = function(d) {
                return getDate(d);
            }

            return {
                wheels: wheels,
                headerText: function(v) {
                    return $.scroller.formatDate(hformat, getDate(inst.temp), s);
                },
                /**
                 * Builds a date object from the wheel selections and formats it to the given date/time format
                 * @param {Array} d - An array containing the selected wheel values
                 * @return {String} - The formatted date string
                 */
                formatResult: function(d) {
                    return $.scroller.formatDate(format, getDate(d), s);
                },
                /**
                 * Builds a date object from the input value and returns an array to set wheel values
                 * @return {Array} - An array containing the wheel values to set
                 */
                parseValue: function(val) {
                    var d = new Date(),
                        result = [];
                    try {
                        d = $.scroller.parseDate(format, val, s);
                    }
                    catch (e) {
                    }
                    // Set wheels
                    for (var i in o)
                        result[o[i]] = d[f[i]] ? d[f[i]]() : f[i](d);
                    return result;
                },
                /**
                 * Validates the selected date to be in the minDate / maxDate range and sets unselectable values to disabled
                 * @param {Object} dw - jQuery object containing the generated html
                 * @param {Integer} [i] - Index of the changed wheel, not set for initial validation
                 */
                validate: function(dw, i) {
                    var temp = inst.temp,
                        mins = { m: 0, d: 1, h: 0, i: 0, s: 0, ap: 0 },
                        maxs = { m: 11, d: 31, h: step(hampm ? 11 : 23, stepH), i: step(59, stepM), s: step(59, stepS), ap: 1 },
                        w = (mind || maxd) ? ['y', 'm', 'd', 'ap', 'h', 'i', 's'] : ((i == o.y || i == o.m || i === undefined) ? ['d'] : []), // Validate day only, if no min/max date set
                        minprop = true,
                        maxprop = true;
                    $.each(w, function(x, i) {
                        if (o[i] !== undefined) {
                            var min = mins[i],
                                max = maxs[i],
                                maxdays = 31,
                                val = get(temp, i),
                                t = $('ul', dw).eq(o[i]),
                                y, m;
                            if (i == 'd') {
                                y = get(temp, 'y'),
                                m = get(temp, 'm');
                                maxdays = 32 - new Date(y, m, 32).getDate();
                                max = maxdays;
                                if (regen)
                                    $('li', t).each(function() {
                                        var that = $(this),
                                            d = that.data('val'),
                                            w = new Date(y, m, d).getDay();
                                        that.html(dord.replace(/[my]/gi, '').replace(/dd/, d < 10 ? '0' + d : d).replace(/d/, d).replace(/DD/, s.dayNames[w]).replace(/D/, s.dayNamesShort[w]));
                                    });
                            }
                            if (minprop && mind) {
                                min = mind[f[i]] ? mind[f[i]]() : f[i](mind);
                            }
                            if (maxprop && maxd) {
                                max = maxd[f[i]] ? maxd[f[i]]() : f[i](maxd);
                            }
                            if (i != 'y') {
                                var i1 = $('li[data-val="' + min + '"]', t).index(),
                                    i2 = $('li[data-val="' + max + '"]', t).index();
                                $('li', t).removeClass('dw-v').slice(i1, i2 + 1).addClass('dw-v');
                                if (i == 'd') { // Hide days not in month
                                    $('li', t).removeClass('dw-h').slice(maxdays).addClass('dw-h');
                                }
                                if (val < min)
                                    val = min;
                                if (val > max)
                                    val = max;
                            }
                            if (minprop)
                                minprop = val == min;
                            if (maxprop)
                                maxprop = val == max;
                            // Disable some days
                            if (s.invalid && i == 'd') {
                                var idx = [];
                                // Disable exact dates
                                if (s.invalid.dates)
                                    $.each(s.invalid.dates, function(i, v) {
                                        if (v.getFullYear() == y && v.getMonth() == m) {
                                            idx.push(v.getDate() - 1);
                                        }
                                    });
                                // Disable days of week
                                if (s.invalid.daysOfWeek) {
                                    var first = new Date(y, m, 1).getDay();
                                    $.each(s.invalid.daysOfWeek, function(i, v) {
                                        for (var j = v - first; j < maxdays; j += 7)
                                            if (j >= 0)
                                                idx.push(j);
                                    });
                                }
                                // Disable days of month
                                if (s.invalid.daysOfMonth)
                                    $.each(s.invalid.daysOfMonth, function(i, v) {
                                        v = (v + '').split('/');
                                        if (v[1]) {
                                            if (v[0] - 1 == m)
                                                idx.push(v[1] - 1);
                                        }
                                        else
                                            idx.push(v[0] - 1);
                                    });
                                $.each(idx, function(i, v) {
                                    $('li', t).eq(v).removeClass('dw-v');
                                });
                            }
                        }
                    });
                },
                methods: {
                    /**
                    * Returns the currently selected date.
                    * @param {Boolean} temp - If true, return the currently shown date on the picker, otherwise the last selected one
                    * @return {Date}
                    */
                    getDate: function(temp) {
                        //var inst = $(this).data('scroller');
                        var inst = $(this).scroller('getInst');
                        if (inst)
                            return inst.getDate(temp ? inst.temp : inst.values);
                    },
                    /**
                    * Sets the selected date
                    * @param {Date} d - Date to select.
                    * @param {Boolean} [fill] - Also set the value of the associated input element. Default is true.
                    * @return {Object} - jQuery object to maintain chainability
                    */
                    setDate: function(d, fill, time) {
                        if (fill == undefined) fill = false;
                        return this.each(function () {
                            var inst = $(this).scroller('getInst');
                            if (inst)
                                inst.setDate(d, fill, time);
                        });
                    }
                }
            }
        }