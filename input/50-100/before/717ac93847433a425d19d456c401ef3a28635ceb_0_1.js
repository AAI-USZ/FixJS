function(i, s) {
                    var assetURL = $.tapestry.utils.rebuildURL(s.href);
                    
                    if ($('head link[href="' + assetURL + '"]').size() === 0) {
                    
                        stylesheet = '<link href="' + assetURL + '" type="text/css" rel="stylesheet"';
                        
                        if (s.media) 
                            stylesheet += ' media="' + s.media + '" ';
                        
                        stylesheet += '/>';
                        
                        $('head').append(stylesheet);
                    }
                }