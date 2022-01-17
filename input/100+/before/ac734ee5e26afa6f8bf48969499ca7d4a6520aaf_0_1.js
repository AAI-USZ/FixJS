function dateYMD() {
		var now = new Date(),
			year = now.getUTCFullYear(),
			month = now.getUTCMonth() + 1, // 0-based
			day = now.getUTCDate(),
			out = '';

		out += year;

		out += '-';

		if (month < 10) {
			out += '0';
		}
		out += month;

		out += '-';

		if (day < 10) {
			out += '0';
		}
		out += day;

		return out;
	}