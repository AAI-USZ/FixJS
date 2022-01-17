function (index) {
				var elem = this;
				var halfHeight = ($(elem).outerHeight() / 2) + 'px';
				var upBtn = document.createElement('div');
				$(upBtn)
					.addClass('number-spin-btn number-spin-btn-up')
					.css('height', halfHeight);
				var downBtn = document.createElement('div');
				$(downBtn)
					.addClass('number-spin-btn number-spin-btn-down')
					.css('height', halfHeight);
				var btnContainer = document.createElement('div');
				btnContainer.appendChild(upBtn);
				btnContainer.appendChild(downBtn);
				$(btnContainer).addClass('number-spin-btn-container').insertAfter(elem);

				$(elem).bind({
					DOMMouseScroll: function (e) {
						e.preventDefault();
						if (e.originalEvent.detail < 0) increment(this);
						else decrement(this);
					},
					mousewheel: function (e) {
						e.preventDefault();
						if (e.wheelDelta > 0) increment(this);
						else decrement(this);
					},
					keypress: function (e) {
						if (e.keyCode == 38) // up arrow
							increment(this);
						else if (e.keyCode == 40) // down arrow
							decrement(this);
						else if (([8, 9, 35, 36, 37, 39].indexOf(e.keyCode) == -1) && ([45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57].indexOf(e.which) == -1))
							e.preventDefault();
					},
					change: function (e) {
						if (e.originalEvent !== undefined) {
							var params = getParams(this);

							newVal = clipValues(params['val'], params['min'], params['max']);
							newVal = matchStep(newVal, params['min'], params['max'], params['step'], params['stepDecimal']);

							$(this).val(newVal);
						}
					}
				});
				$(upBtn).bind({
					mousedown: function (e) {
						increment(elem);

						var timeoutFunc = function (elem, incFunc) {
								incFunc(elem);

								elem.timeoutID = window.setTimeout(timeoutFunc, 10, elem, incFunc);
							};

						var releaseFunc = function (e) {
								window.clearTimeout(elem.timeoutID);
								$(document).unbind('mouseup', releaseFunc);
								$(upBtn).unbind('mouseleave', releaseFunc);
							};

						$(document).bind('mouseup', releaseFunc);
						$(upBtn).bind('mouseleave', releaseFunc);

						elem.timeoutID = window.setTimeout(timeoutFunc, 700, elem, increment);
					}
				});
				$(downBtn).bind({
					mousedown: function (e) {
						decrement(elem);

						var timeoutFunc = function (elem, decFunc) {
								decFunc(elem);
								elem.timeoutID = window.setTimeout(timeoutFunc, 10, elem, decFunc);
							};

						var releaseFunc = function (e) {
								window.clearTimeout(elem.timeoutID);
								$(document).unbind('mouseup', releaseFunc);
								$(downBtn).unbind('mouseleave', releaseFunc);
							};

						$(document).bind('mouseup', releaseFunc);
						$(downBtn).bind('mouseleave', releaseFunc);

						elem.timeoutID = window.setTimeout(timeoutFunc, 700, elem, decrement);
					}
				});
				$(this).css({ textAlign: 'right' });
			}