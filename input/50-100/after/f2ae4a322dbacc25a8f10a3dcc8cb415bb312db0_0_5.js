function(direction) {
                    var position = (direction === 'left') ? '-=100' : '+=100';
                    
                    $('#grid_content').animate({ 'left' : position }, 'fast');
                    $('#column_headers').animate({ 'left' : position }, 'fast',
                        function() {
                            set_arrow_states();
                        }
                    );
                }