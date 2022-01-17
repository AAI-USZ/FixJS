function(xmlEvent){
        console.debug("XFProcessor._handleAVTChanged xmlEvent:",xmlEvent);
        domAttr.set(xmlEvent.contextInfo.targetId, xmlEvent.contextInfo.attribute, xmlEvent.contextInfo.value);
    }