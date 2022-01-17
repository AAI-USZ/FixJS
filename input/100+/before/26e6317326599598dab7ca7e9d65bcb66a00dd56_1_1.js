function() {
    var inputElementId = "myCheckbox";
    var $checkbox = createInputElement(inputElementId, "@Checked", "checkbox");

    regula.bind();
    var constraintViolation = regula.validate()[0];

    testConstraintViolationsForDefaultConstraints(constraintViolation, {
        constraintName: "Checked",
        groups: "Default",
        elementId: "myCheckbox",
        validatedGroups: "Default",
        errorMessage: "The checkbox needs to be checked."
    });

    deleteElements();
}