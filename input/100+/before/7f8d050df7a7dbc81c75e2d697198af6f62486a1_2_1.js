function(excursion){

		//first set VISH.Editing to false

		VISH.Editing = false;

		

		mySlides = excursion.slides;

		V.Excursion.init(mySlides);

		_setupSize();

		addEventListeners(); //for the arrow keys

		

		$(document).on('click', '#page-switcher-start', VISH.SlidesUtilities.backwardOneSlide);

		$(document).on('click', '#page-switcher-end', VISH.SlidesUtilities.forwardOneSlide);

		

		var isInIFrame = (window.location != window.parent.location) ? true : false;

		var myElem = null;

		

		if(isInIFrame){

			myDoc = parent.document;

		} else {

			myDoc = document;

		}

		$(myDoc).on("webkitfullscreenchange mozfullscreenchange fullscreenchange",function(){

             _setupSize();         

        });

		

		var elem = document.getElementById("page-fullscreen");  

		var canFullScreen = elem && (elem.requestFullScreen || elem.mozRequestFullScreen || elem.webkitRequestFullScreen);

		

		if (canFullScreen) {  

		  $(document).on('click', '#page-fullscreen', toggleFullScreen);

		}

		else{

		  $("#page-fullscreen").hide();

		}

		

		VISH.SlidesUtilities.updateSlideCounter();

	}