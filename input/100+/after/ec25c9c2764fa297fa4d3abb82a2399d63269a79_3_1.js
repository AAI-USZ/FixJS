function(options, excursion){

		

		V.Status.init();

	VISH.Debugging.log("(SlideManager)options [username]: " + options['username']);	

		//first set VISH.Editing to false

		VISH.Editing = false;

	

	//fixing editor mode when save an excursion

		if(options['username']) {

			

			user.username = options['username'];

			user.role  = "logged";

			if(options['token']){

				status.token = options['token'];

			

				if(options['quiz_active']) {

					status.quiz_active = options['quiz_active'];

				} 

				//when logged + token but no quiz_active

				else { 

				//must be false

				status.quiz_active = options['quiz_active']; 

				}			

			

			}

			//no token ( when? ) but logged 

			else {

			

				status.token = "";

				//logged, no token but quiz_active .... ?

				if(options['quiz_active']) {

					 	

					status.quiz_active = options['quiz_active'];

				

				}

			}

			

		}  //no username 

		else {

		

			user.username=""; //so no token

			status.token=""; 

			

			//no username but quiz active --> (student) 

			if(options['quiz_active']) {

		 		user.role= "student" //logged and no token but quiz active " + options['quiz_active'];

				status.quiz_active = options['quiz_active'];

			}

		//no username no quiz active --> (none)

			else {

				

				

		 		user.role= "none";

		 		status.quiz_active = options['quiz_active'];

		 	} 

		

		 }	

		 

		 

		

		//this case is when we are  in develop mode

		

		 

		 

		 VISH.Debugging.log("(SlideManager)username: " + user.username);

		 VISH.Debugging.log("(SlideManager)role: " + user.role);

		 

		 

		mySlides = excursion.slides;

		V.Excursion.init(mySlides);

		V.ViewerAdapter.setupSize();

		

		if(!eventsLoaded){

			eventsLoaded = true;

			addEventListeners(); //for the arrow keys

      		$(document).on('click', '#page-switcher-start', VISH.SlidesUtilities.backwardOneSlide);

      		$(document).on('click', '#page-switcher-end', VISH.SlidesUtilities.forwardOneSlide);

		}

				

		if(V.Status.getIsInIframe()){

			myDoc = parent.document;

		} else {

			myDoc = document;

		}

				

		$(window).on('orientationchange',function(){

      		V.ViewerAdapter.setupSize();      

    	});

		

		if (V.Status.features.fullscreen) {  

		  $(document).on('click', '#page-fullscreen', toggleFullScreen);

		  $(myDoc).on("webkitfullscreenchange mozfullscreenchange fullscreenchange",function(){

      		V.ViewerAdapter.setupSize();   

    	  });

		}	else {

		  $("#page-fullscreen").hide();

		}

		

	

		if (V.Status.ua.mobile) {

    		//hide page counter (the slides are passed touching)

    		$("#viewbar").hide();

		}

		else{

			VISH.SlidesUtilities.updateSlideCounter();

		}

	}