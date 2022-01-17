function(url, text, doUpdateModel, doUpdateDojo, baseSrcPath) {

		var elements = this._srcDocument.find({'elementType':"HTMLElement", 'tag': 'script'});

		

		for(var i=0;i<elements.length;i++){

			var n = elements[i];

			var elementUrl = n.getAttribute("src");

			if(elementUrl && elementUrl.indexOf(baseSrcPath) > -1){

				n.setAttribute("src", url);

				return;

			}

		}

	

		

    	if (url) {

            if(url.indexOf("dojo.js")>-1){

                	// nasty nasty nasty special case for dojo attribute thats required.. need to generalize in the metadata somehow.

               	this.addHeaderScript(url,{'djConfig':"parseOnLoad: true"});

              }

           	this.addHeaderScript(url);

        }else if (text) {

        	this._scriptAdditions = this.addHeaderScriptSrc(text, this._findScriptAdditions(),this._srcDocument.find({'elementType':"HTMLElement",'tag':'head'}, true));

        }

    }