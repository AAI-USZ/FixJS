function() {
	if (!this.timestamp) return;
	var self = this;
	var d = new Date(this.timestamp * 1000);
	var now = (new Date()).getTime();
	var when;
	var diff = Math.floor((now - d.getTime()) / 1000);
	var dayDiff = Math.floor(diff / 86400);
	var getAgo = function(ago, period) {
		return ago + " " + self.labels.get(period + (ago == 1 ? "" : "s") + "Ago");
	};

	if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 365) {
		when = d.toLocaleDateString() + ', ' + d.toLocaleTimeString();
	} else if (diff < 60) {
		when = getAgo(diff, 'second');
	} else if (diff < 60 * 60) {
		diff = Math.floor(diff / 60);
		when = getAgo(diff, 'minute');
	} else if (diff < 60 * 60 * 24) {
		diff = Math.floor(diff / (60 * 60));
		when = getAgo(diff, 'hour');
	} else if (diff < 60 * 60 * 48) {
		when = this.labels.get("yesterday");
	} else if (dayDiff < 7) {
		when = getAgo(dayDiff, 'day');
	} else if (dayDiff < 14) {
		when = this.labels.get("lastWeek");
	} else if (dayDiff < 30) {
		diff =  Math.floor(dayDiff / 7);
		when = getAgo(diff, 'week');
	} else if (dayDiff < 60) {
		when = this.labels.get("lastMonth");
	} else if (dayDiff < 365) {
		diff =  Math.floor(dayDiff / 31);
		when = getAgo(diff, 'month');
	}
	if (this.age !== when) {
		this.age = when;
	}
}