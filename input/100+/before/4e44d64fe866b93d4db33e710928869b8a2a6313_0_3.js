function (options, extendedFn) {
		_.templateSettings = {
			interpolate: /\{\{(.+?)\}\}/g,
			evaluate: /\[\[(.+?)\]\]/g
		};
		var fn, defaults = {
			slidesBox: '[data-slice-slide-box]',
			slidesBoxSlide: '[data-slice-slide]',
			slidesBoxSlideActive: '.slice-slide-active',
			slidesBoxControls: '[data-slice-slide-controls]',
			slidesBoxControlsFixed: '[data-slice-slide-controls-fixed]',
			slidesBoxControlsNext: '[data-slice-slide-controls-next]',
			slidesBoxControlsPrev: '[data-slice-slide-controls-prev]',
			slidesBoxControlsPauseResume: '[data-slice-slide-controls-pause-resume]',

			templatesTranslucent: '#slice-slide-translucent',
			templatesControls: '#slice-slide-controls',
			templateControlsPlaying: '#slice-slide-controls-playing',
			templateControlsPaused: '#slice-slide-controls-paused',

			classesActive: 'slice-slide-active',
			attrDestination: 'data-slice-slide-destination',
			translucentElement: true,

			prefixId: 'jquery-slice-slide-',
			numberSimultaneousSlides: 1,
			effectTime: 150,
			templatesUrl: 'assets/templates.html',
			templatesCultureUrl: 'assets/templates_cultures_##CULTURE##.json',
			idSliceSlideTemplates: 'jquery-slice-slide-templates',
			slideTime: 3
		},
		op = $.extend(true, {}, defaults, options),

		defaultFn = {
			culture: {},
			init: function () {
				$(op.slidesBox).each(function (index) {
					var slidesBox = $(this),
						slides = slidesBox.find(op.slidesBoxSlide),
						slidesCount = slides.length,
						numberId = index,
						idSlideBox = op.prefixId + (index+1);
					while ($('#' + idSlideBox).length) {
						index += 1;
						idSlideBox = op.prefixId + (index + 1);
					}

					slidesBox.attr('id',idSlideBox);
					fn.setSlides(slidesBox,slides,idSlideBox); // Activate initial slides, and hide all other
					
					fn.controls(slidesBox,slides,idSlideBox); // Play-Pause and slide number controls
					
				});
			},

			tmpl: function (id, context) {
				var html = $(id).html();
				return _.template(html, context);
			},

			setSlides: function (slidesBox,slides,idSlideBox) {
				slides.each(function (index, slide) {
					$(slide).attr('id',idSlideBox+'-'+(index+1));
					if (op.translucentElement) {
						$(slide).append(fn.tmpl(op.templatesTranslucent), {text: fn.culture});
					}
				});
				fn.initialSlides(slidesBox);
			},

			initialSlides: function (slidesBox) {
				var allSlides = slidesBox.find(op.slidesBoxSlide),
					initialSlides = allSlides.filter(':lt(' + op.numberSimultaneousSlides + ')'),
					notInitialSlides = allSlides.filter(':gt(' + (op.numberSimultaneousSlides - 1) + ')');
				initialSlides.addClass(op.classesActive);
				notInitialSlides.hide();
			},

			controls: function (slidesBox, slides, idSlideBox) {
				var pagesNumber = Math.ceil(slides.length / op.numberSimultaneousSlides);
				slidesBox.append(fn.tmpl(op.templatesControls, {id: idSlideBox, slides: slides, pagesNumber: pagesNumber, numberSimultaneousSlides: op.numberSimultaneousSlides, text: fn.culture}));
				fn.startSlide(slidesBox);
			},

			getControls: function (slideControlsBox, controls) {
				return slideControlsBox.find(controls);
			},
			
			startSlide: function (slidesBox) {
				var interval,
					slideControlsBox = slidesBox.find(op.slidesBoxControls).first(),
					slideControls = {
						fixed: fn.getControls(slideControlsBox, op.slidesBoxControlsFixed),
						previous: fn.getControls(slideControlsBox, op.slidesBoxControlsPrev),
						next: fn.getControls(slideControlsBox, op.slidesBoxControlsNext),
						pauseResume: fn.getControls(slideControlsBox, op.slidesBoxControlsPauseResume)
					},
					intervalTime = op.slideTime * 1000;
				
				interval = setInterval(function () {
					fn.changeSlide(slideControlsBox, 1);
				}, intervalTime);
				
				fn.goToNextAndPrevious (slideControlsBox, interval, slideControls);
				
				slideControls.fixed.find('a, [role="link"]').on('click',function (event) {
					event.preventDefault();
					var newSelectedInFixed = $(this).closest(op.slidesBoxControlsFixed),
						selectedInFixed = newSelectedInFixed.siblings(op.slidesBoxSlideActive);
					fn.pauseSlide(interval, slideControls);
					fn.goToSlide($(this), $(this).attr('data-slice-slide-destination'), slideControlsBox, newSelectedInFixed, selectedInFixed);
				});
				
				slideControls.pauseResume.bind('click',function (event) {
					event.preventDefault();
					if (slideControls.pauseResume.find('[data-slice-slide-playing]').length > 0) {
						fn.pauseSlide(interval, slideControls);
					} else {
						slideControls.pauseResume.html(fn.tmpl(op.templateControlsPlaying, {text: fn.culture}));
						fn.resumeSlide(slidesBox, slideControls);
					}
				});
			},

			resumeSlide: function (slidesBox, slideControls) {
				slideControls.fixed.add(slideControls.pauseResume).add(slideControls.previous).add(slideControls.next).unbind('click');
				fn.startSlide(slidesBox);
			},
			
			pauseSlide: function (interval, slideControls) {
				clearInterval(interval);
				slideControls.pauseResume.html(fn.tmpl(op.templateControlsPaused, {text: fn.culture}));
			},

			goToNextAndPrevious: function (slideControlsBox, interval, slideControls) {
				slideControls.previous.bind('click',function (event) {
					event.preventDefault();
					fn.pauseSlide(interval, slideControls);
					fn.changeSlide(slideControlsBox, -1);
				});
				slideControls.next.bind('click',function (event) {
					event.preventDefault();
					fn.pauseSlide(interval, slideControls);
					fn.changeSlide(slideControlsBox, 1);
				});
			},

			changeSlide: function (slideControlsBox, direction) {
				var newSelectedInFixed,
					link,
					destination,
					selectedInFixed = slideControlsBox.find(op.slidesBoxSlideActive).first();
			
				if (direction > 0) {
					if (selectedInFixed.is(':last-child')) {
						newSelectedInFixed = selectedInFixed.siblings().first();
					} else {
						newSelectedInFixed = selectedInFixed.next();
					}
				} else {
					if (selectedInFixed.is(':first-child')) {
						newSelectedInFixed = selectedInFixed.siblings().last();
					} else {
						newSelectedInFixed = selectedInFixed.prev();
					}
				}
			
				link = newSelectedInFixed.find('a, [role="link"]').first();
				destination = link.attr(op.attrDestination);
				fn.goToSlide(link, destination, slideControlsBox, newSelectedInFixed, selectedInFixed);
			},

			goToSlide: function (link, destination, slideControlsBox, newSelectedInFixed, selectedInFixed) {
				selectedInFixed.removeClass(op.classesActive);
				newSelectedInFixed.addClass(op.classesActive);
				
				var activeSlides = $(destination).siblings(op.slidesBoxSlideActive);
				
				if ($(destination).is(':hidden')) {
					activeSlides.removeClass(op.classesActive).fadeOut(op.effectTime, function() {
						if (op.numberSimultaneousSlides > 1) {
							var nextDestination = $(destination).next(),
								i=1;
							while (i<op.numberSimultaneousSlides) {
								nextDestination.addClass(op.classesActive);
								nextDestination = nextDestination.next();
								i += 1;
							}
						}

						$(destination).addClass(op.classesActive).add($(destination).siblings(op.slidesBoxSlideActive)).fadeIn(op.effectTime);
					});
				}
				
			}
		},
		culture = $('html').attr('lang') || 'en';

		fn = $.extend(true, {}, defaultFn, extendedFn);

		if ($('#' + op.idSliceSlideTemplates).length === 0) {
			$.get(op.templatesUrl, function (data) {
				$('body').append('<div id="' + op.idSliceSlideTemplates + '">' + data + '</div>');
				$.getJSON(op.templatesCultureUrl.replace('##CULTURE##', culture), function (json) {
					fn.culture = json;
					fn.init();
				});
			});
		} else {
			fn.init();
		}
	}