function () {
	
	var _timer, _nextDate, _callback;
	
	function setDate(date, callback) {
		var next_timestamp = date.getTime();
		_nextDate = new Date(date.getTime());
		
		//console.log(date.format());
		clearTimeout(_timer);
		_timer = setTimeout(function(){
			_timer = null;
			trigger(callback);
		}, next_timestamp - (new Date()).getTime());
	}
	
	function _getNextOccurrence(h, m){
		var d = new Date();
		
		d.setHours(h);
		d.setMinutes(m);
		d.setSeconds(0);
		
		if (d <= new Date()) {
			d.setDate(d.getDate() + 1);
		}
		
		return d;
	}
	
	function setTime(h, m, callback) {
		setDate(_getNextOccurrence(h, m), callback);
	}
	
	function getNext() {
		return _nextDate;
	}
	
	function setCallback(callback) {
		_callback = callback;
	}
	
	function trigger(callback) {
		if (callback) {
			callback();
		} else if (_callback) {
			_callback();
		}
	}
	
	return {
		setTime: setTime,
		setDate: setDate,
		getNext: getNext,
		setCallback: setCallback,
		trigger: trigger
	}
}