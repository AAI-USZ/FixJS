function(x, y) {

        var totalval = x * (totalSlides - 1);

        if (totalval == 0) {

            var doalert = 1;

        } else if (totalval == 1) {
            var doalert = 2;

        } else if (totalval == 2) {
            var doalert = 3;
        } else if (totalval == 3) {
            var doalert = 4;
        } else if (totalval == 4) {
            var doalert = 5;
        }

        else {

            var doalert = 0;
        }

        if (doalert == 1) {
            $('.startSlideshow').fadeIn();	
            logAction('Page 1 touched');
        }

        if (doalert == 2) {
            
            $('.startSlideshow').fadeOut('10');	

            if (hand == 0) {
                showHand();

                $('.phoneSlideshow').cycle({
                    fx: 'fade' // choose your transition type, ex: fade, scrollUp, shuffle, etc...
							
                });
				 
                $('.phoneSlideshowSmall').cycle({
                    fx: 'fade' // choose your transition type, ex: fade, scrollUp, shuffle, etc...
							
                });
                setTimeout('hideHand()', 17000);
                hand = 1;
            }

            logAction('Page 2 Visited');
        }

        if (doalert == 3) {
             $('.startSlideshow').fadeOut();	
            logAction('Page 3  Visited');
        }

        if (doalert == 4) {
             $('.startSlideshow').fadeOut();	
            logAction('Page 4  Visited');
        }

        if (doalert == 5) {
		 $('.startSlideshow').fadeOut();		
            setTimeout('finalPage()', 2000);
			
            logAction('Page 5 Visited');
        }

    }