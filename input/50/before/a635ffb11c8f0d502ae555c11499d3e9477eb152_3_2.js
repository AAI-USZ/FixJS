function() {
    raises(function() {
        regula.unbind({
            elementId: "myText"
        });
    }, /Element with id myText does not have any constraints bound to it. Function received: {elementId: myText}/, "regula.unbind() must fail if provided an unbound element's id");
}