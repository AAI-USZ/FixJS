function(url, text, doUpdateModel, doUpdateDojo, baseSrcPath) {

		var elements = this._srcDocument.find({elementType: "HTMLElement", tag: 'script'});

		if (elements.some(function(n) {

			var elementUrl = n.getAttribute("src");

			if(elementUrl && elementUrl.indexOf(baseSrcPath) > -1){

				n.setAttribute("src", url);

				return true;

			}			

		})) {

			return;

		}



    	if (url) {

            if(url.indexOf("dojo.js")>-1){

                	// nasty nasty nasty special case for dojo attribute thats required.. need to generalize in the metadata somehow.

               	this.addHeaderScript(url,{'data-dojo-config': "parseOnLoad: true"});

            }

           	this.addHeaderScript(url);

        }else if (text) {

        	this._scriptAdditions = this.addHeaderScriptSrc(

        			text,

        			this._findScriptAdditions(),

        			this._srcDocument.find({elementType: "HTMLElement", tag: 'head'}, true));

        }

    }