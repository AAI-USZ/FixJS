function(isoFormatDateString) {
		if ((isoFormatDateString !== undefined) && (isoFormatDateString !== null)) {
			var dateTimeParts = isoFormatDateString.split('T');
			var dateParts = dateTimeParts[0].split("-");
			this.setFullYear(dateParts[0]);
			this.setMonth(dateParts[1] - 1);
			this.setDate(dateParts[2]);
			if (dateTimeParts.length == 2) {
				var timeParts = dateTimeParts[1].split(":");
				this.setHours(timeParts[0]);
				if (timeParts[1] !== undefined)
					this.setMinutes(timeParts[1]);
				if (timeParts[2] !== undefined)
					this.setSeconds(timeParts[2].replace('Z',''));
			}
		}
    }