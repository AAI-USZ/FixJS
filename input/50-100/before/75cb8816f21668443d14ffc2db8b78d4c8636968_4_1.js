function(e) {
                    e.stopPropagation();
                    if (debug) console.log('Toggle switch', publicSwitch.hasClass('disabled'))
                    Command.setProperty(entity.id, 'visibleToPublicUsers', publicSwitch.hasClass('disabled'));
                }