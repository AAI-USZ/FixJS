function (scripts, callback) {
            if (scripts) {
                var virtualScripts = $j('html').data(Tapestry.VIRTUAL_SCRIPTS),
                    that = this;
                
                if (!virtualScripts) {
                    virtualScripts = [];
                    var path;
                    $j('script[src]').each(function () {
                        path = $j(this).attr('src');
                        virtualScripts.push($j.tapestry.utils.rebuildURL(path));
                    });
                }
                
                (function loadJS(i) {
                    if(i=== scripts.length) {
                        $j('html').data(Tapestry.VIRTUAL_SCRIPTS, virtualScripts);
                        callback.call(that);
                        return;
                    }
                    var assetURL = $j.tapestry.utils.rebuildURL(scripts[i]);
                    if ($j.inArray(assetURL, virtualScripts) === -1) {
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