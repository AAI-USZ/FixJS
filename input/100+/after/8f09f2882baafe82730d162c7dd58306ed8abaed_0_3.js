function(envNode, type, name) {
        
        var nodes = envNode.childNodes, i, configNode, configNodeName, configName, xmlString, xmlSerializer,
        json = {};

        for (i = 0; i < nodes.length; i++) {
            configNode = nodes[i];
            configNodeName = configNode.nodeName;

            if (configNodeName === type && name !== undefined && configNodeName !== "#text") {
                configName = configNode.getAttribute("name");
                if (configName === name) {
                    xmlString = (new window.XMLSerializer()).serializeToString(configNode);
                    json = $.xml2json(configNode);
                    return json;
                } else if (name === "") {
                    xmlString = (new window.XMLSerializer()).serializeToString(configNode);
                    json = $.xml2json(configNode);
                    return json;
                }
            } else if (configNodeName === type && configNodeName !== "#text") {
                xmlString = (new window.XMLSerializer()).serializeToString(configNode);
                json = $.xml2json(configNode);
                return json;
            }
        }

        return json;
    }