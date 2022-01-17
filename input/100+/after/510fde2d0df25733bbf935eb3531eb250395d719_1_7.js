function() {
      
      panels.settings = $("#global-settings");
      panels.settings.hide();
  	  
  	  panels.profile = $("#profile-settings");
  	  panels.profile.hide();
  	  
  	  panels.messages = $("#messages");
  	  panels.messages.hide();
  	 
		  //initialize settings from local configuration if any 
      if(localConfig) {
        if(typeof(localConfig) === "function") {
          localConfig(constants);
        }
      }	 
  	  //Setup profile basically pass the url of the profile server 
  	  profile.setServerUrl(constants.userProfileServerUrl) ;
  	  //Init the user profile to identify if user is logged in
      if(profile.init()) {
        performLoggedInSetup();
      } else {
        initSettings();
      }
     
      //init profile form modification stuff
      $('#profile-accordion').accordion({ autoHeight: false });
      $('#dateOfBirth').datepicker({ dateFormat: "yy-mm-dd" });
      $('#country').selectToAutocomplete();
      
  	  //init custom checkbox events
  	  $('.checkbox').toggle(function() {
  	    $(this).addClass('checked');
  	    $(this).find(':checkbox').attr('checked', true);
  	  }, function() {
  	    $(this).removeClass('checked');
  	    $(this).find(':checkbox').attr('checked', false);
  	  });
    
      $("#button-global-settings").on('click touchstart',function(event){
        if($("#button-global-settings").hasClass('active')) {
          handleSettingsSave();
          panels.settings.hide(constants.slideUpAnimationTime);
          $("#button-global-settings").removeClass('active');
        } else {
          panels.hide(constants.slideDownAnimationTime);
          panels.settings.show(constants.slideDownAnimationTime);
    	  $("#button-global-settings").addClass('active');
          $("body").one("click", function() {
            panels.hide(constants.slideDownAnimationTime);
          });
        }
        event.stopPropagation();
        return false ;
      });

      panels.settings.click(function(event) {
        event.stopPropagation();
      });
      
      //Initialize the authentication widget
      //----------------------------------------------------------
      // WARNING - very ugly code - janrain is baaad!
      
      var beautifyJanrain = function() {
        $('#janrainEngageEmbed .janrainContent').attr('style','min-height: 40px');
        $('#janrainEngageEmbed #janrainView').attr('style','');
        $('#janrainEngageEmbed #janrainView .janrainHeader').attr('style','display: none;');
        $('#janrainEngageEmbed #janrainView #janrain-blank').remove();
        $('#janrainEngageEmbed #janrainView #janrainProviderPages').attr('style','margin: 0; padding: 0;');
        $('#janrainEngageEmbed #janrainView #attribution_footer').remove();
        $('#janrainEngageEmbed .janrainContent > div:last:not(#janrainView)').remove();
      };
      
      window.janrainWidgetOnload = function() {
        //Force to format the stupid authentication widget
        beautifyJanrain();
        
        $(document).on('DOMNodeInserted','#janrainEngageEmbed .janrainContent',function() {
          //sendNotifyMessage($('#janrainEngageEmbed .janrainContent > div:last').text(),'info',false);
          beautifyJanrain();
        });
        
        $('#janrainEngageEmbed #janrain-google,#janrainEngageEmbed .providers').on('click', function(event) {
          panels.login.hide(constants.slideDownAnimationTime);
        });
        
        janrain.events.onProviderLoginToken.addHandler(function(tokenResponse) {
          //console.log(tokenResponse);
          handleLogin(tokenResponse.token);
        });
      };
      //----------------------------------------------------------      
      
      panels.login = $("#login-settings");
      panels.login.hide();
      
      $("#button-login-settings").on('click touchstart',function(event){

        if($("#button-login-settings").find('a:first').text() == 'Login') {
          
          if($("#button-login-settings").hasClass('active')) {
            /* 
            if(panels.login.find("#email").val().length > 0 || panels.login.find("#pw").val().length > 0) {
              handleLogin();
            } else { 
              panels.login.hide(constants.slideDownAnimationTime);
            } 
            */
            panels.login.hide(constants.slideUpAnimationTime);
            $("#button-login-settings").removeClass('active');
          } else {
            panels.hide(constants.slideDownAnimationTime);
            panels.login.show(constants.slideDownAnimationTime);
            $("#button-login-settings").addClass('active');
            $("body").one("click", function() {
              panels.hide(constants.slideDownAnimationTime);
            });
          }
        } else {http://localhost/isearch/register.php
          
          if($("#button-login-settings").hasClass('active')) {
            profile.setFromForm(sendNotifyMessage);
            panels.profile.hide(constants.slideDownAnimationTime);
            $("#button-login-settings").removeClass('active');
          } else {
            panels.hide(constants.slideDownAnimationTime);
            panels.profile.show(constants.slideUpAnimationTime);
            $("#button-login-settings").addClass('active');
            /*$("body").one("click", function() {
              panels.hide(constants.slideDownAnimationTime);
            });*/
          }
        }
        
        event.stopPropagation();
        
        return false ;
      });
      
      //Logout button
      $("#logout").click(function(event) {
        panels.hide(constants.slideDownAnimationTime);
        handleLogout();
        event.preventDefault();
        event.stopPropagation();
      });
      
      panels.login.click(function(event) {
        event.preventDefault();
        event.stopPropagation();
      });

	  $('#user-registration').click(function(event) {
	    	$.ajax({
	    		type: "POST",
    			url: constants.userRegisterServerUrl,
    			success: function(data) {
    			
    				var frm = $('<div>').html(data) ;
    				
    				var onSumbit = function() {
    					var fields = $(this).serialize();
	    					
    					$.ajax({
    							type: 'POST',
				    			url: constants.userRegisterServerUrl,
				    			data: fields,
   								success: function(data) {
    								frm.html(data) ;
    							
    								$('form', frm).submit(onSumbit) ; 
    							}
    						}) ;			
	    					
						return false;
	    			} ;
    				    			
	     			frm.dialog(
	     					{ 	modal: true, 
	     						title: "Registration", 
	     						width: 800, 
	     						height: 400,
	     						autoOpen: false,
                                maxHeight: 400,
	     					}).dialog('open');
	     					
	     				$('form', frm).submit(onSumbit) ; 
			    }
			   
		  });
	  
	  }) ;
	  
      //Listen to keypress click to change settings
      $("#global-settings form").keypress(function(event) {
        if ( event.which == 13 ) {
          event.preventDefault();
          handleSettingsSave();
          return false;
        }
      });
      
      $("#login-settings form").keypress(function(event) {
        if ( event.which == 13 ) {
          event.preventDefault();
          if($("#button-login-settings").hasClass('active')) {
          	if ( constants.useOldAuthentication )
          	{
          		if(panels.login.find("#email").val().length > 0 || panels.login.find("#pw").val().length > 0) {
            	  handleLogin();
            	} 
          	}	

            panels.login.hide(constants.slideDownAnimationTime);
           
            $("#button-login-settings").removeClass('active');
          }
          return false;
        }
      });
      
      $("#profile-settings form").keypress(function(event) {
        if ( event.which == 13 ) {
          event.preventDefault();
          if($("#button-login-settings").hasClass('active')) {
            profile.setFromForm(sendNotifyMessage);
            panels.profile.hide(constants.slideDownAnimationTime);
            $("#button-login-settings").removeClass('active');
          }
          return false;
        }
      });

    }