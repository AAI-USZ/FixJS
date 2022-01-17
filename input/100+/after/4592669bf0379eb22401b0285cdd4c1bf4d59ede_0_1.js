function generateFormFromNode(tagRaiz, xmlNode, namePattern) {
    var label;
    var engine;
    var service;
    var type = getValueAttributeByName(xmlNode, "type");
    var minOccurs = getValueAttributeByName(xmlNode, "minOccurs");
    var maxOccurs = getValueAttributeByName(xmlNode, "maxOccurs");
    if (minOccurs == null) {minOccurs = 1}
    if (type != null && static_type(type)) {
        return generateFormField(tagRaiz, xmlNode, type, namePattern, minOccurs, maxOccurs);
    } else if (type != null) {
        // the definition is probably in the same schema.
        for (var i = 0; i < xmlNode.childNodes.length; i++) {
            if (xmlNode.childNodes[i].nodeType == 1 && xmlNode.childNodes[i].nodeName == 'xs:annotation' ) {
                label = getTextTagInAnnotationAppinfo(xmlNode.childNodes[i], 'xhtml:label', true);
                //label = starVerify(label) + (minOccurs > 0 ? itemRequired: notRequired);
                engine = getTextTagInAnnotationExtensions(xmlNode.childNodes[i], 'xsdext:engine');
                service = getTextTagInAnnotationExtensions(xmlNode.childNodes[i], 'xsdext:service');
                break;
            }
        }
        for (var i = 0; i < tagRaiz.childNodes.length; i++) {
            var inner = tagRaiz.childNodes[i];
            if (inner.nodeType == 1 && inner.nodeName == 'xs:complexType' &&
                getValueAttributeByName(inner, "name") == type) {
                return generateFormFromComplexTypeNode(tagRaiz, inner, namePattern, getValueAttributeByName(xmlNode, "name"), label, minOccurs, maxOccurs, engine, service );
            }
        }
    } else {
        // inline type definition
        for (var i = 0; i < xmlNode.childNodes.length; i++) {
            if (xmlNode.childNodes[i].nodeType == 1 && xmlNode.childNodes[i].nodeName == 'xs:annotation' ) {
                label = getTextTagInAnnotationAppinfo(xmlNode.childNodes[i], 'xhtml:label', true);
                engine = getTextTagInAnnotationExtensions(xmlNode.childNodes[i], 'xsdext:engine');
                service = getTextTagInAnnotationExtensions(xmlNode.childNodes[i], 'xsdext:service');
            } else if (xmlNode.childNodes[i].nodeType == 1 && xmlNode.childNodes[i].nodeName == 'xs:complexType') {
                return generateFormFromComplexTypeNode(tagRaiz, xmlNode.childNodes[i], namePattern, getValueAttributeByName(xmlNode, "name"), label, minOccurs, maxOccurs, engine, service );

            } else if (xmlNode.childNodes[i].nodeType == 1 && xmlNode.childNodes[i].nodeName == 'xs:simpleType') {
                label = starVerify(label) + (minOccurs > 0 ? itemRequired: notRequired);
                return generateFormFromSimpleTypeNode(tagRaiz, xmlNode.childNodes[i], namePattern, getValueAttributeByName(xmlNode, "name"), label, minOccurs,  engine, service);

            }
        }
    }
}