function(){

		

	function getBrowserWidth(){

		if (window.innerWidth){

			return window.innerWidth;

		}  

		else if (document.documentElement && document.documentElement.clientWidth != 0){

			return document.documentElement.clientWidth;

		}

		else if (document.body){

			return document.body.clientWidth;

		}      

		return 0;

	}

	

	function checkBrowserWidth(){

		var browserWidth = getBrowserWidth();

		

		if (browserWidth < 1000){

			$('body').addClass('thin'); 

		}else{

			$('body').removeClass('thin');

		}

	}

	

	$(window).resize(function(e){

		checkBrowserWidth();		

	});

	

	// first time

	checkBrowserWidth();

}