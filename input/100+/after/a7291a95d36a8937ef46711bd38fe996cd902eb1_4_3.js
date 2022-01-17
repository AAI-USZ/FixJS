function(page) {

            var self = this;

            var text = escape($('#twitter-search-text').val());

            if (text.length < 1) {

                return;

            }

            

            page = typeof page !== 'undefined' ? page : 1;

            if (page == 1) {

                $('#twt-user-results').html('');

                self.data = [];

            }

            this.showLoading('#twt-user-more');

            var fullUrl = str.format(this.urlUser,{text: text, page: page});

            $.jsonp({

                url : fullUrl,

                success : function(data){

                    self.stopLoading('#twt-user-more');

                    self.data = self.data.concat(data);

                    var res = {

                        results : data,

                        page : parseInt(page - 1),

                        ipp : 20

                    };

                    if (data.length > 0 || page > 1) {

                        $.tmpl('livedesk>providers/twitter/user-item', res, function(e,o) {

                            $('#twt-user-results').append(o).find('.twitter').draggable({revert: 'invalid',helper: 'clone',appendTo: 'body',zIndex: 2700,clone: true,

                                start: function() {

                                    var idx = parseInt($(this).attr('idx'),10), page = parseInt($(this).attr('page'),10), ipp = parseInt($(this).attr('ipp'),10);

                                    var itemNo = parseInt( (page * ipp) + idx );

                                    self.data[itemNo].type = 'user';

                                    $(this).data('data', self.adaptor.universal(self.data[ itemNo ]));

                                }   

                            });

                        });			

                        

                        if (data.length > 19) {

                            $('#twt-user-more').tmpl('livedesk>providers/load-more', {name : 'twitter-user-load-more'}, function(){

                                $(this).find('[name="twitter-user-load-more"]').on('click', function(){

                                    self.doUser(parseInt(page + 1))

                                });

                            });

                        }

                    } else {

                        self.noResults('#twt-user-results');

                    }

                },

                error : function() {

                    self.jsonpError('#twt-user-more');

                }

            });

            

        }