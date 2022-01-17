function(e) {
                    e.stopPropagation();
                    var rec = $('#recursive', dt).is(':checked');
                    if (debug) console.log('Toggle switch', authSwitch.hasClass('disabled'))
                    Command.setProperty(entity.id, 'visibleToAuthenticatedUsers', authSwitch.hasClass('disabled'), rec);
                }