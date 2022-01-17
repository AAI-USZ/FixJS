function() {
                            if (!script.readyState || script.readyState == "loaded" || script.readyState == "complete"){
                                virtualScripts.push(assetURL);
                                loadJS(++i);
                            }
                        }