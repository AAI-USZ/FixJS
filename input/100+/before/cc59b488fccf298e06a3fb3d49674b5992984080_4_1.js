function(isoFormatDateString) {
		if ((isoFormatDateString !== undefined) && (isoFormatDateString !== null)) {
			var dateParts = isoFormatDateString.split("-");
			this.setFullYear(dateParts[0]);
			this.setMonth(dateParts[1] - 1);
			this.setDate(dateParts[2]);
		}
    }