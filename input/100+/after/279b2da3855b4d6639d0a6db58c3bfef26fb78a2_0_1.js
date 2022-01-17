function(options, excursion){

		

		//Check minium requirements

		if(!VISH.Utils.checkMiniumRequirements()){

			return;

		}



		//first set VISH.Editing to true

		VISH.Editing = true;

		

		if(options){

			initOptions = options;

			if((options['developping']==true)&&(VISH.Debugging)){

				VISH.Debugging.init(true);

	      if ((VISH.Debugging.getActionInit() == "loadSamples")&&(!excursion)) {

	        excursion = VISH.Debugging.getExcursionSamples();

	      }

			}

			if((options["configuration"])&&(VISH.Configuration)){

        VISH.Configuration.init(options["configuration"]);

				VISH.Configuration.applyConfiguration();

      }

		}	else {

			initOptions = {};

		}

		



		//If we have to edit

		if(excursion){

			excursion_to_edit = excursion;

			excursionDetails.title = excursion.title;

			excursionDetails.description = excursion.description;

			excursionDetails.avatar = excursion.avatar;

			V.Editor.Renderer.init(excursion);

			//remove focus from any zone

			_removeSelectableProperties();			

		}

		

		// fancybox to create a new slide		

		$("a#addSlideFancybox").fancybox({

			'autoDimensions' : false,

			'scrolling': 'no',

			'width': 385,

    		'height': 340,

    		'padding': 0,

			"onStart"  : function(data) {

				//re-set the params['current_el'] to the clicked zone, because maybe the user have clicked in another editable zone before this one

				var clickedZoneId = $(data).attr("zone");

				params['current_el'] = $("#" + clickedZoneId);

				loadTab('tab_templates');

			}

    });

		

		if(!eventsLoaded){

			eventsLoaded = true;

			

			$(document).on('click', '#edit_excursion_details', _onEditExcursionDetailsButtonClicked);

      $(document).on('click', '#save_excursion_details', _onSaveExcursionDetailsButtonClicked);   

      $(document).on('click','.templatethumb', _onTemplateThumbClicked);

      

      $(document).on('click','#save', _onSaveButtonClicked);

      $(document).on('click','.editable', _onEditableClicked);

      $(document).on('click','.selectable', _onSelectableClicked);

      $(document).on('click','.delete_content', _onDeleteItemClicked);

      $(document).on('click','.delete_slide', _onDeleteSlideClicked);

      //arrows in button panel

      $(document).on('click','#arrow_left_div', _onArrowLeftClicked);

      $(document).on('click','#arrow_right_div', _onArrowRightClicked);

    

      //used directly from SlideManager, if we separate editor from viewer that code would have to be in a common file used by editor and viewer

      _addEditorEnterLeaveEvents();

    

      V.SlidesUtilities.redrawSlides();

      V.Editor.Thumbnails.redrawThumbnails();

    

      addEventListeners(); //comes from slides.js to be called only once

      

			//if click on begginers tutorial->launch it

      _addTutorialEvents();

		}



		

		if(excursion){

			//hide objects (the _onslideenterEditor event will show the objects in the current slide)

			$('.object_wrapper').hide()

		}

		

		//Init submodules

		V.Editor.Text.init();

		V.Editor.Image.init();

		V.Editor.Video.init();

		V.Editor.Object.init();

		V.Editor.Thumbnails.init();

		V.Editor.AvatarPicker.init();

		V.Editor.I18n.init(options["lang"]);

		V.Editor.Quiz.init();



	

		if ((VISH.Configuration.getConfiguration()["presentationSettings"])&&(!excursion_to_edit)){

				$("a#edit_excursion_details").fancybox({

	        'autoDimensions' : false,

	        'scrolling': 'no',

	        'width': 800,

	        'height': 660,

	        'padding': 0,

	        'hideOnOverlayClick': false,

	        'hideOnContentClick': false,

	        'showCloseButton': false

	      }); 

        $("#edit_excursion_details").trigger('click');

		} else {

				$("a#edit_excursion_details").fancybox({

	        'autoDimensions' : false,

	        'scrolling': 'no',

	        'width': 800,

	        'height': 660,

	        'padding': 0,

	        'hideOnOverlayClick': false,

	        'hideOnContentClick': false,

	        'showCloseButton': true

	      }); 

		}

		

	}