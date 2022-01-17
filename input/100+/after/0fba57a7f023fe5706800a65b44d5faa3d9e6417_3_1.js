function() {
        settings.find('#main #connection #hostType').enableTap().click(
            function() { _navigatePageWithBack('#hosts', 'Login Host'); }
        );
        
        settings.find('#hosts table td').enableTap().click(
            function() {
                var that = $j(this);
                that.addClass('cellselected');
                ManageUserSession.setLoginHostType(this.id);
                _renderConnectionInfo();
                setTimeout(function() {that.removeClass('cellselected');}, 100);
            }
        );
        
        settings.find('#main #connection #host_url input').focus(
            function() {
                customHostInFocus = true;
                var that = $j(this);
                that.css('text-align', 'left');
            }
        ).blur(
            function() {
                customHostInFocus = false;
                $j(this).val(ManageUserSession.getLoginHostUrl());
                $j(this).css('text-align', 'right');
                setTimeout(function(){ $j(document.body).scrollTop(0); }, 10);
            }
        );
        
        settings.find('#main #connection #host_url form').submit(
            function() {
                var inputField = settings.find('#main #connection #host_url input');
                
                if(_validateCustomHost()) {
                    ManageUserSession.setLoginHostUrl(inputField.val());
                    _renderConnectionInfo();
                    inputField.blur();
                }
                return false;
            });
        
        settings.find('#main #help #help_about').enableTap().click(
            function() { _navigatePageWithBack('#about', 'About'); }
        );
        
        settings.find('#main #help #help_faq').enableTap().click(
            function() { 
                _navigatePageWithBack('#faq', 'FAQ', function() { /*_destroyScroller(); settingsScroller = createScroller(settings.find('#faq')); */}); 
            }
        );
        
        settings.find('#main #help #help_eula').enableTap().click(
            function() { 
                _navigatePageWithBack('#eula', 'Contact Viewer EULA', _showEula);
            }
        );
        
        settings.find('#loginbtn').off()
                .enableTap().click( function() { prepareSession(); } );
        settings.find('#logoutbtn').off().enableTap().click(function(e) {
            // Delete the saved refresh token
            var resp = confirm('Logout user ' + ManageUserSession.getUsername() + '?');
            if (resp) {
                logout(false);
            }
        });
    }