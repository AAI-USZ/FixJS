function() {
                settings.find('#header #left').hide().unbind();
                if (useAnimations) {
                    from.changePage(settings.find('#main'), true, function() { from.css('visibility', 'hidden'); } );
                } else {
                    from.hide();
                    settings.find('#main').show().css('visibility', '');
                }
                settings.find('#header #title').text('Settings');
                if(ManageUserSession.isActive()) settings.find('#header #done').show();
                _initiateScroller('#main');
            }