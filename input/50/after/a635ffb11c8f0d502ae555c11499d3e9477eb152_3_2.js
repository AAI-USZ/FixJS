function() {
    console.log("blort");
    raises(function() {
        regula.unbind({
            elementId: "myText"
        });
    }, new RegExp("Element with id myText does not have any constraints bound to it. Function received: {elementId: myText, elements: \\[null\\]}"), "regula.unbind() must fail if provided an unbound element's id");
}