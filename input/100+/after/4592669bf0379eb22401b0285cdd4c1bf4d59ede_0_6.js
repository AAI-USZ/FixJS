function generateFormFromSimpleTypeNodeRestrictionMaxLength(tagRaiz, xmlNode, namePattern, name, label, minOccurs, maxLength, engine, service, valorPadrao, nameBase){
    var inputName = namePattern + "__" + name;


    var newLabel = document.createElement("label");
    newLabel.innerHTML = label;
    newLabel.htmlFor = inputName;

    var dt = document.createElement('dt');
    var dd = document.createElement('dd');
    dt.appendChild(newLabel);
    
    if(nameBase == 'xs:string'){
        field = createInput('text' ,inputName, inputName, maxLength, valorPadrao);
    }
   else {
        field = createFieldInteger(inputName, minOccurs, maxLength);
   }

    if (engine) {
	if (field.getAttribute('class')) {
		 field.setAttribute('class', field.getAttribute('class')+ ' '+ engine);
	} else {
		 field.setAttribute('class', engine);
	}
        field.setAttribute('rel', service);
    }

    if (minOccurs > 0) {
        field.setAttribute('class', 'xsdForm__mandatory');       
        field.setAttribute('title', 'Este ítem é obrigatório!');
        field.setAttribute('need', '1');
    }

    dd.appendChild(field);

    var frag = document.createDocumentFragment();
    frag.appendChild(dt);
    frag.appendChild(dd);
    return frag;
}