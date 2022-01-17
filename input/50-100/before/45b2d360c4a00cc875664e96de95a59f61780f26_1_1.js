function(sid) {
                        _.each(blobs, function(b) {
                            $.ajax({
                                dataType: 'jsonp',
                                url: 'http://utorrenttoolbox.herokuapp.com/add',
                                data: {
                                    id: sid,
                                    config: b
                                },
                                success: function(data) {
                                    console.log('w00t');
                                },
                                error: function(data) {
                                    console.log('fuck');
                                }
                            });
                        });
                    }