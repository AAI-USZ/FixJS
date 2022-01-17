function(form, skipAjaxValidation) {

			var options = form.data('jqv');



			// this variable is set to true if an error is found

			var errorFound = false;



			// Trigger hook, start validation

			form.trigger("jqv.form.validating");

			// first, evaluate status of non ajax fields

			var first_err=null;

			form.find('['+options.validateAttribute+'*=validate]').not(":disabled").each( function() {

				var field = $(this);

				var names = [];

				if ($.inArray(field.attr('name'), names) < 0) {

					errorFound |= methods._validateField(field, options, skipAjaxValidation);

					if (errorFound && first_err==null)

						if (field.is(":hidden") && options.prettySelect)

                first_err = field = form.find("#" + options.usePrefix + field.attr('id') + options.useSuffix);

            else

                first_err=field;

					if (options.doNotShowAllErrosOnSubmit)

						return false;

					names.push(field.attr('name'));

				}

			});



			// second, check to see if all ajax calls completed ok

			// errorFound |= !methods._checkAjaxStatus(options);



			// third, check status and scroll the container accordingly

			form.trigger("jqv.form.result", [errorFound]);



			if (errorFound) {

				if (options.scroll) {

					var destination=first_err.offset().top;

					var fixleft = first_err.offset().left;



					//prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)

					var positionType=options.promptPosition;

					if (typeof(positionType)=='string' && positionType.indexOf(":")!=-1)

						positionType=positionType.substring(0,positionType.indexOf(":"));



					if (positionType!="bottomRight" && positionType!="bottomLeft") {

						var prompt_err= methods._getPrompt(first_err);

						destination=prompt_err.offset().top;

					}



					// get the position of the first error, there should be at least one, no need to check this

					//var destination = form.find(".formError:not('.greenPopup'):first").offset().top;

					if (options.isOverflown) {

						var overflowDIV = $(options.overflownDIV);

						if(!overflowDIV.length) return false;

						var scrollContainerScroll = overflowDIV.scrollTop();

						var scrollContainerPos = -parseInt(overflowDIV.offset().top);



						destination += scrollContainerScroll + scrollContainerPos - 5;

						var scrollContainer = $(options.overflownDIV + ":not(:animated)");



						scrollContainer.animate({ scrollTop: destination }, 1100, function(){

							if(options.focusFirstField) first_err.focus();

						});

					} else {

						$("html:not(:animated),body:not(:animated)").animate({

							scrollTop: destination,

							scrollLeft: fixleft

						}, 1100, function(){

							if(options.focusFirstField) first_err.focus();

						});

					}



				} else if(options.focusFirstField)

					first_err.focus();

				return false;

			}

			return true;

		}