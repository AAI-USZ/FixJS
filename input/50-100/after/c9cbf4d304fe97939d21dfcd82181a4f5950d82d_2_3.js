function(xmlEvent){
        // console.debug("XFProcessor._handleModelRemoved xmlEvent:",xmlEvent);
        var modelId = xmlEvent.contextInfo.modelId;
        require(["dojo/query", "dojo/NodeList-manipulate"], function(query){
            query("#bfDebug a[modelId='" + modelId +"']").remove();
        });
    }