function() {


    /**
     * @page        http://github.com/Shushik/b-cal/
     * @author      Shushik <silkleopard@yandex.ru>
     * @version     1.0
     * @description a simple javascript calendar
     *
     * @constructor
     *
     * @this    {Cal}
     * @param   {DOMNode}
     * @param   {DOMNode}
     * @param   {Object}
     * @param   {Object}
     * @returns {Cal}
     */
    function
        Cal(target, field, params, handlers) {
            if (arguments && arguments.length > 1) {
                this.init(target, field, params, handlers);
            }

            return this;
        };


    Cal.prototype = {
        /**
         * Locale vocabulary
         *
         * @private
         */
        _lang : null,
        /**
         * Locale holidays
         *
         * @private
         */
        _holidays : [],
        /**
         * Default language properties
         *
         * @private
         */
        _default : {
            tmpl : {
                hat    : '{{ month.full }} {{ year.full }}',
                prev   : '{{ month.full }} {{ year.full }}',
                next   : '{{ month.full }} {{ year.full }}',
                stdout : '{{ day.num }} {{ month.part }}',
                mirror : '{{ year.full }}-{{ month.nums }}-{{ day.nums }}'
            },
            lang : {
                hide : 'Hide',
                weekdays : {
                    full : [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday'
                    ],
                    part : [
                        'Mo',
                        'Tu',
                        'We',
                        'Th',
                        'Fr',
                        'Sa',
                        'Su'
                    ]
                },
                monthes : {
                    full  : [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                    ],
                    decl : [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                    ],
                    part : [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                    ]
                }
            }
        },
        /**
         * Initialization (immediate or delayed)
         *
         * @this    {Cal}
         * @param   {DOMNode}
         * @param   {DOMNode}
         * @param   {Object}
         * @param   {Object}
         * @returns {Cal}
         */
        init : function(target, field, params, handlers) {
            params   = params   || {};
            handlers = handlers || {};

            var
                alias = '',
                self  = this,
                tmpl  = this._default.tmpl,
                pure  = new Date();

            /**
             * Visibility indicator
             */
            this.shown = false;

            // Setup language settings
            Cal.lang(params.lang);

            /**
             * The way calendar should work with the field node
             *
             * @private
             */
            if (field) {
                if (field.innerHTML) {
                    this._way = 'innerHTML';
                } else {
                    this._way = 'value';
                }
            }

            /**
             * Don`t hide calendar on blur
             *
             * @private
             */
            this._hold = false;

            // Setup templates
            if (!params.tmpl) {
                params.tmpl = {};
            }

            for (alias in tmpl) {
                if (!params.tmpl[alias]) {
                    params.tmpl[alias] = tmpl[alias];
                }
            }

            // Setup minimal date
            if (!params.min_date) {
                params.min_date = new Date(
                    pure.getFullYear(),
                    pure.getMonth(),
                    pure.getDate() - 1
                );
            } else if (typeof params.min_date == 'string') {
                params.min_date = Cal.parse(params.min_date);
            }

            /**
             * Minimal approved date
             *
             * @private
             */
            this._min = params.min_date;

            // Setup current date
            if (!params.now_date) {
                params.now_date = pure;
            } else if (typeof params.now_date == 'string') {
                params.now_date = Cal.parse(params.now_date);
            }

            /**
             * Current date
             *
             * @private
             */
            this._now = params.now_date;

            // Setup maximal date
            if (!params.max_date) {
                params.max_date = new Date(
                    pure.getFullYear() + 1,
                    pure.getMonth(),
                    pure.getDate()
                );
            } else if (typeof params.max_date == 'string') {
                params.max_date = Cal.parse(params.max_date);
            }

            /**
             * Maximal approved date
             *
             * @private
             */
            this._max = params.max_date;

            /**
             * Dates, saved between the calendar calls
             *
             * @private
             */
            this._data = {
                prev : null,
                curr : null,
                next : null
            };

            /**
             * Nodes list
             *
             * @private
             */
            this._nodes = {
                days   : null,
                prev   : null,
                next   : null,
                week   : null,
                items  : {
                    alias   : '',
                    list    : [],
                    chosen  : null,
                    clicked : null
                },
                block  : null,
                field  : field,
                target : target
            };

            // Setup the date in field by the default
            if (this._nodes.field && params.default_stdout) {
                if (typeof params.default_stdout == 'string') {
                    params.default_stdout = Cal.parse(params.default_stdout);
                }

                this._nodes.field[this._way] = this._tmpl(
                    params.tmpl.stdout,
                    Cal.human(params.default_stdout)
                );

                if (params.mirror) {
                    params.mirror[this._way] = this._tmpl(
                        params.tmpl.mirror,
                        Cal.human(params.default_stdout)
                    );
                }
            }

            /**
             * Another calendar instance, which is tangled with this instance
             *
             * @private
             */
            this._tangled = null;

            /**
             * All registered event handlers
             *
             * @private
             */
            this._events = [];

            /**
             * Offset coordinates of the field
             *
             * @private
             */
            if (!params.offset_ignore) {
                this._offset = this._offsetize(
                    this._nodes.field,
                    this._nodes.target
                );
            }

            /**
             * Saved user params
             *
             * @private
             */
            this._params = {};

            for (alias in params) {
                if (alias != 'lang') {
                    this._params[alias] = params[alias];
                }
            }

            /**
             * Saved user handlers
             *
             * @private
             */
            this._handlers = handlers;

            // So let`s start
            this._install();

            return this;
        },
        /**
         * Kill and destroy
         *
         * @this    {Cal}
         * @returns {Undefined}
         */
        uninstall : function() {
            var
                pos    = 0,
                events = this._events.length,
                remove = [
                    '_min',
                    '_now',
                    '_max',
                    '_way',
                    'shown',
                    '_hold',
                    '_data',
                    '_nodes',
                    '_events',
                    '_offset',
                    '_params',
                    '_tangled',
                    '_handlers',
                    'hiddenable'
                ],
                event  = null,
                child  = this._nodes.block,
                parent = this._nodes.target;

            // Unbind events
            for (pos = 0; pos < events; pos++) {
                event = this._events[pos];

                this._unbind(event.target, event.alias, event.handler);
            }

            // Remove properties
            for (pos = 0; pos < 7; pos++) {
                delete this[remove[pos]];
            }

            // Remove DOM
            parent.removeChild(child);

            return true;
        },
        /**
         * Tie up two calendar instances
         *
         * @this    {Cal}
         * @param   {Cal}
         * @param   {String}
         * @returns {Cal}
         */
        tangle : function(instance, relation) {
            this._tangled = {
                instance : instance,
                relation : relation
            };

            return this;
        },
        /**
         * Show calendar
         *
         * @this    {Cal}
         * @param   {Object}
         * @returns {Cal}
         */
        show : function(pos) {
            pos = pos || {};

            var
                alias  = '',
                now    = null,
                min    = this._params.min_date,
                max    = this._params.max_date,
                block  = this._nodes.block,
                field  = this._nodes.field,
                ignore = this._params.offset_ignore;

            // Try to use user given offset properties
            for (alias in this._offset) {
                if (!pos[alias]) {
                    pos[alias] = this._offset[alias];
                }
            }

            // Try to read a date from field
            if (field && field[this._way] != '') {
                now = Cal.parse(field[this._way]);
            } else {
                now = this._params.now_date;
            }

            // Change indicator
            this.shown = true;

            // Draw DOM for a chosen calendar
            this._draw(now);

            // Apply offset properties
            if (ignore != 'top') {
                block.style.top  = (pos.top + pos.height)  + 'px';
            }

            if (this._tangled) {
                this._tangled.instance.hide();
            }

            if (ignore != 'left') {
                block.style.left = pos.left + 'px';
            }

            // Add visibility class
            this._nodes.block.className += ' b-cal_is_visible';

            return this;
        },
        /**
         * Hide calendar
         *
         * @this    {Cal}
         * @returns {Boolean|Cal}
         */
        hide : function() {
            // Remove visibility class
            this._nodes.block.className = this._nodes.block.className
                                          .replace(' b-cal_is_visible', '');

            // Change visibility indicator
            this.shown = false;

            return this;
        },
        /**
         * Go to the previous month
         *
         * @this    {Cal}
         * @returns {Cal}
         */
        prev : function() {
            this._draw(this._data.prev.raw);

            return this;
        },
        /**
         * Go to the previous month
         *
         * @this    {Cal}
         * @returns {Cal}
         */
        next : function() {
            this._draw(this._data.next.raw);

            return this;
        },
        /**
         * Go to needed date
         *
         * @this    {Cal}
         * @param   {String|Date}
         * @returns {Cal}
         */
        jump : function(to) {
            to = to || false;

            var
                val   = this._nodes.field[this._way],
                type  = typeof to,
                min   = this._min,
                max   = this._max,
                raw   = null,
                node  = null;

            if (type == 'object') {
                raw = to;
            } else {
                raw = Cal.parse(to ? to : val);
            }

            if (raw < min) {
                raw = min;
            }

            if (raw > max) {
                raw = max;
            }

            this._draw(raw, true);

            return this;
        },
        /**
         * Get or set the maximal calendar limit
         *
         * @this    {Cal}
         * @param   {Date}
         * @returns {Cal|Date}
         */
        max : function(to) {
            if (typeof to == 'string') {
                to = Cal.parse(to);
            }

            if (to) {
                this._max = to;

                return this;
            }

            return this._max;
        },
        /**
         * Get or set the current calendar date
         *
         * @this    {Cal}
         * @param   {Date}
         * @returns {Cal|Date}
         */
        now : function(to) {
            if (typeof to == 'string') {
                to = Cal.parse(to);
            }

            if (to) {
                this._now = to;

                return this;
            }

            return this._now;
        },
        /**
         * Get or set the minimal calendar limit
         *
         * @this    {Cal}
         * @param   {Date}
         * @returns {Cal|Date}
         */
        min : function(to) {
            if (typeof to == 'string') {
                to = Cal.parse(to);
            }

            if (to) {
                this._min = to;

                return this;
            }

            return this._min;
        },
        /**
         * Restore chosen params
         *
         * @this    {Cal}
         * @returns {Cal}
         */
         reset : function() {
            var
                nodes = this._nodes;

             this._min = this._params.min_date;
             this._now = this._params.now_date;
             this._max = this._params.max_date;

             Cal.count(this._now);

             if (nodes.items.chosen) {
                 this.deselect();
             }

             return this;
         },
        /**
         * Select chosen element
         *
         * @this    {Cal}
         * @returns {Cal}
         */
        select : function() {
            var
                stay     = false,
                day      = 0,
                year     = 0,
                month    = 0,
                relation = '',
                min      = null,
                max      = null,
                tmp      = null,
                field    = null,
                check    = null,
                human    = null,
                items    = this._nodes.items,
                alias    = items.alias,
                chosen   = items.chosen,
                clicked  = items.clicked,
                instance = null;

            // Remove selection from previous selected item
            if (chosen) {
                chosen.className = chosen.className.replace(' b-cal__day_is_chosen', '');

                if (chosen.getAttribute('data-stay')) {
                    stay = true;

                    chosen.removeAttribute('data-stay');
                }
            }

            // Select new item
            chosen = items.chosen = clicked;
            day    = chosen.getAttribute('data-day') - 0;
            year   = chosen.getAttribute('data-year') - 0;
            month  = chosen.getAttribute('data-month') - 0;
            tmp    = new Date(year, month, day);
            alias  = items.alias = year + '-' +
                                   month + '-' +
                                   day;

            chosen.className += ' b-cal__day_is_chosen';

            human  = Cal.human(tmp);
            field  = this._nodes.field;
            mirror = this._params.mirror;

            // Set date to a main fields
            if (field) {
                field[this._way] = this._tmpl(
                    this._params.tmpl.stdout,
                    human
                );

                if (mirror) {
                    mirror[this._way] = this._tmpl(
                        this._params.tmpl.mirror,
                        human
                    );
                }
            }

            // Move range in tied calendar instance
            if (this._tangled) {
                instance = this._tangled.instance;
                relation = this._tangled.relation;
                field    = instance._nodes.field;
                mirror   = instance._params.mirror;
                check    = field[this._way] != '' ? Cal.parse(field[this._way]) : null;

                //
                if (self._hold) {
                    self._hold = false;
                }

                if (relation == '>') {
                    max = this._max;

                    if (tmp >= max) {
                        check = max;
                        tmp   = new Date(
                            check.getFullYear(),
                            check.getMonth(),
                            check.getDate() - 1
                        );
                    } else if (tmp >= check) {
                        check = new Date(
                            tmp.getFullYear(),
                            tmp.getMonth(),
                            tmp.getDate() + 1
                        );
                    }

                    instance.min(tmp);
                    instance.show();
                    instance.jump(tmp);
                } else if (relation == '<') {
                    min = this._min;

                    if (tmp <= min) {
                        check = min;
                        tmp = new Date(
                            check.getFullYear(),
                            check.getMonth(),
                            check.getDate() + 1
                        );
                    } else if (tmp <= check) {
                        check = new Date(
                            tmp.getFullYear(),
                            tmp.getMonth(),
                            tmp.getDate() - 1
                        );
                    }

                    instance.max(tmp);
                }
                // Save date to a tangled fields
                if (field && check) {
                    human = Cal.human(check);

                    field[this._way] = this._tmpl(
                        instance._params.tmpl.stdout,
                        human
                    );

                    if (mirror) {
                        mirror[this._way] = this._tmpl(
                            instance._params.tmpl.mirror,
                            human
                        );
                    }
                }

                this.hide();
            }

            return this;
        },
        /**
         * Deselect chosen elements
         *
         * @this    {Cal}
         * @returns {Cal}
         */
        deselect : function() {
            var
                items   = this._nodes.items,
                chosen  = items.chosen,
                alias   = items.alias,
                clicked = items.clicked;

            // Deselect selected item
            chosen.className = chosen.className.replace(' b-cal__day_is_chosen', '');

            alias   = items.alias = '';
            chosen  = items.chosen = null;
            clicked = null;

            // Reset both calendar instances
            if (this._tangled) {
                this.reset();
                this._tangled.instance.reset();
            }

            return this;
        },
        /**
         * Get the minimal or the maximal date from the given list,
         * or the sorted dates list
         *
         * @static
         *
         * @this    {Cal}
         * @param   {Array}
         * @param   {String}
         * @returns {Date}
         */
        order : function(dates, which) {
            which = which || false;
            dates = dates.sort(function(a, b) {
                if (a > b) {
                    return 1;
                } else {
                    return - 1;
                }
            });

            if (which == 'min') {
                return dates.shift()
            } else if (which == 'max') {
                return dates.pop();
            }

            return dates;
        },
        /**
         * Custom parsing of the date string
         *
         * @static
         *
         * @this    {Cal}
         * @param   {String}
         * @returns {Date}
         */
        parse : function(dstr) {
            dstr = dstr || '';

            //
            if (typeof dstr != 'string' && typeof dstr != 'number') {
                dstr = '';
            }

            var
                day       = 0,
                year      = 0,
                month     = 0,
                alias     = '',
                sep       = '[\\s\\.,\\/]',
                tmp       = [],
                pttp      = Cal.prototype,
                lang      = pttp._monthes2replaces(),
                origin    = new Date(),
                monthes   = pttp._default.lang.monthes.part;

            // Simple replacements
            switch (dstr) {

                case 'now':
                case 'today':
                    return origin;
                break;

                case 'yesterday':
                    return new Date(
                        origin.getFullYear(),
                        origin.getMonth(),
                        origin.getDate() - 1
                    );
                break;

                case 'tomorrow':
                    return new Date(
                        origin.getFullYear(),
                        origin.getMonth(),
                        origin.getDate() + 1
                    );
                break;

                case 'next month':
                    return new Date(
                        origin.getFullYear(),
                        origin.getMonth() + 1
                    );
                break;

                case 'previous month':
                case 'month ago':
                    return new Date(
                        origin.getFullYear(),
                        origin.getMonth() - 1
                    );
                break;

                case 'previous year':
                case 'year ago':
                    return new Date(
                        origin.getFullYear() - 1,
                        origin.getMonth()
                    );
                break;

                case 'next year':
                    return new Date(
                        origin.getFullYear() + 1,
                        origin.getMonth()
                    );
                break;

            }

            // Make replacements from the given vocabulary
            for (alias in lang) {
                dstr = dstr.replace(
                    new RegExp('(^|\\s)' + alias + '($|\\s)'),
                    '$1' + monthes[lang[alias]] + '$2'
                );
            }

            // Year should be current by default
            if (!dstr.match(/\d{4}/)) {
                dstr += ' ' + origin.getFullYear();
            }

            // Try to cheat
            dirt = new Date(dstr);

            // Check if the cheated date is correct
            if (dirt.getDate()) {
                return dirt;
            }

            if (dstr.match(new RegExp('\\d{1,2}' + sep + '\\d{1,2}(' + sep + '\\d{2,4})?'))) {
                // 00 00 00[00]
                tmp = dstr.split(new RegExp(sep));

                day   = tmp[0];
                month = tmp[1];

                if (tmp[2]) {
                    year = tmp[2];
                }
            } else if (dstr.match(new RegExp('\\d{2,4}' + sep + '\\d{1,2}' + sep + '\\d{1,2}'))) {
                // 00[00] 00 00
                tmp = dstr.split(new RegExp(sep));

                day   = tmp[2];
                year  = tmp[0];
                month = tmp[1];
            } else if (
                tmp = dstr.match(new RegExp(
                    '(\\d{1,2})' +
                    sep +
                    '(' +
                    monthes.join('|') +
                    ')(' +
                    sep +
                    '\\d{4})?.*',
                    'i'
                ))
            ) {
                // Day of month
                day   = tmp[1];
                year  = tmp[3];
                month = pttp._indexof(tmp[2], monthes);
            } else if (
                tmp = dstr.match(new RegExp(
                    '(' +
                    monthes.join('|') +
                    ')' +
                    sep +
                    '(\\d{4})?.*',
                    'i'
                ))
            ) {
                year  = tmp[2];
                month = pttp._indexof(tmp[1], monthes);
            } else if (
                tmp = dstr.match(new RegExp(
                    '.*(' +
                    monthes.join('|') +
                    ')' +
                    '.*' +
                    '(\\d{4})?.*',
                    'i'
                ))
            ) {
                year  = tmp[2];
                month = pttp._indexof(tmp[1], monthes);
            }

            // Check the day
            if (!day || day < 1) {
                day = 1;
            } else if (day.length < 2) {
                day = '0' + day;
            }

            // Check the month
            if (!month) {
                month = 0;
            }

            // Check the year
            if (!year) {
                year = origin.getFullYear();
            }

            return new Date(year, month, day);
        },
        /**
         * A kind of calendar math
         *
         * @static
         *
         * @this    {Cal}
         * @param   {Date}
         * @returns {Object}
         */
        count : function(now) {
            now = now || new Date();

            var
                all  = 42,
                tmp  = 0,
                curr = null,
                prev = null,
                next = null,
                data = {};

            // Set current date for a chosen month
            curr = data.curr = {};
            curr.raw   = new Date(now);
            curr.day   = curr.raw.getDate();
            curr.month = curr.raw.getMonth();
            curr.year  = curr.raw.getFullYear();
            curr.till  = new Date(curr.year, curr.month + 1, 0).getDate();
            curr.from  = 1;
            curr.beg   = new Date(curr.year, curr.month, 1).getDay();
            curr.end   = new Date(curr.year, curr.month, curr.till).getDate();

            if (curr.beg == 0) {
                curr.beg = 7;
            }

            all -= curr.till;

            // Set previous date for a chosen month
            prev = data.prev = {};
            prev.raw   = new Date(curr.year, curr.month - 1);
            prev.month = prev.raw.getMonth();
            prev.year  = prev.raw.getFullYear();
            prev.till  = new Date(prev.year, curr.month, 0).getDate();
            prev.from  = prev.till - (curr.beg - 2);
            prev.total = prev.till - prev.from;

            all -= curr.beg;

            // Set next date for a chosen month
            next = data.next = {};
            next.raw   = new Date(curr.year, curr.month + 1);
            next.month = next.raw.getMonth();
            next.year  = next.raw.getFullYear();
            next.till  = all + 1;
            next.from  = 1;
            next.total = next.till - next.from;

            return data;
        },
        /**
         * Check if the given date is between the minimal and maximal
         *
         * @static
         *
         * @this    {Cal}
         * @param   {Date}
         * @param   {Date}
         * @param   {Date}
         * @returns {Boolean}
         */
        inside : function(now, min, max, t) {
            if (now > min && now < max) {
                return true;
            }

            return false;
        },
        /**
         * Check if the day is weekend
         *
         * @static
         *
         * @this    {Cal}
         * @param   {Number}
         * @param   {Number}
         * @param   {Number}
         * @returns {Boolean}
         */
        weekend : function(year, month, day) {
            day   -= 0;
            year  -= 0;
            month -= 0;

            var
                check = new Date(year, month, day).getDay();

            if (check == 0 || check == 6) {
                return true;
            }

            return false;
        },
        /**
         * Check if the day is holiday
         *
         * @static
         *
         * @this    {Cal}
         * @param   {Number}
         * @param   {Number}
         * @param   {Number}
         * @returns {Boolean}
         */
        holiday : function(year, month, day) {
            day   += '';
            year  += '';

            var
                tmp      = (month + 1) + '',
                alias    = year + '',
                holidays = Cal.prototype._holidays;

            if (tmp.length == 1) {
                tmp = '0' + tmp;
            }

            alias += '-' + tmp;

            if (day.length == 1) {
                day = '0' + day;
            }

            alias += '-' + day;

            if (holidays) {
                if (holidays.length && Cal.prototype._indexof(alias, holidays) != -1) {
                    return true;
                } else {
                    return false;
                }
            }

            return Cal.weekend(year, month, day);
        },
        /**
         * Load holidays or get loaded holidays list
         *
         * @static
         *
         * @this    {Cal}
         * @param   {Array}
         * @returns {Array}
         */
        holidays : function(data) {
            var
                pos      = 0,
                end      = 0,
                item     = '',
                holidays = Cal.prototype._holidays = [];

            if (data && data.length) {
                end = data.length;

                for (pos = 0; pos < end; pos++) {
                    item = data[pos];

                    if (typeof item == 'object') {
                        item =  item.year + '-' +
                                item.month + '-' +
                                item.day;
                    }

                    holidays.push(item);
                }
            }

            return holidays;
        },
        /**
         * Load language settings
         *
         * @static
         *
         * @this    {Cal}
         * @param   {Object}
         * @returns {Cal|Object}
         */
        lang : function(given) {
            given = given || {};

            var
                alias = '',
                pttp  = Cal.prototype,
                lang  = pttp._default.lang;

            if (!pttp._lang) {
                pttp._lang = {};
            }

            for (alias in lang) {
                if (given[alias]) {
                    pttp._lang[alias] = given[alias];
                } else {
                    pttp._lang[alias] = lang[alias];
                }
            }

            return this._lang;
        },
        /**
         * Turn a date object into object with locale settings
         *
         * @static
         *
         * @this    {Cal}
         * @param   {Date}
         * @returns {Object}
         */
        human : function(raw) {
            if (typeof raw == 'string') {
                raw = Cal.parse(raw);
            }

            var
                tmp     = 0,
                day     = raw.getDate(),
                year    = raw.getFullYear(),
                month   = raw.getMonth() + 1,
                weekday = raw.getDay(),
                lang    = Cal.prototype._lang ?
                          Cal.prototype._lang :
                          Cal.prototype._default.lang,
                human   = {
                    days : new Date(year, (month + 1), -1),
                    day : {
                        num  : day - 0,
                        nums : (day + '').length < 2 ? '0' + day : day,
                        week : weekday < 1 ? 7 : weekday,
                        full : '',
                        part : ''
                    },
                    year : {
                        full : year,
                        part : (year + '').substring(2),
                        leap : new Date(year, 1, 29) == 1 ? true : false
                    },
                    month : {
                        num  : month,
                        nums : (month + '').length < 2 ? '0' + month : month,
                        full : '',
                        decl : '',
                        part : ''
                    }
                };

            // Days of week names
            tmp = human.day.week - 1;
            human.day.full = lang.weekdays.full[tmp];
            human.day.part = lang.weekdays.part[tmp];

            // Month names
            tmp = human.month.num - 1;
            human.month.full = lang.monthes.full[tmp];
            human.month.decl = lang.monthes.decl[tmp];
            human.month.part = lang.monthes.part[tmp];

            return human;
        },
        /**
         * Create an instance variables and DOM tree
         *
         * @private
         *
         * @this    {Cal}
         * @returns {Cal}
         */
        _install : function() {
            var
                pos   = 0,
                alias = '',
                cal   = null,
                tin   = null,
                self  = this,
                tout  = null,
                hide  = null,
                node  = null;

            if (!this._params.no_tail) {
                // Background of calendar`s tail
                tin = document.createElement('div');
                tin.className = 'b-cal__tail-in';

                // Border of calendar`s tail
                tout = document.createElement('div');
                tout.className = 'b-cal__tail-out';
            }

            // «Hide» link
            hide = document.createElement('div');
            hide.className = 'b-cal__hide';
            hide.innerHTML = this._lang.hide;

            // Parent calendar`s node
            cal = this._nodes.block = document.createElement('div');
            cal.className = 'b-cal';

            // Turn on quirks styles detector
            if (document.documentElement.clientHeight == 0) {
                cal.className += ' b-cal_mode_quirks';
            }

            // Append user defined id
            if (this._params.id) {
                cal.className += ' b-cal_id_' + this._params.id;
            }

            // «Previous» arrow
            this._nodes.prev = document.createElement('div');
            this._nodes.prev.className = 'b-cal__prev';

            // «Next» arrow
            this._nodes.next = document.createElement('div');
            this._nodes.next.className =  'b-cal__next';

            // Month`s name holder
            this._nodes.month = document.createElement('div');
            this._nodes.month.className = 'b-cal__hat';

            // Month days holder
            this._nodes.days = document.createElement('div');
            this._nodes.days.className = 'b-cal__days';

            // Weekdays holder
            this._nodes.week = document.createElement('div');
            this._nodes.week.className = 'b-cal__week';

            // Weekdays
            for (pos = 0; pos < 7; pos++) {
                node = document.createElement('div');
                node.className = 'b-cal__weekday';
                node.innerHTML = this._lang.weekdays.part[pos];

                this._nodes.week.appendChild(node);
            }

            // Append all created stuff
            if (this._params.no_tail) {
                cal.className += ' b-cal_no_tail';
            } else {
                cal.appendChild(tout);
                cal.appendChild(tin);
            }

            cal.appendChild(this._nodes.month);
            cal.appendChild(this._nodes.prev);
            cal.appendChild(this._nodes.next);
            cal.appendChild(this._nodes.week);
            cal.appendChild(this._nodes.days);
            cal.appendChild(hide);
            this._nodes.target.appendChild(cal);

            this._alive();

            return this;
        },
        /**
         * Create a DOM for chosen month
         *
         * @private
         *
         * @this    {Cal}
         * @param   {Date}
         * @param   {Boolean}
         * @returns {Cal}
         */
        _draw : function(now, pre) {
            pre = pre || false;

            var
                check     = false,
                choose    = false,
                select    = false,
                holiday   = false,
                day       = 0,
                year      = 0,
                month     = 0,
                alias     = '',
                origin    = this._now.getFullYear() + '-' +
                            this._now.getMonth() + '-' +
                            this._now.getDate(),
                preorigin = now.getFullYear() + '-' +
                            now.getMonth() + '-' +
                            now.getDate(),
                tangled   = '',
                min       = this._min,
                max       = this._max,
                tmp       = null,
                node      = null,
                nodes     = this._nodes,
                data      = this._data = Cal.count(now),
                hat       = Cal.human(data.curr.raw),
                list      = nodes.items.list = [],
                tmpl      = this._params.tmpl,
                selected  = this._nodes.items.alias,
                holidays  = this._holidays;

            // Select tangled selection
            if (this._tangled && this._tangled.instance._nodes.items.alias) {
                tangled = this._tangled.instance._nodes.items.alias;
                tmp     = tangled.split('-');

                // Switch to the next or previous month if tangled selection is the first
                // or the last day of month
                if (tmp[0] == data.curr.year && tmp[1] == data.curr.month) {
                    if (this._tangled.relation == '<' && tmp[2] == data.curr.end) {
                        return this.next();
                    } else if (this._tangled.relation == '>' && tmp[2] == 1) {
                        return this.prev();
                    }
                }
            }

            // Clean previous calendar days
            nodes.days.innerHTML = '';

            // Set calendar`s hat value
            nodes.month.innerHTML = this._tmpl(tmpl.hat, hat);

            // Days in past
            year  = data.prev.year;
            month = data.prev.month;
            alias = year + '-' + month + '-';
            check = Cal.inside(
                new Date(
                    year,
                    month,
                    data.prev.till
                ),
                min,
                max
            );

            nodes.prev.title     = (check ? this._tmpl(tmpl.prev, this.human(data.prev.raw, this._lang)) : '');
            nodes.prev.className = 'b-cal__prev' + (check ? '' : ' b-cal__prev_is_disabled');

            for (day = data.prev.from; day <= data.prev.till; day++) {
                holiday = Cal.holiday(year, month, day);

                node = this._day2node(day, month, year, 'past', check, false, holiday, tangled);

                nodes.days.appendChild(node);

                nodes.items.list.push(node);
            }

            // Days in presence
            year  = data.curr.year;
            month = data.curr.month;
            alias = year + '-' + month + '-';

            for (day = data.curr.from; day <= data.curr.till; day++) {
                choose  = false;
                select  = false;
                check   = this.inside(
                    new Date(
                        year,
                        month,
                        day
                    ),
                    min,
                    max
                );

                holiday = Cal.holiday(year, month, day);

                //
                if (check && alias + day == origin) {
                    choose = true;
                }

                //
                if (alias + day == selected || pre && alias + day == preorigin) {
                    select = true;
                }

                node = this._day2node(day, month, year, 'presence', check, choose, holiday, tangled);

                nodes.days.appendChild(node);

                if (select) {
                    node.setAttribute('data-stay', 'on');
                    node.click();
                }

                list.push(node);
            }

            // Days in future
            year  = data.next.year;
            month = data.next.month;
            check = this.inside(
                new Date(
                    data.next.year,
                    data.next.month,
                    data.next.from
                ),
                min,
                max,
                true
            );

            nodes.next.title     = (check ? this._tmpl(tmpl.next, this.human(data.next.raw, this._lang)) : '');
            nodes.next.className = 'b-cal__next' + (!check ? ' b-cal__next_is_disabled' : '');

            for (day = data.next.from; day <= data.next.till; day++) {
                holiday = Cal.holiday(year, month, day);

                node = this._day2node(day, month, year, 'future', check, false, holiday, tangled);

                nodes.days.appendChild(node);

                list.push(node);
            }

            return true;
        },
        /**
         * Create a node for day in calendar
         *
         * @private
         *
         * @this    {Cal}
         * @param   {Number}
         * @param   {Number}
         * @param   {Number}
         * @param   {String}
         * @param   {Boolean}
         * @param   {Boolean}
         * @param   {String}
         * @returns {DOMNode}
         */
        _day2node : function(day, month, year, when, check, choose, holiday, tangled) {
            var
                node  = document.createElement('div'),
                items = this._nodes.items;

            node.className = 'b-cal__day';
            node.innerHTML = day;

            //
            if (when != 'presence' || choose) {
                node.className += ' b-cal__day_in_' + when;
            }

            //
            if (!check && !choose) {
                node.className += ' b-cal__day_is_disabled';
            } else {
                node.className += ' b-cal__day_is_enabled';
            }

            //
            if (holiday) {
                node.className += ' b-cal__day_is_holiday';
            }

            if (year + '-' + month + '-' + day == tangled) {
                node.className += ' b-cal__day_is_tangled';
            }

            //
            node.setAttribute('data-month', month);
            node.setAttribute('data-year',  year);
            node.setAttribute('data-day',   day);

            return node;
        },
        /**
         * Create a vocabulary for .parse() method
         *
         * @private
         *
         * @this    {Cal}
         * @returns {Object}
         */
        _monthes2replaces : function() {
            var
                pos     = 0,
                end     = 0,
                alias   = '',
                out     = {},
                pttp    = Cal.prototype,
                piece   = null,
                monthes = pttp._lang && pttp._lang.monthes ?
                          pttp._lang.monthes :
                          pttp._default.lang.monthes;

            for (alias in monthes) {
                piece = monthes[alias];
                end   = piece.length;

                for (pos = 0; pos < end; pos++) {
                    out[piece[pos]] = pos;
                    out[piece[pos].toLowerCase()] = pos;
                }
            }

            return out;
        },
        /**
         * Bind events to the important nodes
         *
         * @private
         *
         * @this    {Cal}
         * @returns {Cal}
         */
        _alive : function() {
            var
                self  = this,
                block = this._nodes.block,
                field = this._nodes.field;

            // These handlers should be binded only if the field is given
            if (field) {
                // Turn off autocomplete
                field.setAttribute('autocomplete', 'off');

                // Close calendar on click ewerywhere
                this._events.push(
                    this._bind(document, 'click', function(event) {
                        var
                            node = event.target;
    
                        if (!node.className.match('b-cal') && node != field) {
                            self.hide();
                        }
                    })
                );

                // Close calendar on ESC
                this._events.push(
                    this._bind(document, 'keydown', function(event) {
                        if (event.keyCode == 27 && self.shown) {
                            self.hide();
                        }
                    })
                );

                // Catch keys in field
                this._events.push(
                    this._bind(field, 'keydown', function(event) {
                        var
                            code = event.keyCode;

                        if (!event.ctrlKey && !event.metaKey && !self.shown) {
                            self.show();
                        }

                        switch (code) {

                            // Filter keys
                            case 9:
                            case 16:
                            case 17:
                            case 18:
                            case 20:
                            case 27:
                            case 37:
                            case 38:
                            case 39:
                            case 224:
                                return true;
                            break;

                            // Show on down arrow
                            case 40:
                                if (!self.shown) {
                                    self.show();
                                }
                            break;

                            // Close on Enter
                            case 13:
                                if (self.shown) {
                                    event.preventDefault();
                                    self.hide();
                                }
                            break;

                            //
                            default:
                                if (self._timer) {
                                    clearTimeout(self._timer);
                                }

                                self._timer = setTimeout(self._proxy(self.jump, self), 500);
                            break;

                        }
                    })
                );

                // Catch mousedown on field
                this._events.push(
                    this._bind(field, 'mousedown', function(event) {
                        if (!self.shown) {
                            if (self._handlers.show) {
                                self._handlers.show.call(
                                    field,
                                    event,
                                    {
                                        done : self._proxy(self.show, self),
                                        hide : self._proxy(self.hide, self)
                                    }
                                );
                            } else {
                                self.show();
                            }
                        }
                    })
                );

                // Catch blur on field
                this._events.push(
                    this._bind(field, 'blur', function(event) {
                        if (self.shown && !self._hold) {
                            self.hide();
                        }

                        if (self._hold) {
                            self._hold = false;
                        }
                    })
                );

                // Catch focus on field
                this._events.push(
                    this._bind(field, 'focus', function(event) {
                        if (!self.shown) {
                            if (self._handlers.show) {
                                self._handlers.show.call(
                                    field,
                                    event,
                                    {
                                        done : self._proxy(self.show, self),
                                        hide : self._proxy(self.hide, self)
                                    }
                                );
                            } else {
                                self.show();
                            }
                        }
                    })
                );

                // Catch click on field
                this._events.push(
                    this._bind(field, 'click', function(event) {
                        if (!self.shown && self.hiddenable) {
                            if (self._handlers.show) {
                                self._handlers.show.call(
                                    block,
                                    event,
                                    {
                                        done  : self._proxy(self.show,  self),
                                        hide  : self._proxy(self.hide,  self),
                                        reset : self._proxy(self.reset, self)
                                    }
                                );
                            } else {
                                self.show();
                            }
                        }
                    })
                );
            }

            // 
            this._events.push(
                this._bind(block, 'mousemove', function(event) {
                    if (self._timer) {
                        clearTimeout(self._timer);
                    }

                    self._hold = true;
                })
            );

            // 
            this._events.push(
                this._bind(block, 'mouseout', function(event) {
                    self._timer = setTimeout(function() {
                        self._hold = false;
                    }, 150);
                })
            );

            // 
            this._events.push(
                this._bind(block, 'click', function(event) {
                    var
                        beg      = 0,
                        day      = 0,
                        year     = 0,
                        month    = 0,
                        node     = event.target,
                        switcher = node.className,
                        data     = [],
                        item     = null;

                    switch (switcher) {

                        //
                        case 'b-cal__prev':
                            self.prev();
                        break;

                        //
                        case 'b-cal__next':
                            self.next();
                        break;

                        //
                        case 'b-cal__hide':
                            self.hide();
                        break;

                        //
                        case 'b-cal__day b-cal__day_is_enabled':
                        case 'b-cal__day b-cal__day_is_enabled b-cal__day_is_holiday':
                        case 'b-cal__day b-cal__day_in_past b-cal__day_is_enabled':
                        case 'b-cal__day b-cal__day_in_presence b-cal__day_is_enabled':
                        case 'b-cal__day b-cal__day_in_future b-cal__day_is_enabled':
                        case 'b-cal__day b-cal__day_in_past b-cal__day_is_enabled b-cal__day_is_holiday':
                        case 'b-cal__day b-cal__day_in_presence b-cal__day_is_enabled b-cal__day_is_holiday':
                        case 'b-cal__day b-cal__day_in_future b-cal__day_is_enabled b-cal__day_is_holiday':
                            day   = node.getAttribute('data-day');
                            year  = node.getAttribute('data-year');
                            month = node.getAttribute('data-month');
                            data  = {
                                raw   : new Date(year, month, day),
                                field : self._nodes.field
                            };

                            data.human = self.human(data.raw, self._lang);

                            self._nodes.items.clicked = node;

                            if (self._handlers.select) {
                                self._handlers.select.call(
                                    node,
                                    event,
                                    {
                                        hide   : self._proxy(self._hide,    self),
                                        done   : self._proxy(self.select,   self),
                                        reset  : self._proxy(self.reset,    self),
                                        undone : self._proxy(self.deselect, self)
                                    },
                                    data
                                );
                            } else {
                                self.select();
                            }
                        break;

                        //
                        case 'b-cal__day b-cal__day_is_enabled b-cal__day_is_chosen':
                        case 'b-cal__day b-cal__day_is_enabled b-cal__day_is_holiday b-cal__day_is_chosen':
                        case 'b-cal__day b-cal__day_in_presence b-cal__day_is_enabled b-cal__day_is_chosen':
                        case 'b-cal__day b-cal__day_in_presence b-cal__day_is_enabled b-cal__day_is_holiday b-cal__day_is_chosen':
                            self._nodes.items.clicked = node;

                            if (self._handlers.deselect) {
                                self._handlers.deselect.call(
                                    node,
                                    event,
                                    {
                                        done  : self._proxy(self.deselect, self),
                                        hide  : self._proxy(self._hide,    self),
                                        reset : self._proxy(self.reset,    self)
                                    }
                                );
                            } else {
                                self.deselect();
                            }
                        break;

                    }
                })
            );

            return this;
        },
        /**
         * Templates engine
         *
         * @private
         *
         * @this    {Cal}
         * @param   {String}
         * @param   {Object}
         * @returns {String}
         */
        _tmpl : function(tmpl, data) {
            data = data || {};

            tmpl = tmpl
                   .replace(/\{\{ ?/g, "';out+=data.")
                   .replace(/ ?\}\}/g, ";out+='");
/*
                    TODO:

                   .replace(/\{% if ?([^ %]*) ?%\}/ig,      "';if(data.$1){out+='")
                   .replace(/\{% else if ?([^ %]*) ?%\}/ig, "';}else if(data.$1){out+='")
                   .replace(/\{% else ?%\}/ig,              "';}else{out+='")
                   .replace(/\{% ?endif ?%\}/ig,            "';}out+='")
*/
            tmpl = "(function(){var out = '" + tmpl + "';return out;})();";

            return eval(tmpl);
        },
        /**
         * Fix for IE8 .indexOf
         *
         * @private
         *
         * @this    {Cal}
         * @param   {String}
         * @param   {Array}
         * @returns {Number|String}
         */
        _indexof : function(pin, hay) {
            // Arrays and Objects allowed only
            if (!hay || typeof hay != 'object') {
                return -1;
            }

            var
                stalk = 0;

            // Try to use a normal indexOf if it`s possible
            if (hay.indexOf) {
                return hay.indexOf(pin);
            }

            // Hack for an array in IE8 or for an object
            for (stalk in hay) {
                if (hay[stalk] == pin) {
                    return stalk;
                }
            }

            return -1;
        },
        /**
         * Bind an event
         *
         * @private
         *
         * @this    {Cal}
         * @param   {DOMNode}
         * @param   {String}
         * @param   {Function}
         * @returns {Object}
         */
        _bind : function(target, alias, handler) {
            var
                prefix  = '',
                wrapper = '',
                self    = this,
                event   = null,
                out     = {
                    alias   : alias,
                    target  : target,
                    handler : function(event) {
                        event = self._eventize(event);

                        handler(event);
                    }
                };

            if (target.addEventListener) {
                wrapper = 'addEventListener';
            } else if (target.attachEvent) {
                prefix  = 'on';
                wrapper = 'attachEvent';
            }

            //
            target[wrapper](
                prefix + alias,
                out.handler
            );

            return out;
        },
        /**
         * Unbind an event
         *
         * @private
         *
         * @this    {Suggest}
         * @param   {DOMNode}
         * @param   {String}
         * @param   {Function}
         * @returns {Object}
         */
        _unbind : function(target, alias, handler) {
            var
                prefix  = '',
                wrapper = '';

            if (target.removeEventListener) {
                wrapper = 'removeEventListener';
            } else if (target.detachEvent) {
                prefix  = 'on';
                wrapper = 'detachEvent';
            }

            target[wrapper](
                prefix + alias,
                handler
            );
        },
        /**
         * Get an offset for chosen elements
         *
         * @private
         *
         * @this    {Suggest}
         * @param   {DOMNode}
         * @param   {DOMNode}
         * @returns {Object}
         */
        _offsetize : function(from, till) {
            till = till || document.body;

            var
                node     = from,
                view     = document.defaultView,
                computed = null,
                offset   = {
                    top    : node.offsetTop,
                    left   : node.offsetLeft,
                    width  : node.offsetWidth,
                    height : node.offsetHeight
                };

            while (node.offsetParent && node != till) {

                node     = node.offsetParent;
                computed = (view && view.getComputedStyle != 'undefined') ?
                           view.getComputedStyle(node, null) :
                           node.currentStyle;

                if (computed.paddingTop) {
                    offset.top -= (computed.paddingTop.replace('px', '') - 0);
                }

                offset.top  += node.offsetTop;
                offset.left += node.offsetLeft;
            }

            if (node.offsetParent) {
                computed = (view && view.getComputedStyle != 'undefined') ?
                           view.getComputedStyle(node.offsetParent, null) :
                           node.offsetParent.currentStyle;

                if (computed.paddingTop) {
                    offset.top -= (computed.paddingTop.replace('px', '') - 0);
                }
            }

            return offset;
        },
        /**
         * Normalize an event object
         *
         * @this    {Suggest}
         * @param   {Event}
         * @returns {Event}
         */
        _eventize : function(event) {
            event = event || window.event;

            var
                // I do really hate this browser
                opera = navigator.userAgent.match(/opera/ig) ?
                        true :
                        false,
                type  = event.type;

            // Events hacks for older browsers
            if (!opera && event.srcElement) {
                event.target = event.srcElement;
            }

            if (!opera && event.target.nodeType == 3) {
                event.target = event.target.parentNode;
            }

            // Keycode
            if (
                type == 'keypress' ||
                type == 'keydown' ||
                type == 'keyup'
            ) {
                if (!event.keyCode && event.which) {
                    event.keyCode = event.which;
                }
            }

            // Stop bubbling
            if (!opera && !event.stopPropagation) {
                event.stopPropagation = function() {
                    this.cancelBubble = true;
                };
            }

            // Prevent default action
            if (!opera && !event.preventDefault) {
                event.preventDefault = function() {
                    this.returnValue = false;
                };
            }

            return event;
        },
        /**
         * Save a needed context for further function execution
         *
         * @this    {Suggest}
         * @param   {Function}
         * @param   {Object}
         * @param   {Array}
         * @returns {Function}
         */
        _proxy : function(fn, ctx) {
            return function() {
                var
                    args = arguments;

                return fn.apply(ctx, args);
            }
        }
    };


    // Aliases for «static» functions
    Cal.lang     = Cal.prototype.lang;
    Cal.human    = Cal.prototype.human;
    Cal.order    = Cal.prototype.order;
    Cal.count    = Cal.prototype.count;
    Cal.parse    = Cal.prototype.parse;
    Cal.inside   = Cal.prototype.inside;
    Cal.weekend  = Cal.prototype.weekend;
    Cal.holiday  = Cal.prototype.holiday;
    Cal.holidays = Cal.prototype.holidays;


    //
    return Cal;


}