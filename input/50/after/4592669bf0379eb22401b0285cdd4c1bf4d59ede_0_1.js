function createFieldBoolean(name, minOccurs) {
    var field = createInput('checkbox', name);    
    //field.setAttribute('title', 'Este ítem é obrigatório!');
    //field.setAttribute('need', '1');
    return field;
}