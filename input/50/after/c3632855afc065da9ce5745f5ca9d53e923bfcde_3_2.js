function() {
                SettingsManager.hide();
                $j(this).off('click');
                if(!ManageUserSession.isActive()) window.location = getBaseUrl();
            }