function(){
                $(this).trigger("mouseover");
                mouseOverSignIn = true;
                $(topnavUserOptionsLoginFields).trigger('click');
                $(topnavigationlogin).addClass(topnavigationForceSubmenuDisplayTitle);
            }