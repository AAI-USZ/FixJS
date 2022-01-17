function generateFormIteration(xsdFile,containerId,Iteration) {
    try {
        //carrega o xml
        var xml = xmlLoader(xsdFile);
        var tagRaiz  = xml.getElementsByTagName('xs:schema')[0];
        var elemRoot = getNodeByTagName(tagRaiz, 'xs:element'); // elemento raiz
        var elHtml = generateFormFromNode(tagRaiz, elemRoot, "xsdform___"+Iteration);
        getById(containerId).appendChild( elHtml );

    } catch (myError) {
        alert( myError.name + ': ' + myError.message + "\n" + myError);
    }
}