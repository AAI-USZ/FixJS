function() {
            var initialY, finalY, onComplete;
            
            _setup();
            overlay = $j('#loggedin').addOverlay();
            settings.find('#username').setText(ManageUserSession.getUsername() || 'None');
    
            onComplete = function() {
                SettingsManager.hide();
                $j(this).unbind('click');
                if(!ManageUserSession.isActive()) window.location = getBaseUrl();
            }
            settings.find('#header #done').unbind('click').click(onComplete);
            if(!ManageUserSession.isActive()) settings.find('#header #done').hide();
        
            initialY = window.innerHeight;
            finalY = (window.innerHeight - settings.height())/2;
            
            settings.hide().css('zIndex', $j.topZIndex(overlay.elem) + 10)
                    .css({ left: (window.innerWidth - settings.width())/2 });
            if (useAnimations) {
                settings.css({top: 0}).show().slideIn('Y', initialY, finalY);
            } else settings.css({top: finalY}).show();
            
            _initiateScroller('#main');
            settings.orientationChange(_positionCenter);
        }