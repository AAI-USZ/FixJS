function (item) {
			if (item.typeCode == 'error') {
				errors.push(item);
			} else {
				warnings.push(item);
			}
		}