function checkBrowserWidth(){

		var browserWidth = getBrowserWidth();

		

		if (browserWidth < 1000){

			$('body').addClass('thin'); 

		}else{

			$('body').removeClass('thin');

		}

	}