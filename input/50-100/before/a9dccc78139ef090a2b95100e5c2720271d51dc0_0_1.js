function(params,content) {
            
                var myUrl;
            
                if (params === "") {
                    myUrl = content.replace(/<.*?>/g,"");
                } else {
                    myUrl = params.substr(1);
                }
                
                urlPattern.lastIndex = 0;
                if ( !urlPattern.test( myUrl ) ) {
                    myUrl = "#";
                }
            
                return '<a href="' + myUrl + '">';
            }