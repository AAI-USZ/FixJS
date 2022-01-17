function(ha_level) {
		var date	= new Date();
		var year	= 1900 + (date.getYear());
		var month	= 1 + date.getMonth();
		var i,m;

		if (month < 3) {
			m = 1;
		} else {
			m = month - 2;
		}

		this.store.load({
			scope		: this
		,	params			: {
				year		: year
			,	month_start	: m
			,	month_end	: month
			}
		});
	}