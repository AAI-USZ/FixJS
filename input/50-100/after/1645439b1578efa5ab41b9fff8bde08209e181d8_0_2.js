function() {

					if(!lockslide)

					{

					 $active1.removeClass('displayslide');

					 $active1.addClass('displaynone');

					



					 $next1.css({opacity: 0.0})

						.removeClass('displaynone')

						.addClass('displayslide')







					 $next1.animate({opacity: 1.0}, 500, function() {

							if(!lockslide)

							{

								



							}

							lockslide=false;

							inanimation = false;



						});



					}

					lockslide=false;

					inanimation = false;

				}