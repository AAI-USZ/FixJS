function(/*XMLEvent*/ xmlEvent) {
        console.debug("XFProcessor._handleBetterFormLoadURI xmlEvent:",xmlEvent);

        // xf:load show=replace
        if (xmlEvent.contextInfo.show == "replace") {
            fluxProcessor.skipshutdown = true;
            window.location.href = xmlEvent.contextInfo.uri;
        }
        // xf:load show=new
        else if (xmlEvent.contextInfo.show == "new") {
            window.open(xmlEvent.contextInfo.uri, '_betterform', 'menubar=yes,toolbar=yes,location=yes,directories=yes,fullscreen=no,titlebar=yes,hotkeys=yes,status=yes,scrollbars=yes,resizable=yes');

        }
        /* xf:load show=embed
         to embed an existing form into the running form
         */
        else if (xmlEvent.contextInfo.show == "embed") {
//            console.debug("xmlEvent.contextInfo.show='embed'", this);
            // getting target from event - can be either the value of a 'name' or 'id' Attribute
            var xlinkTarget = xmlEvent.contextInfo.xlinkTarget;

            //determine the DOM Element in the client DOM which is the target for embedding
            var targetid;
            if (dom.byId(xlinkTarget) != undefined) {
                targetid = xlinkTarget;
            } else {
                // if we reach here the xlinkTarget is no idref but the value of a name Attrbute that needs resolving
                // to an id.
                var tmp = query("*[name='" + xlinkTarget + "']")[0];
                targetid = tmp.id;
                console.debug("target id for embedding is: ", targetid);
            }

            this._unloadDOM(targetid);

            //get original Element in master DOM
            var htmlEntryPoint = dom.byId(targetid);
            htmlEntryPoint.innerHTML = xmlEvent.contextInfo.targetElement;
            domAttr.set(htmlEntryPoint, "id", xlinkTarget + "Old");
            var nodesToEmbed = dom.byId(targetid);

//            require("dojo/parser", function(parser){
//                parser.parse(htmlEntryPoint);
//            });
            // dojo.parser.parse(htmlEntryPoint);

            domConstruct.place(nodesToEmbed, htmlEntryPoint, "before");
//            dojo.fx.wipeIn({node: nodesToEmbed,duration: 500}).play();
            domStyle.set(nodesToEmbed,"display","block");

            //copy classes from mountpoint
            var classes = domAttr.get(htmlEntryPoint, "class");
            domAttr.set(nodesToEmbed, "class", classes);

            htmlEntryPoint.parentNode.removeChild(htmlEntryPoint);


            require(["dojo/behavior"],function(behavior) {
                // console.debug("htmlEntryPoint:",nodesToEmbed);
                behavior.apply();
            });
            var contextInfo = xmlEvent.contextInfo;
            require(["dojo/ready"], function (ready) {
                ready(function () {
                    var utilizedEvents = contextInfo.utilizedEvents;
                    // console.debug("xmlEvent.contextInfo.utilizedEvents:",xmlEvent.contextInfo.utilizedEvents);
                    if(utilizedEvents && utilizedEvents != ""){
                        var utilizedEventsObj =  json.fromJson("{" + utilizedEvents +  "}");
                        // console.debug("utilizedEventsObj:",utilizedEventsObj);
                        if(utilizedEventsObj.useXFSelect){
                            this.useXFSelect = true;
                        }
                        if(utilizedEventsObj.useDOMFocusIN){
                            this.useDOMFocusIN = true;
                        }
                        if(utilizedEventsObj.useDOMFocusOUT){
                            this.useDOMFocusOUT = true;
                        }
                    }

                    // finally dynamically load the CSS (if some) form the embedded form
                    var cssToLoad = contextInfo.inlineCSS;
//            console.debug("css to load: ", cssToLoad);
                    var headID = document.getElementsByTagName("head")[0];
                    var mountpoint = dom.byId(xlinkTarget);

                    if(cssToLoad != undefined && cssToLoad != ""){
                        //console.debug("adding Style: ", cssToLoad);
                        var stylesheet1 = document.createElement('style');
                        domAttr.set(stylesheet1,"type", "text/css");
                        domAttr.set(stylesheet1,"name", xlinkTarget);
                        var head1 = document.getElementsByTagName('head')[0];
                        head1.appendChild(stylesheet1);
                        if (stylesheet1.styleSheet) {   // IE
                            stylesheet1.styleSheet.cssText = cssToLoad;
                        } else {                // the world
                            var textNode1 = document.createTextNode(cssToLoad);
                            stylesheet1.appendChild(textNode1);
                        }
                    }

                    var externalCssToLoad = contextInfo.externalCSS;

                    if (externalCssToLoad != undefined && externalCssToLoad != "") {
                        var styles = externalCssToLoad.split('#');
                        var head2 = document.getElementsByTagName('head')[0];
                        for (var i = 0; i <= styles.length; i = i+1) {
                            if (styles[i] != undefined && styles[i] != "") {
                                // console.debug("adding Style: ", styles[i]);
                                var stylesheet2 = document.createElement('link');
                                domAttr.set(stylesheet2,"rel","stylesheet");
                                domAttr.set(stylesheet2,"type","text/css");
                                domAttr.set(stylesheet2,"href",styles[i]);
                                domAttr.set(stylesheet2,"name",xlinkTarget);
                                head2.appendChild(stylesheet2);
                            }
                        }
                    }

                    var inlineJavaScriptToLoad = contextInfo.inlineJavascript;
                    if (inlineJavaScriptToLoad != undefined && inlineJavaScriptToLoad != "") {
                        //console.debug("adding script: ", inlineJavaScriptToLoad);
                        var javascript1 = document.createElement('script');
                        domAttr.set(javascript1,"type", "text/javascript");
                        domAttr.set(javascript1,"name", xlinkTarget);
                        var head3 = document.getElementsByTagName('head')[0];
                        head3.appendChild(javascript1);
                        javascript1.text = inlineJavaScriptToLoad;
                    }

                    var externalJavaScriptToLoad = contextInfo.externalJavascript;
                    if (externalJavaScriptToLoad != undefined && externalJavaScriptToLoad != "") {
                        var scripts = externalJavaScriptToLoad.split('#');
                        var head4 = document.getElementsByTagName("head")[0];
                        for (var z = 0; z <= scripts.length; z = z+1) {
                            if (scripts[z] != undefined && scripts[z] != "") {
                                //console.debug("adding script: ", scripts[z]);
                                var javascript2 = document.createElement('script');
                                domAttr.set(javascript2,"type","text/javascript");
                                domAttr.set(javascript2,"src",scripts[z]);
                                domAttr.set(javascript2,"name",xlinkTarget);
                                head4.appendChild(javascript2);
                            }
                        }
                    }
                })
            })
        }
        /*  xf:load show=none
         to unload (loaded) subforms
         */
        else if (xmlEvent.contextInfo.show == "none") {
            // console.debug("XFProcessor._handleBetterFormLoadURI: htmlEntryPoint", htmlEntryPoint);
            this._unloadDOM(xmlEvent.contextInfo.xlinkTarget);
        }
        else {
            console.error("betterform-load-uri show='" + xmlEvent.contextInfo.show + "' unknown!");
        }


    }