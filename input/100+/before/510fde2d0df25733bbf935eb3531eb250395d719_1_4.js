function(event){
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
      }