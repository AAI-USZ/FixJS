function() {
					var windowwidth = $(window).width(), contenttop = $(
							'#contenttop').offset().top, adjustment = contenttop - 85, filleradjust = contenttop + 300;

					$('#fullbackground img').css("width", windowwidth);
					$('#whitefade').css("top", adjustment);
					$('#whitefadefiller').css("top", filleradjust);
					$('#fullbackground').fadeIn();
					
					$('.slideshow').cycle({
						speedIn : 2000,
						speedOut : 2000,
						timeout : 10000,
						fx : 'fade' // choose your transition type, ex: fade, scrollUp, shuffle,
									// etc...
					});
					$('.slideshow').css("display", "block");
				}