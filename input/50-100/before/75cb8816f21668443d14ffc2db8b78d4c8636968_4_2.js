function(e) {
                    e.stopPropagation();
                    if (debug) console.log('Toggle switch', authSwitch.hasClass('disabled'))
                    Command.setProperty(entity.id, 'visibleToAuthenticatedUsers', authSwitch.hasClass('disabled'));
                }