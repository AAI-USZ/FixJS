function createFieldFloat(name, minOccurs) {
    var field;
    field = createInput('text', name);
    field.setAttribute('class','xsdForm__float');
    if (minOccurs > 0) {
        field.setAttribute('class', 'xsdForm__float xsdForm__mandatory');
        field.setAttribute('title', 'Este ítem é obrigatório!');
        field.setAttribute('need', '1');
    }
    return field;
}