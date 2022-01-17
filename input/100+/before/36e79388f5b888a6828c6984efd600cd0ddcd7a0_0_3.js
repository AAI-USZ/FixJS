function(ev) {

                    ev.stopPropagation();

                    ev.preventDefault();

                    switchOption();



                    command[ field ] = option;

                    if ( callback ) {

                        callback.call( command, option, painter );

                    }

            }