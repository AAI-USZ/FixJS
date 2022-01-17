function(e,o) {

                            $('#ggl-web-results').append(o).find('.google').draggable(

                            {

                                revert: 'invalid',

                                helper: 'clone',

                                appendTo: 'body',

                                zIndex: 2700,

                                clone: true,

                                start: function() {

                                    var idx = parseInt($(this).attr('idx'),10), startx = parseInt($(this).attr('startx'),10);

                                    self.data[startx+idx].type = 'web';

                                    $(this).data('data', self.adaptor.universal(self.data[startx+idx]));

                                }



                            }

                            );

                        }