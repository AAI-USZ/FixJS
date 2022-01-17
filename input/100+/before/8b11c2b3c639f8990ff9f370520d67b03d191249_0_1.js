function loadJS(i) {
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
                }