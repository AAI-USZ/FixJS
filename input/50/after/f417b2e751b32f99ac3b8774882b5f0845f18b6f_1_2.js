function findUnit(v) {
					return toString(v).replace(/^([+-]=)?-?[0-9. ]+\s*/, ' ').replace(/^ $/, '');
				}