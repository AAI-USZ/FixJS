function toArray(obj) {
		var undef, out, i;

		if (obj && !obj.splice) {
			out = [];

			for (i = 0; true; i++) {
				if (obj[i])
					out[i] = obj[i];
				else
					break;
			}

			return out;
		}

		return obj;
	}