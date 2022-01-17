function _setLocate(){

		var options = this.options(), box = this.box();

		options.center ? 

		_moveToCenter.call(this) : 

		_moveTo.call(

			this,

			$.isNumeric(options.x) ? options.x : ($.isFunction(options.x) ? options.x.call(box) : 0), 

			$.isNumeric(options.y) ? options.y : ($.isFunction(options.y) ? options.y.call(box) : 0)

		);

	}