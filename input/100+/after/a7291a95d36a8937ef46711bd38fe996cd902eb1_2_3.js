function (start) {

                var self = this;

                var text = $('#google-search-text').val();		

                if (text.length < 1) {

                    return;

                }		

                $('#ggl-web-more').html('');

                start = typeof start !== 'undefined' ? start : 0;

                if ( start == 0) {

                    self.data = [];

                    $('#ggl-web-results').html('');

                }

                var currentDate = new Date(), currentStr = currentDate.toLocaleDateString();// + ' ' + currentDate.toLocaleTimeString();

                this.showLoading('#ggl-web-more');

                $.getJSON(str.format(this.urls.web,{

                    start: start,

                    text: text

                }), {}, function(data){

                    self.stopLoading('#ggl-web-more');

                    self.data = self.data.concat(data.responseData.results);

                    data.responseData.date = currentDate;

                    if ( data.responseData.results.length > 0 ) {

                        $.tmpl('livedesk>providers/google/web-item', {

                            results: data.responseData.results, 

                            startx: start

                        }, function(e,o) {

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

                        });			

                        var cpage = parseInt(data.responseData.cursor.currentPageIndex);

                        cpage += 1;



                        var pages = data.responseData.cursor.pages;



                        for(var i=0; i< pages.length; i++) {

                            var page = pages[i];

                            if (cpage < page.label) {

                                //show load more results

                                $('#ggl-web-more').tmpl('livedesk>providers/google-more', function(){

                                    $(this).find('[name="more_results"]').on('click', function(){

                                        self.doWeb(page.start)

                                    });

                                });

                                break;

                            }

                        }

                    } else {

                        //no results

                        $.tmpl('livedesk>providers/no-results', data.responseData, function(e,o) {

                            $('#ggl-web-results').append(o);

                        });

                    }

                        

                    

                    

			

                });

            }