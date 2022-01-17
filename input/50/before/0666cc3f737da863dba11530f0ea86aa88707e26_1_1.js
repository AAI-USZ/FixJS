function(time) {
		// console.log("Updating cursor from " + moment.unix(this.cursor).format('HH:mm:ss.SSS') + ' to ' + moment.unix(time).format('HH:mm:ss.SSS'));
		// console.log("Updating cursor from " + this.cursor + ' to ' + time);
		this.cursor = time;
	}