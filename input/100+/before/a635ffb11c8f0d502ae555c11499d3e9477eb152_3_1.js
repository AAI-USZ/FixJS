function() {
    var $text = createInputElement("myText", "@NotBlank @Max(value=5) @Min(value=10)", "text");

    regula.bind();
    regula.unbind({
        elementId: "myText",
        constraints: [regula.Constraint.NotBlank]
    });

    equals(regula.validate().length, 2, "There should only be two constraints bound to this element");

    deleteElements();
}