function (sequence) {

			if (sequence.length > 1 && reEndsWithSlash.test(sequence)) {
				sequence = sequence.slice(0, -1);
			}
			try {
				sequence = decodeURI(sequence);
			} catch (err) {}
			return sequence;
		}