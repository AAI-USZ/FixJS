function(event){

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
      }