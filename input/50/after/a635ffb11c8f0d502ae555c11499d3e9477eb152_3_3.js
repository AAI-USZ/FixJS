function() {
    raises(function() {
        regula.unbind({
            elementId: "myText",
            constraints: [regula.Constraint.NotBlank]
        });
    }, /Element with id myText does not have any constraints bound to it. Function received: {elementId: myText, constraints: \[5\], elements: \[null\]}/, "regula.unbind() must fail if provided an unbound element's id");
}