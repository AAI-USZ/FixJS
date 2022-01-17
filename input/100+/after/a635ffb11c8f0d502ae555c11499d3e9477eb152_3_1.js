function() {
    var $text0 = createInputElement("myText0", "@NotBlank @Max(value=5) @Min(value=10)", "text");
    var $text1 = createInputElement("myText1", "@NotBlank @Max(value=5) @Min(value=10)", "text");

    regula.bind();
    regula.unbind({
        elements: [$text0.get(0), $text1.get(0)]
    });

    equals(regula.validate().length, 0, "All bound elements must have been unbound");
    raises(function() {
        regula.validate({elementId: "myText0"})
    }, /No constraints have been bound to element with id myText0. Function received: {elementId: myText0}/, "Calling regula.validate with an unbound element's id must result in an error");
    raises(function() {
        regula.validate({elementId: "myText1"})
    }, /No constraints have been bound to element with id myText1. Function received: {elementId: myText1}/, "Calling regula.validate with an unbound element's id must result in an error");

    deleteElements();
}