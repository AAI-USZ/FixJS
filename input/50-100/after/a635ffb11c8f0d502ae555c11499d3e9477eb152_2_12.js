function() {
    var formElementId = "hiddenForm";
    var $form = createFormElement(formElementId, "@PasswordsMatch(label=\"test\", message=\"this is a test\", groups=[Test])");

    var expectedExceptionMessage = new RegExp(formElementId + ".PasswordsMatch: You seem to have provided some optional or required parameters for @PasswordsMatch, but you are still missing the following 2 required parameter\\(s\\): field1, field2");
    raises(function() {
        $form.regula('bind',{
            constraints: [
                {
                    constraintType: regula.Constraint.PasswordsMatch,
                    params: {
                        label: "test",
                        message: "this is a test",
                        groups: ["Test"]
                    }
                }
            ]
        });
    }, expectedExceptionMessage, "@PasswordsMatch cannot be bound without its required parameter");

    deleteElement(formElementId);
}