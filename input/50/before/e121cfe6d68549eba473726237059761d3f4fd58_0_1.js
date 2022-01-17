function(element, errorClass,

									validClass) {

								$(element).parents(".control-group")

										.removeClass(errorClass)

										.addClass(validClass);



							}