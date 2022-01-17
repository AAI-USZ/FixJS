function(direction) {
                    var position = (direction === 'left') ? '-=100' : '+=100';
                    
                    $('#grid_content').animate({ 'left' : position }, 'slow');
                    $('#column_headers').animate({ 'left' : position }, 'slow',
                        function() {
                            set_arrow_states();
                        }
                    );
                }