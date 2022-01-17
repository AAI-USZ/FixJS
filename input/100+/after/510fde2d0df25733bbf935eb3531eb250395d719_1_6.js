function(event) {
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
      }