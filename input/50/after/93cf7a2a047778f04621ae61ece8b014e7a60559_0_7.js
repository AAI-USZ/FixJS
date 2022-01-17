function(e) {
                    if(e.which===13) { // on enter
                        // add row
                        edit.blur();
                        get_events(edit, id('eventcount', graph));
                    }
                }