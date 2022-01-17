function createFieldDate(name, minOccurs) {
    var field;
    field = createInput('text', name);
    field.setAttribute('maxlength', '10');
    field.setAttribute('class', 'xsdForm__date');
    if (minOccurs > 0) {
        field.setAttribute('class', 'xsdForm__date xsdForm__mandatory');
        field.setAttribute('title', 'Este ítem é obrigatório!');
        field.setAttribute('need', '1');
    }
    return field;
}