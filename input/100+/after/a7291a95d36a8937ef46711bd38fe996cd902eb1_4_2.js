function() {

                                        $(this).data('data', self.adaptor.universal( $(this) ));

                                        var idx = parseInt($(this).attr('idx'),10), page = parseInt($(this).attr('page'),10), ipp = parseInt($(this).attr('ipp'),10);

                                        var itemNo = parseInt( (page * ipp) + idx );

                                        self.data[itemNo].type = 'user';

                                        $(this).data('data', self.adaptor.universal(self.data[ itemNo ]));

                                    }