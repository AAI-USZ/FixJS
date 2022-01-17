function() {
        regula.unbind({
            elementId: "myText",
            constraints: [regula.Constraint.NotBlank]
        });
    }, /Element with id myText does not have any constraints bound to it. Function received: {elementId: myText, constraints: \[5\], elements: \[\[object HTMLInputElement\]\]}