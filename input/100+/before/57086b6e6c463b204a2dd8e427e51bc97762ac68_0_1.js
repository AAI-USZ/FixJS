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

	

	$(window).resize(function(e){

		var browserWidth = getBrowserWidth();

		

		if (browserWidth < 900){

			$('body').addClass('thin'); 

		}else{

			$('body').removeClass('thin');

		}

	});

}