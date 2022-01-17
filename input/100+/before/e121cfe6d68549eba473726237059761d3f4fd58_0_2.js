function() {

			if ($.validator) {

				$.validator.setDefaults({

							onkeyup : false,

							errorClass : 'error',

							validClass : 'valid',

							errorPlacement : function(error, element) {

								var $el = $(element);

								var $parent = $el.parent();

								var $error = $(error).addClass($el

										.attr("error-placement") == "inline"

										? "help-inline"

										: "help-block");



								var fn = $el.data("zybFnErrorPlacement");

								if ($.isFunction(fn)) {

									fn.apply(this, arguments);

								} else if ($el.hasClass("cb-value")

										&& $parent.hasClass("zyb-combo")) {

									$error.insertAfter($parent);

								} else {

									$error.insertAfter($el);

								}

							},

							highlight : function(element, errorClass,

									validClass) {

								var ctrlGroup = $(element)

										.parents(".control-group");

								if (!ctrlGroup.hasClass(errorClass)) {

									ctrlGroup.addClass(errorClass)

											.removeClass(validClass);

								}

							},

							unhighlight : function(element, errorClass,

									validClass) {

								$(element).parents(".control-group")

										.removeClass(errorClass)

										.addClass(validClass);



							}



						});

			}

		}