function(xmlEvent){
        console.debug("XFProcessor._handleInstanceCreated xmlEvent:",xmlEvent);
        // TODO: Lars: add animation again
        // dojo.require("dojox.fx");
        var debugPane = dom.byId("bfDebugLinks");

        if(debugPane != null){
            var contextroot = domAttr.get(dom.byId("bfDebug"),"context");
            var newLink = document.createElement("a");
            domAttr.set(newLink,"href",contextroot + xmlEvent.contextInfo.modelId + "/" + xmlEvent.contextInfo.instanceId);
            domAttr.set(newLink,"target","_blank");
            domAttr.set(newLink,"modelId",xmlEvent.contextInfo.modelId);
            var linkText = document.createTextNode("Model:" + xmlEvent.contextInfo.modelId + " :: " + "Instance:" + xmlEvent.contextInfo.instanceId);
            newLink.appendChild(linkText);
            debugPane.appendChild(newLink);
            // dojox.fx.highlight({node:newLink, color:'#999999', duration:600}).play()
        }
    }