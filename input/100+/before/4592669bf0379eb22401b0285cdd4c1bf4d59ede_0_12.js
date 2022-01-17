function createFieldDecimal(namePattern, name, label, minOccurs) {
    var field;
    
    var inputName = namePattern + "__" + name;
    var frag = document.createDocumentFragment();
    var dt = document.createElement('dt');
    var dd = document.createElement('dd');

    var newLabel = document.createElement("label");
    
    field = createInput('text', inputName);
    field.setAttribute('class','xsdForm__decimal');

    if (minOccurs > 0) {
        field.setAttribute('class', 'xsdForm__decimal xsdForm__mandatory')
    }
    
    newLabel.innerHTML = label;
    newLabel.htmlFor = inputName;

    dt.appendChild(newLabel);

    dd.appendChild(field);
    dt.appendChild(newLabel);
    frag.appendChild(dt);
    frag.appendChild(dd);

    return frag;
}