function (scripts, callback) {
            if (scripts) {
                var virtualScripts = $('html').data(Tapestry.VIRTUAL_SCRIPTS),
                    that = this;
                
                if (!virtualScripts) {
                    virtualScripts = [];
                    var path;
                    $('script[src]').each(function () {
                        path = $(this).attr('src');
                        virtualScripts.push($.tapestry.utils.rebuildURL(path));
                    });
                }
                
                (function loadJS(i) {
                    if(i=== scripts.length) {
                        $('html').data(Tapestry.VIRTUAL_SCRIPTS, virtualScripts);
                        callback.call(that);
                        return;
                    }
                    var assetURL = $.tapestry.utils.rebuildURL(scripts[i]);
                    if ($.inArray(assetURL, virtualScripts) === -1) {
                        var head= document.getElementsByTagName('head')[0],
                            script = document.createElement('script');
                        
                        function jsLoaded () {
                                virtualScripts.push(assetURL);
                                loadJS(++i);
                        };
                        
                        script.src = assetURL;
                        script.type = "text/javascript";
                        //IE
                        script.onreadystatechange = function() {
                            if (script.readyState == "loaded" || script.readyState == "complete"){
                                jsLoaded();
                            }
                        };
                        //others
                        script.onload = function() {
                            jsLoaded();
                        };
                        head.appendChild(script);
                    }
                    else {
                        loadJS(++i);
                    }
                })(0);
            }
            else {
                callback.call(this);
            }
        }