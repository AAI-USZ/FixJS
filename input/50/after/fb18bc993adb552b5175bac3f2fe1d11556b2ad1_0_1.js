function ($this, value, validator) {
					return (value.length == 0  && ! validator.negative)
						|| (value.length > 0 && validator.negative);
				}