function generateForm(xsdFile,containerId) {
    try {

        //carrega o xml
        var xml = xmlLoader(xsdFile);
        var tagRaiz  = xml.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema','schema')[0];
        var elemRoot = getNodeByTagName(tagRaiz, 'xs:element'); // elemento raiz
        var elHtml = generateFormFromNode(tagRaiz, elemRoot, "xsdform___");
        getById(containerId).appendChild(elHtml );
        
        var divx = document.createElement('div');
        divx.id = "requireditems";
        getById(containerId).appendChild( divx);
        $('input[need], select[need], textarea[need]').tipsy({trigger: 'focus', gravity: 'w'});
        $('input[need], select[need], textarea[need]').blur( function(){onBlurVerify( this );} );
        $('input[need], select[need], textarea[need]').change( function(){returnRequiredItems("requireditems");} );
        returnRequiredItems("requireditems");
        $(document).ready(function() {
            returnRequiredItems("requireditems");
         });

    } catch (myError) {
        alert( myError.name + ': ' + myError.message + "\n" + myError);
    }
}