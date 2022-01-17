function(_interval, _array, _element_parent) {

            // OCN-107: limit the max number of markers to MAX_INTERVALS_COUNT
            var timeIncrement = 1;
            var MAX_INTERVALS_COUNT = 100;
            var intervalsCount = Math.ceil(_interval.number) + 1;
            if (intervalsCount > MAX_INTERVALS_COUNT)
            {
                timeIncrement = Math.ceil(intervalsCount / MAX_INTERVALS_COUNT);
                intervalsCount = Math.ceil(intervalsCount / timeIncrement);
            }

            var inc_time = 0,
                _first_run = true,
                _last_pos = 0,
                _largest_pos = 0;

            VMM.attachElement(_element_parent, "");

            _interval.date = new Date(data[0].startdate.getFullYear(), 0, 1, 0,0,0);

            // OCN-107: the markers count is capped: no more than MAX_INTERVALS_COUNT can be displayed
            for (var i = 0; i < intervalsCount; i++) {
                var _idd,
                    _pos,
                    pos,
                    _date,
                    _visible = false,
                    _relative_pos,
                    _element = VMM.appendAndGetElement(_element_parent, "<div>", _interval.classname);

                if (_interval.type == "eon") {
                    if (_first_run) {
                        _interval.date.setFullYear(		Math.floor(data[0].startdate.getFullYear() / 500000000) * 500000000	);
                    }
                    _interval.date.setFullYear(_interval.date.getFullYear() + (inc_time * 500000000));
                } else if (_interval.type == "era") {
                    if (_first_run) {
                        _interval.date.setFullYear(		Math.floor(data[0].startdate.getFullYear() / 100000000) * 100000000	);
                    }
                    _interval.date.setFullYear(_interval.date.getFullYear() + (inc_time * 100000000));
                } else if (_interval.type == "epoch") {
                    if (_first_run) {
                        _interval.date.setFullYear(		Math.floor(data[0].startdate.getFullYear() / 10000000) * 10000000	);
                    }
                    _interval.date.setFullYear(_interval.date.getFullYear() + (inc_time * 10000000));
                } else if (_interval.type == "age") {
                    if (_first_run) {
                        _interval.date.setFullYear(		Math.floor(data[0].startdate.getFullYear() / 1000000) * 1000000	);
                    }
                    _interval.date.setFullYear(_interval.date.getFullYear() + (inc_time * 1000000));
                } else if (_interval.type == "millenium") {
                    if (_first_run) {
                        _interval.date.setFullYear(		Math.floor(data[0].startdate.getFullYear() / 1000) * 1000	);
                    }
                    _interval.date.setFullYear(_interval.date.getFullYear() + (inc_time * 1000));
                } else if (_interval.type == "century") {
                    if (_first_run) {
                        _interval.date.setFullYear(		Math.floor(data[0].startdate.getFullYear() / 100) * 100		);
                    }
                    _interval.date.setFullYear(_interval.date.getFullYear() + (inc_time * 100));
                } else if (_interval.type == "decade") {
                    if (_first_run) {
                        _interval.date.setFullYear(		Math.floor(data[0].startdate.getFullYear() / 10) * 10		);
                    }
                    _interval.date.setFullYear(_interval.date.getFullYear() + (inc_time * 10));
                } else if (interval.type == "year") {
                    if (_first_run) {

                    }
                    _interval.date.setFullYear(_interval.date.getFullYear() + inc_time);
                } else if (_interval.type == "month") {
                    if (_first_run) {
                        _interval.date.setMonth(data[0].startdate.getMonth());
                    }
                    _interval.date.setMonth(_interval.date.getMonth() + inc_time);
                } else if (_interval.type == "week") {
                    if (_first_run) {
                        _interval.date.setMonth(		data[0].startdate.getMonth()		);
                        _interval.date.setDate(		Math.floor(data[0].startdate.getDate() *7)			);
                    }
                    _interval.date.setDate(_interval.date.getDate() + (inc_time * 7) );
                } else if (_interval.type == "day") {
                    if (_first_run) {
                        _interval.date.setMonth(		data[0].startdate.getMonth()			);
                        _interval.date.setDate(		data[0].startdate.getDate()				);
                    }
                    _interval.date.setDate(_interval.date.getDate() + inc_time);
                } else if (_interval.type == "hour") {
                    if (_first_run) {
                        _interval.date.setMonth(		data[0].startdate.getMonth()			);
                        _interval.date.setDate(		data[0].startdate.getDate()				);
                        _interval.date.setHours(		data[0].startdate.getHours()			);
                    }
                    _interval.date.setHours(_interval.date.getHours() + inc_time);
                } else if (_interval.type == "minute") {
                    if (_first_run) {
                        _interval.date.setMonth(		data[0].startdate.getMonth()			);
                        _interval.date.setDate(		data[0].startdate.getDate()				);
                        _interval.date.setHours(		data[0].startdate.getHours()			);
                        _interval.date.setMinutes(	data[0].startdate.getMinutes()			);
                    }
                    _interval.date.setMinutes(_interval.date.getMinutes() + inc_time);
                } else if (_interval.type == "second") {
                    if (_first_run) {
                        _interval.date.setMonth(		data[0].startdate.getMonth()			);
                        _interval.date.setDate(		data[0].startdate.getDate()				);
                        _interval.date.setHours(		data[0].startdate.getHours()			);
                        _interval.date.setMinutes(	data[0].startdate.getMinutes()			);
                        _interval.date.setSeconds(	data[0].startdate.getSeconds()			);
                    }
                    _interval.date.setSeconds(_interval.date.getSeconds() + inc_time);
                }

                _idd = VMM.Date.prettyDate(_interval.date, true);

                // OCN-107: increment by this amount (in case there is a lot of markers), instead of by 1
                inc_time = timeIncrement;

                _first_run = false;

                _relative_pos = positionRelative(interval, _interval.date);

                //_pos = positionOnTimeline(_interval, _interval.date);
                //pos = _pos.begin;
                pos = _relative_pos.begin;

                VMM.appendElement(_element, _idd);

                // OCN-107: the following line has been commented out. it is very CPU consuming
                // OCN-107: the effect is that the marker text (e.g. JULY 4) is not centered around its marker
                //VMM.Lib.css(_element, "text-indent", -(VMM.Lib.width(_element)/2));
                //VMM.Lib.css(_element, "opacity", "0");

                _last_pos = pos;

                if (pos > _largest_pos) {
                    _largest_pos = pos;
                }

                _date = new Date(_interval.date);

                var _obj = {
                    pretty_date:        _idd,
                    interval_element: 	_element,
                    interval_date: 		_date,
                    interval_visible: 	_visible,
                    type: 				_interval.interval_type,
                    relative_pos:		_relative_pos,
                    is_detached:		false,
                    animation: {
                        animate: false,
                        pos: "",
                        opacity: "100"
                    }
                };

                _array.push(_obj);
            }

            VMM.Lib.width($timeintervalminor_minor, _largest_pos);

            positionInterval(_element_parent, _array);



        }