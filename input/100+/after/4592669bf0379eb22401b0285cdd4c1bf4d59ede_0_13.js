function generateFormField(tagRaiz, xmlNode, type, namePattern, minOccurs, maxOccurs) {

    var name = getValueAttributeByName(xmlNode, "name");
    var inputName = namePattern + "__" + name;
    var field;

    if ( type == "xs:string" ) {
        field = createFieldString(inputName, minOccurs, maxOccurs);
    } else if ( type == "xs:float" ) {
        field = createFieldFloat(inputName, minOccurs, maxOccurs);
    } else if ( type == "cadastroCPF" ) {
        field = createInput('text', inputName, inputName, '255', '[0-9]+');
    } else if ( type == "xs:decimal" ) {
        field = createFieldDecimal(inputName, minOccurs, maxOccurs);
    } else if ( type == "xs:integer" ) {
        field = createFieldInteger(inputName, minOccurs, maxOccurs);
    } else if ( type == "xs:date" ) {
        field = createFieldDate(inputName, minOccurs, maxOccurs);
    } else if ( type == "xs:dateTime" ) {
        field = createFieldDateTime(inputName, minOccurs, maxOccurs);
    } else if ( type == "xs:boolean" ) {
        field = createFieldBoolean(inputName);
    } else {
        alert(type + ' - Unknown type!');
        return false;
    }
    
    if(minOccurs > 0 && type != "xs:boolean" ) {
        field.setAttribute('title', 'Este ítem é obrigatório!');
        field.setAttribute('need', '1');
    }

    var frag = document.createDocumentFragment();
    var dt = document.createElement('dt');
    var newLabel = createLabel( starVerify(getTextTagInAnnotationAppinfo(xmlNode, 'xhtml:label')) + ( (minOccurs > 0 &&  type != "xs:boolean") ? itemRequired: notRequired) );

    if ( type == "xs:boolean") {
        dt.setAttribute('class', 'dtsemdd');
        dt.appendChild(field);
        dt.appendChild(newLabel);
        frag.appendChild(dt);
    } else  {
        var dd = document.createElement('dd');

        var divType = document.createElement('div');
        divType.setAttribute('name', 'type');
        divType.setAttribute('style', 'display:none;');
        divType.appendChild( document.createTextNode( type ) );
        dd.appendChild(field);
        dt.appendChild(newLabel);
        frag.appendChild(dt);
        frag.appendChild(dd);
    }
    return frag;
}