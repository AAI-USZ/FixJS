function(i, el){
                    var href = $(el).attr('href');
                    if(href.indexOf('&per=') < 0){
                        $(el).attr('href', href + '&per=' + val);
                    }			    
                    else{
                        href = href.replace(
                            new RegExp(
                                "(&per=)(\\d+)"
                           ), "$1" + val
                        )
                        $(el).attr('href', href);
                    }
                    $('#access_points_paginate .page a').eq(0).trigger('click');
                }