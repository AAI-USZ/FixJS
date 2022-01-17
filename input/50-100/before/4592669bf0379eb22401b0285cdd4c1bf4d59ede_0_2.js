function createFieldFloat(name, minOccurs) {
    var field;
    field = createInput('text', name);
    field.setAttribute('class','xsdForm__float');
    if (minOccurs > 0) {
        field.setAttribute('class', 'xsdForm__float xsdForm__mandatory')
    }
    return field;
}