function() {
    var inputElementId = "hiddenInput";
    var $input = createInputElement(inputElementId);

    var expectedExceptionMessage = new RegExp(inputElementId + ".Pattern: You seem to have provided some optional or required parameters for @Pattern, but you are still missing the following 1 required parameter\\(s\\): regex");
    raises(function() {
        $input.regula('bind',{
            constraints: [
                {
                    constraintType: regula.Constraint.Pattern,
                    params: {
                        label: "test",
                        message: "this is a test",
                        groups: ["Test"]
                    }
                }
            ]
        })
    }, expectedExceptionMessage, "@Pattern cannot be bound without its required parameter");

    deleteElement(inputElementId);
}