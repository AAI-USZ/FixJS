function() {
    var inputElementId = "myText";
    var $text = createInputElement(inputElementId, "@Min(value=5, ignoreEmpty=true)", "text");
    $text.val("");

    regula.configure({
        validateEmptyFields: true
    });

    regula.bind();

    equals(regula.validate().length, 0, "@Min must not fail against empty field when validateEmptyFields is set to true and ignoreEmpty is set to true");
    deleteElements();
}