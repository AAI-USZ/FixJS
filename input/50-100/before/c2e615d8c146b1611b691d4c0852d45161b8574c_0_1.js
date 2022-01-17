function(success, templates) {
                if (success) {
                    renderMenu(templates);
                } else {
                    debug.error('Could not get the group templates');
                }
            }