function createFieldDateTime(name, minOccurs) {
    var field;
    field = createInput('text', name);
    field.setAttribute('maxlength', '19');
    field.setAttribute('class','xsdForm__dateTime');
    //field.setAttribute('onblur', 'validateValues()');
    if (minOccurs > 0) {
        field.setAttribute('class', 'xsdForm__dateTime xsdForm__mandatory')
    }
    return field;
}