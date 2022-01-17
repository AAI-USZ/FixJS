function () {
				//Increasing the distance between the hours part for include the spinner.
				spinnerSeparator = options.separator + options.separator + options.separator + options.separator;
				
				//Duplicating the input and hide the original.
				$spinnerElement = $element.clone().attr('name', 'spinnerElement'); 
				
				//Current input position and size.
				var position		= $element.position(),
					height			= $element.height(),
					width			= $element.width();
				
				//Obtaining the text width to positioning the spinners.
				var valueToPrint	= methods.showValue(true, true),
					partsValue	 	= valueToPrint.split(spinnerSeparator),
					hoursPos		= methods.getTextWidth(partsValue[0]),
					minutesPos		= hoursPos + methods.getTextWidth(spinnerSeparator + partsValue[1]),
					secondsPos		= minutesPos + methods.getTextWidth(spinnerSeparator + partsValue[2]),
					separatorSize	= methods.getTextWidth(spinnerSeparator),
					borderTop		= parseInt($element.css('border-top-width').replace('px', ''), 10),
					borderLeft		= parseInt($element.css('border-left-width').replace('px', ''), 10);

				//Arrow positions and size.
				var	topUp			= (2 * height) / 21,
					topDown			= (12 * height) / 21,
					arrowSize		= (6 * height) / 21,
					arrowLeft		= (2 * height) / 21;
				
				//Templates to append with the options specified.
				var spinners		= '<div class="TimepickerInputMask.spinners" style="position: absolute; background: transparent;"></div>',
					spinnersContent = '<div class="spinners.container" style="position: absolute; background: transparent;"></div>',
					arrowsContainer	= '<div style="position: absolute;background: ' + options.bgcolor + ';height: 100%;width: ' +
						separatorSize + 'px;top: 0;"></span>',
					upSpinner		= '<a href="javascript:;" class="up" style="position: absolute;width: 0;height: 0;border-left: ' + 
						arrowSize + 'px solid transparent;border-right: ' + arrowSize + 'px solid transparent;border-bottom: ' + 
						arrowSize + 'px solid ' + options.arrowColor + ';" tabindex="9999"></a>',
					downSpinner 	= '<a href="javascript:;" class="down" style="position: absolute;width: 0;height: 0;border-left: ' +
						arrowSize + 'px solid transparent;border-right: ' + arrowSize + 'px solid transparent;border-top: ' + 
						arrowSize + 'px solid ' + options.arrowColor + ';" tabindex="9999"></a>';
				
				//Main container of the spinner layer.
				var $spinners = $(spinners).insertAfter($element).css({
					top:	position.top,
					left:	position.left,
					height:	height
				});
				
				//Change the index tab for the original input to prevent the access. 
				$element.attr('tabindex', '9999');
				$spinners.append($spinnerElement);
				
				//Container for the spinners blocks. We put at the beginning for the behaviour of the tab key.
				var $spinnersContent = $(spinnersContent).appendTo($spinners).css({
					top:	borderTop,
					left:	borderLeft,
					height:	height + 2,
				});
				
				//Hours spinner container.
				var $hoursContainer = $(arrowsContainer).appendTo($spinnersContent).css({
					left:	hoursPos
				}).addClass('hours');					

				$(upSpinner).appendTo($hoursContainer).css({
					top:	topUp,
					left:	arrowLeft
				}).bind('click', methods.events.clickSpinner);
				
				$(downSpinner).appendTo($hoursContainer).css({
					top: 	topDown,
					left:	arrowLeft
				}).bind('click', methods.events.clickSpinner);

				//Minutes spinner container.
				var $minutesContainer = $(arrowsContainer).appendTo($spinnersContent).css({
					left:	minutesPos
				}).addClass('minutes');						

				$(upSpinner).appendTo($minutesContainer).css({
					top:	topUp,
					left:	arrowLeft
				}).bind('click', methods.events.clickSpinner);
				
				$(downSpinner).appendTo($minutesContainer).css({
					top: 	topDown,
					left:	arrowLeft
				}).bind('click', methods.events.clickSpinner);

				//Seconds spinner container if options.seconds is true.	
				if (options.seconds) {
					var $secondsContainer = $(arrowsContainer).appendTo($spinnersContent).css({
						left:	secondsPos
					}).addClass('seconds');

					$(upSpinner).appendTo($secondsContainer).css({
						top:	topUp,
						left:	arrowLeft
					}).bind('click', methods.events.clickSpinner);
					
					$(downSpinner).appendTo($secondsContainer).css({
						top: 	topDown,
						left:	arrowLeft
					}).bind('click', methods.events.clickSpinner);
				}
			}