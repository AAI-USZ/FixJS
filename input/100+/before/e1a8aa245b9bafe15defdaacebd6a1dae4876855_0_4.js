function($){

	// If document is ready, load functions

	$(document).ready(function(){

		formBehavior();

		windowBehavior();

                loadWindowBehavior();

		asideBehavior();

		galleryBehavior();

	//	scrollBehavior();

	});

	

	// Window Behavior Function

	function windowBehavior(){

		var windowScroll = $('body, html');

		$('.navLink').click(function(e){

			e.preventDefault();

			var linkToGo = $(this).attr('href');

			var topPos = $(linkToGo).offset();

			$(windowScroll).stop().animate({

				scrollTop: topPos.top

			}, 2000, 'swing');

		});

	}



        // Load window behavior function

	function loadWindowBehavior(){

		function slideSwitch() {

			var active = $('#slideShow img.active');



			if ( active.length == 0 ) {

				active = $('#slideShow img:last');

			}



			// use this to pull the images in the order they appear in the markup

			var next =  active.next().length ? active.next() : $('#slideShow img:first');



			active.addClass('last-active');



			next.css({opacity: 0.0})

				.addClass('active')

				.animate({opacity: 1.0}, 1000, function() {

					active.removeClass('active last-active');

				});

		setTimeout(

		  function() {

		    slideSwitch();

		  }, 

		  active.next().hasClass('promo') ? 11000 : 6000);

		}

		setTimeout(function() {

			slideSwitch();

		}, 6000);

	}

	

	// Scroll Behavior Function

	function scrollBehavior(){

		var containerHeight = ($('#wrapper .container:first').height())-50;

		var containers = ['#aboutUs', '#products','#events','#corpGift'];

		var aboutUsPos = $(containers[0]).position().top + containerHeight;

		var productsPos = $(containers[1]).position().top + containerHeight;

		var eventsPos = $(containers[2]).position().top + containerHeight;

		var corpGiftPos = $(containers[3]).position().top + containerHeight;

		$(window).scroll(function(){

			var windowPos = $('#header').position();

			if (windowPos.top <= aboutUsPos && !($('.navLink[href='+containers[0]+']').hasClass('active'))){

				$('.navLink').removeClass("active");

				$('.navLink[href='+containers[0]+']').addClass("active");

			}

			if (windowPos.top > aboutUsPos && windowPos.top <= productsPos && !($(containers[1]).hasClass('active'))){

				$('.navLink').removeClass("active");

				$('.navLink[href='+containers[1]+']').addClass("active");

			}

			if (windowPos.top > productsPos && windowPos.top <= eventsPos && !($(containers[2]).hasClass('active'))){

				$('.navLink').removeClass("active");

				$('.navLink[href='+containers[2]+']').addClass("active");

			}

			if (windowPos.top > eventsPos && windowPos.top <= corpGiftPos && !($(containers[3]).hasClass('active'))){

				$('.navLink').removeClass("active");

				$('.navLink[href='+containers[3]+']').addClass("active");

			}

			

			function containerFade(element){

				$('.container').not(element).animate({

					'opacity':'0.25'

				});

				element.animate({

					'opacity':'1'

				});

			}

		});

		

		

	}

	

	// Aside Behavior Function

	function asideBehavior(){

		var disableAside = true;

		var displayToolTip = false;

		var aside = $('#asideWrapper');

		var asideSize = asideSizeValue();

		function asideSizeValue(){

			return asideSize = (aside.hasClass('active')) ? 1.5 : 15;

		}

		

		// Tooltip Function

		$('.icon').each(function(e){

			var currentCont = $(this);

			var toolTipOb = currentCont.find('.toolTip');

			currentCont.bind('mouseenter mouseleave', function(){

				if (!$('#asideWrapper').hasClass('active')){

					toolTipOb.toggle();

				}

			});

			

			// Forms Function

			currentCont.bind('click', function(){

				asideSizeValue();

				var icon = $(this);

				var iconLink = icon.find('a');

				var formId = iconLink.attr('href');

				var formContainer = $(formId);

				displayToolTip = true;

				$('.icon').find('.toolTip').hide();

				$(this).find('.toolTip').show();

				if (!aside.hasClass('active')){

					// If aside is inactive

					disableAside = false;

					$('body, html').stop();

					icon.addClass('active');

					formContainer.addClass('active');

					$('article, hgroup').animate({

						'opacity':'0.125'

					}, 100, 'swing');

					$('#mainContainer, #footer').animate({

						'margin-right': (asideSize - 1.5) + 'em'

					}, 750, 'swing');

					aside.addClass('active').animate({

						'width': asideSize + 'em'

					}, 750, 'swing', function(){

						$('.closeAside').slideDown(500);

						formContainer.slideDown(500);

					});

				} else {

					// else, if aside is active

					$('.icon').removeClass('active');

					icon.addClass('active');

					$('.asideObject').not(formId).removeClass('active').slideUp(500, function(){

						$(this).removeAttr('style');

					});

					formContainer.addClass('active').slideDown(500);

				}

			});

		});

		

		// Close Aside Function

		function closeAside(){

			if (!disableAside){

				disableAside = true;

				displayToolTip = false;

				asideSizeValue();

				// stop() stops the current function

				$('article, hgroup').clearQueue().animate({

					'opacity':'1'

				}, 100, 'swing', function(){

					$(this).removeAttr('style');

				});

				$('.asideObject').removeClass('active').clearQueue().slideUp(250, function(){

					$(this).removeAttr('style');

				});

				$('.icon').removeClass('active').find('.toolTip').clearQueue().hide(function(){

					$(this).removeAttr('style');

				});

				$('.closeAside').clearQueue().slideUp(250, function(){

					$(this).removeAttr('style');

				});

				$('#mainContainer, #footer').clearQueue().animate({

					'margin-right': (asideSize - 1.5) + 'em'

				}, 250, 'linear', function(){

					$(this).removeAttr('style');

				});

				aside.removeClass('active').clearQueue().animate({

					'width': asideSize + 'em'

				}, 250, 'linear', function(){

					$(this).removeAttr('style');

				});

			}

			return false;

		}

		

		// if window is on scroll or .closeAside, #mainContainer, header, footer is on click, run closeAside()

		$(window).delegate('.closeAside', 'click', closeAside);

	}



	function galleryBehavior(){

		$('.imgGallery').each(function(){

			var h5Title = $(this).find('.thumbTitle');

			var h5TitleText = $(this).find('.thumbTitle').text();

			h5Title.click(function(){

				$(this)

					.next('.gallery')

						.slideToggle('slow')

					.end()

					.toggleClass('active');

			});

		});

	}

	

	// This is a temporal behavior, please change to make validation

	function formBehavior(){

		$('form').each(function(){

			var thisForm = $(this);

			thisForm.submit(function(){

				var required = $(this).find('.required');

				required.each(function(){

					if ($(this).val() == ''){

						$(this).addClass('uncorrect');

						thisForm.find('.requiredMsg').slideDown();

					} else {

						$(this).removeClass('uncorrect');

						thisForm.find('.requiredMsg').slideUp();

					}

				});

			});

		});

	}

	

	// XML Load Content

	function loadContentXML(){

		$.ajax({

			type: 'GET',

			url: 'fdaContent.xml',

			dataType: 'xml',

			async: false,

			success: function(xml){

				$(xml).find('section').each(function(){

					var sectionId = $(this).attr('id');

					var mainTitle = $(this).find('mainTitle').text();

					var subTitle = $(this).find('subTitle').text();

					var description = $(this).find('description').text();

					

					// Create a filter for the ID's

					$.expr[':'].id = function(elem){

						return $(elem).attr('id') === sectionId;

					}



					if(mainTitle){

						// Run the filter

						$(':id')

							.find('.hero')

								.find('h2')

									.text(mainTitle)

					}



					if(subTitle && description){

						// Run the filter

						$(':id')

							.find('.descContainer')

								.find('h4')

									.text(subTitle)

								.end()

								.find('p')

									.text(description);

					}

				});

			}

		});

	}

}