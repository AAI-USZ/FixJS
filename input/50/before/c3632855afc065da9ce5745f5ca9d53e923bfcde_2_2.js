function() {
                SettingsManager.hide();
                $j(this).unbind('click');
                if(!ManageUserSession.isActive()) window.location = getBaseUrl();
            }