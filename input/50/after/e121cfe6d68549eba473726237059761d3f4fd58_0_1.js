function(value,

								element, param) {

							return !$.isArray(param) || param.length <= 0

									|| this.optional(element)

									|| param.contains(value);

						}