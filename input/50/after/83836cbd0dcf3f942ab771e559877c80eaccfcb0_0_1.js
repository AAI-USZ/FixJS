function() {
                            //needed because of IE
                            if($j.inArray(assetURL, virtualScripts) === -1) {
                                virtualScripts.push(assetURL);
                                loadJS(++i);
                            }
                        }