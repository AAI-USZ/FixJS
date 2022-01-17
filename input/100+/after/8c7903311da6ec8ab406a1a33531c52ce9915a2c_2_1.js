function() {
            if (typeof _dates !== 'undefined') {
                var _selected = _dates[slider.getCurrentNumber()];
            }
			_dates = [];
			VMM.fireEvent(global, config.events.messege, "Building Dates");
			updateSize();
			
			for(var i = 0; i < data.date.length; i++) {
				
				if (data.date[i].startDate != null && data.date[i].startDate != "") {
					
					var _date = {};
					
					// START DATE
					if (data.date[i].type == "tweets") {
						_date.startdate = VMM.ExternalAPI.twitter.parseTwitterDate(data.date[i].startDate);
					} else {
						_date.startdate = VMM.Date.parse(data.date[i].startDate);
					}
					
					if (!isNaN(_date.startdate)) {
						
					
						// END DATE
						if (data.date[i].endDate != null && data.date[i].endDate != "") {
							if (data.date[i].type == "tweets") {
								_date.enddate = VMM.ExternalAPI.twitter.parseTwitterDate(data.date[i].endDate);
							} else {
								_date.enddate = VMM.Date.parse(data.date[i].endDate);
							}
						} else {
							_date.enddate = _date.startdate;
						}
						
						_date.needs_slug = false;
						
						if (data.date[i].headline == "") {
							if (data.date[i].slug != null && data.date[i].slug != "") {
								_date.needs_slug = true;
							}
						}
					
						_date.title				= data.date[i].headline;
						_date.headline			= data.date[i].headline;
						_date.type				= data.date[i].type;
						_date.date				= VMM.Date.prettyDate(_date.startdate);
						_date.asset				= data.date[i].asset;
						_date.fulldate			= _date.startdate.getTime();
						_date.text				= data.date[i].text;
						_date.content			= "";
						_date.tag				= data.date[i].tag;
						_date.slug				= data.date[i].slug;
						_date.uniqueid			= VMM.Util.unique_ID(7);
                        _date.stream            = data.date[i].stream;
                        _date.provider          = data.date[i].provider;
                        _date.colorIndexId      = data.date[i].colorIndexId;

                        if (filterMatch(filter, _date)) {
						    _dates.push(_date);
					    } 
                    }
					
				}
				
			};
			
			/* CUSTOM SORT
			================================================== */
			if (data.type != "storify") {
				_dates.sort(function(a, b){
					return a.fulldate - b.fulldate
				});
			}
			
			/* CREATE START PAGE IF AVAILABLE
			================================================== */
			if (data.headline != null && data.headline != "" && data.text != null && data.text != "") {
				trace("HAS STARTPAGE");
				var _date = {}, td_num = 0, td;
				
				td = _dates.length > 0 ? _dates[0].startdate : VMM.Date.parse(data.startDate);
				_date.startdate = new Date(td);
				
				if (td.getMonth() === 0 && td.getDate() == 1 && td.getHours() === 0 && td.getMinutes() === 0 ) {
					// trace("YEAR ONLY");
					_date.startdate.setFullYear(td.getFullYear() - 1);
				} else if (td.getDate() <= 1 && td.getHours() === 0 && td.getMinutes() === 0) {
					// trace("YEAR MONTH");
					_date.startdate.setMonth(td.getMonth() - 1);
				} else if (td.getHours() === 0 && td.getMinutes() === 0) {
					// trace("YEAR MONTH DAY");
					_date.startdate.setDate(td.getDate() - 1);
				} else  if (td.getMinutes() === 0) {
					// trace("YEAR MONTH DAY HOUR");
					_date.startdate.setHours(td.getHours() - 1);
				} else {
					// trace("YEAR MONTH DAY HOUR MINUTE");
					_date.startdate.setMinutes(td.getMinutes() - 1);
				}
				
				_date.uniqueid		= VMM.Util.unique_ID(7);
				_date.enddate		= _date.startdate;
				_date.title			= data.headline;
				_date.headline		= data.headline;
				_date.text			= data.text;
				_date.type			= "start";
				_date.date			= VMM.Date.prettyDate(data.startDate);
				_date.asset			= data.asset;
				_date.slug			= false;
				_date.needs_slug	= false;
				_date.fulldate		= _date.startdate.getTime();
				
				if (config.embed) {
					VMM.fireEvent(global, config.events.headline, _date.headline);
				}
				
				_dates.unshift(_date);
			}
			
			/* CUSTOM SORT
			================================================== */
			if (data.type != "storify") {
				_dates.sort(function(a, b){
					return a.fulldate - b.fulldate
				});
            }

            // preserve selection made before filtering, if any
            if (typeof _selected != 'undefined') {
                var found = 0;
                for (var i = 0; i < _dates.length; i++) {
                    if (_dates[i].headline == _selected.headline
                        && _dates[i].provider == _selected.provider
                        && _dates[i].fulldate == _selected.fulldate) {
                        found = i;
                        break;
                    }
                }
				if (found > 0) {
					config.start_at_current_date = false;
					config.current_slide = found;
				} else {
					config.start_at_current_date = true;
				}
			}

			onDatesProcessed();
			if (found > 0) {
				goToEvent(found, true);
			}
			if (typeof config.onDataLoad == 'function') {
				config.onDataLoad();
			}
		}