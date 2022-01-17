function(url, id) {
        // Retrieve the screen contents
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET",url,false);
        xmlhttp.send();
        // generate our screen content
        var newScreen = xmlhttp.responseText,
            container = document.createElement('div');
        container.setAttribute('id', id);
        container.innerHTML = newScreen;

        // Add any Java Script files that need to be included
        var scriptIds = [],
            scripts = container.getElementsByTagName('script'),
            newScriptTags = [];
        container.scriptIds = scriptIds;
        for (var i = 0; i < scripts.length; i++) {
            var bbScript = scripts[i],
                scriptTag = document.createElement('script');
            scriptIds.push({'id' : bbScript.getAttribute('id'), 'onunload': bbScript.getAttribute('onunload')});
            scriptTag.setAttribute('type','text/javascript');
            scriptTag.setAttribute('src', bbScript.getAttribute('src'));
            scriptTag.setAttribute('id', bbScript.getAttribute('id'));
            newScriptTags.push(scriptTag);
            // Remove script tag from container because we are going to add it to <head>
            bbScript.parentNode.removeChild(bbScript);
        }

        // Add getElementById for the container so that it can be used in the onscreenready event
        container.getElementById = function(id, node) {
                var result = null;
                if (!node) {
                    node = this;
                }

                if ( node.getAttribute('id') == id )
                    return node;

                for ( var i = 0; i < node.childNodes.length; i++ ) {
                    var child = node.childNodes[i];
                    if ( child.nodeType == 1 ) {
                        result = this.getElementById( id, child );
                        if (result)
                            break;
                    }
                }
                return result;
            };

        // Special handling for inserting script tags
        bb.screen.scriptCounter = 0;
        bb.screen.totalScripts = newScriptTags.length;
        for (var i = 0; i < newScriptTags.length; i++) {
            var head = document.getElementsByTagName('head');
            if (head.length > 0 ) {
                head[0].appendChild(newScriptTags[i]);
                newScriptTags[i].onload = function() {
                    bb.screen.scriptCounter++;
                    if(bb.screen.scriptCounter == bb.screen.totalScripts) {
                        // When we have scripts we fire the onscreenready and then apply our changes in doLoad()
                        if (bb.onscreenready) {
                            bb.onscreenready(container, container.getAttribute('id'));
                        }
                        bb.doLoad(container);
                        // Load in the new content
                        document.body.appendChild(container);
                        window.scroll(0,0);
                        bb.screen.applyEffect(id, container);
                    }
                };
            }
        }

        // In case there are no scripts at all we simply doLoad() now
        if(bb.screen.totalScripts === 0) {
            if (bb.onscreenready) {
                bb.onscreenready(container, container.getAttribute('id'));
            }
            bb.doLoad(container);
            // Load in the new content
            document.body.appendChild(container);
            window.scroll(0,0);
            bb.screen.applyEffect(id, container);
        }
        return container;
    }