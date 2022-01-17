function ($this, value, validator) {
					return (value == false && ! validator.negative)
						|| (value == true && validator.negative);
				}