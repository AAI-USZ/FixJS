function generateXmlFromComplexTypeNodeNoRepeat(odoc, namespace, tagRaiz, xmlNode, namePattern, name) {
    // gerar o fieldset com o legend e os conteudos...

    var tag = odoc.createElementNS(namespace, name);
  //console.warn(name, namePattern, xmlNode, tagRaiz);

    for (var i = 0; i < xmlNode.childNodes.length; i++) {
        var el = xmlNode.childNodes[i];
        if( name == 'composicaoFamiliar') console.warn(name, el); //ARTZ 1
        
        if (el.nodeType == 1 && el.nodeName == 'xs:sequence') {
            for (var j = 0; j < el.childNodes.length; j++) {
                if (el.childNodes[j].nodeType == 1 && el.childNodes[j].nodeName == "xs:element") {
                    var elHtml = generateXmlFromNode(odoc, namespace, tagRaiz, el.childNodes[j], namePattern + "__" + name);
                    if (elHtml) {
                        tag.appendChild(elHtml);
                    }
                }
            }
        } else if (el.nodeType == 1 && el.nodeName == 'xs:choice') {
            //throw "xs:choice not supported";
        }
    }

    return tag;

}