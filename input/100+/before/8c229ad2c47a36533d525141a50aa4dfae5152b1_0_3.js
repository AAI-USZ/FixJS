function(match) {
		switch (match.toLowerCase()) {
			case 'hh': return ('0' + hour).slice(-2);
			case 'h':  return hour;
			case 'mm': return ('0' + time.minute).slice(-2);
			case 'm':  return time.minute;
			case 'ss': return ('0' + time.second).slice(-2);
			case 's':  return time.second;
			case 'l':  return ('00' + time.millisec).slice(-3);
			case 'z':  return time.timezone;
			case 't': case 'tt':
				if (options.ampm) {
					if (match.length == 1) {
						ampmName = ampmName.charAt(0);
                    }
					return match.charAt(0) === 'T' ? ampmName.toUpperCase() : ampmName.toLowerCase();
				}
				return '';
		}
	}