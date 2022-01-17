function generateFormFromSimpleTypeNodeRestrictionEnumeration(tagRaiz, xmlNode, namePattern, name, label, minOccurs){
    var inputName = namePattern + "__" + name;

    var frag = document.createDocumentFragment();
    var dt = document.createElement('dt');
    var dd = document.createElement('dd');

    var newSelect = document.createElement('select');
    newSelect.name  = inputName;
    newSelect.id    = inputName;
    dd.appendChild(newSelect);

    if (minOccurs > 0) {
        newSelect.setAttribute('class', 'xsdForm__mandatory');
        newSelect.setAttribute('title', 'Este ítem é obrigatório!');
        newSelect.setAttribute('need', '1');
    }

    var restrictionNode = getNodeByTagName(xmlNode, 'xs:restriction');

    var newOption;
    newOption = document.createElement("option");
    newOption.innerHTML = '';
    newSelect.appendChild(newOption);
    for (var i = 0; i < restrictionNode.childNodes.length; i++) {
        if (restrictionNode.childNodes[i].nodeType == 1 && restrictionNode.childNodes[i].nodeName == 'xs:enumeration'  ) {
            newOption = document.createElement("option");
            newOption.innerHTML = getValueAttributeByName(restrictionNode.childNodes[i], 'value');
            newSelect.appendChild(newOption);
        }
    }

    var newLabel = document.createElement("label");
    newLabel.innerHTML = starVerify(label) + (minOccurs > 0 ? itemRequired: notRequired);
    newLabel.htmlFor = inputName;

    dt.appendChild(newLabel);

    dd.appendChild(newSelect);
    dt.appendChild(newLabel);
    frag.appendChild(dt);
    frag.appendChild(dd);

    return frag;
}