function(e,o) {

                                $('#twt-timeline-results').append(o).find('.twitter').draggable({revert: 'invalid',helper: 'clone',appendTo: 'body',zIndex: 2700,clone: true,

                                    start: function() {

                                        $(this).data('data', self.adaptor.universal( $(this) ));

                                    }   

                                });

                            }