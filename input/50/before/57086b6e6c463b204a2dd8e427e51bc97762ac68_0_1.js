function(e){

		var browserWidth = getBrowserWidth();

		

		if (browserWidth < 900){

			$('body').addClass('thin'); 

		}else{

			$('body').removeClass('thin');

		}

	}