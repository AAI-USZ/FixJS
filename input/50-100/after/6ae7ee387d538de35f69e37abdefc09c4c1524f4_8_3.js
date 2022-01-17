function(ev, cps){
            if($("#content_profile_left_column").is(":visible")){
                // There is a left hand navigation visible, versions widget will be smaller
                $(versionsContainer, $rootel).removeClass("versions_without_left_hand_nav");
            } else {
                // No left hand navigation visible, versions widget will be wider
                $(versionsContainer, $rootel).addClass("versions_without_left_hand_nav");
            }
            currentPageShown = cps;
            $('.versions_widget', $rootel).show();
            doInit();
        }