function(e) {
                    e.stopPropagation();
                    var rec = $('#recursive', dt).is(':checked');
                    if (debug) console.log('Toggle switch', publicSwitch.hasClass('disabled'))
                    Command.setProperty(entity.id, 'visibleToPublicUsers', publicSwitch.hasClass('disabled'), rec);
                }