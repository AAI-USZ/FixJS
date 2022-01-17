function() {
                    if( current_position() === 0 ){
                        right_arrow.find('span').addClass('disabled');
                        left_arrow.find('span').removeClass('disabled');
                    } else if( stop_position() === current_position() ) {
                        left_arrow.find('span').addClass('disabled');
                        right_arrow.find('span').removeClass('disabled');
                    } else {
                        right_arrow.find('span').removeClass('disabled');
                        left_arrow.find('span').removeClass('disabled');
                    }
                }