function(){
                    var distance = $('#grid_content').css('left');

                    $('#grid_content').animate({ 'left' : 0 }, 'fast');
                    $('#column_headers').animate({ 'left' : 0 }, 'fast',
                        function() {
                            set_arrow_states();
                        }
                    );

                }