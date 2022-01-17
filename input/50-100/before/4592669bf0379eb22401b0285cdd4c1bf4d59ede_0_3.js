function createFieldInteger(name, minOccurs, maxLength) {
    var field;
    field = createInput('text', name, name, maxLength);
    field.setAttribute('class','xsdForm__integer');
    if (minOccurs > 0) {
        field.setAttribute('class', 'xsdForm__integer xsdForm__mandatory');
    }
    return field;
}