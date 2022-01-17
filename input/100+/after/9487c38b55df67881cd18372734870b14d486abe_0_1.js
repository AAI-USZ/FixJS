function(scripts, callback) {
            if (!scripts) {
                // TODO : re-implement scriptLoadMonitor
                callback.call(this);
                return;
            }

            var virtualScripts = $('html').data(Tapestry.VIRTUAL_SCRIPTS);
            if (!virtualScripts) {
                virtualScripts = [];
                
                $('script[src]').each(function(i, script) {
                    path = $(script).attr('src');
                    virtualScripts.push($.tapestry.utils.rebuildURL(path));
                });
            }
            
            var callbacks = [];
            $.each(scripts, function(i, scriptURL){
            	callbacks.push(function(){
            		 var assetURL = $.tapestry.utils.rebuildURL(scriptURL);
                     if ($.inArray(assetURL, virtualScripts) === -1) {
                         var script   = document.createElement("script");
                         script.type  = "text/javascript";
                         script.src   = assetURL;
                         document.getElementsByTagName('head')[0].appendChild(script);
                         virtualScripts.push(assetURL);
                         if(i == callbacks.length - 2)
                        	 $('html').data(Tapestry.VIRTUAL_SCRIPTS, virtualScripts);
                         var completed = false;
                         script.onload = script.onreadystatechange = function () {
                        	 if (!completed && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                        		 completed = true;
                        		 script.onload = script.onreadystatechange = null;
                        		 callbacks[i + 1].call(this);
                        	 }
                         };
                     }
            	});
            });
            callbacks.push(callback);
            callbacks[0].call(this);
        }