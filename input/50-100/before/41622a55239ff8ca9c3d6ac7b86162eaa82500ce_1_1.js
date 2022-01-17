function() {
    var inputElementId = "myText";
    var $text = createInputElement(inputElementId, "@Min(value=5)", "text");
    $text.val("");

    regula.configure({
        validateEmptyFields: false
    });

    regula.bind();
    var constraintViolation = regula.validate()[0];

    equals(regula.validate().length, 0, "@Min must not fail against empty field when validateEmptyFields is set to false");
    deleteElements();
}