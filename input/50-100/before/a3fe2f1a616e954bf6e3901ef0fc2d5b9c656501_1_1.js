function createFormRow(text, value, idForElement, info) {
    return         '<label for="' + idForElement + '">' + text + '</label>' +
        '<div>' +
        '<input id="' + idForElement + '" class="reg_input" type="text" value="' +
        value + '" name="' + idForElement + '">' +
        '<br>' +
        '</div>' +
        '<span class="reg_info">' + info + '</span>';
}