function() {
    var formElementId = "hiddenForm";
    var $form = createFormElement(formElementId);

    var expectedExceptionMessage = new RegExp(formElementId + ".PasswordsMatch: You seem to have provided some optional or required parameters for @PasswordsMatch, but you are still missing the following 1 required parameter\\(s\\): field2");
    raises(function() {
        $form.regula('bind',{
            constraints: [
                {
                    constraintType: regula.Constraint.PasswordsMatch,
                    params: {
                        field1: "field1"
                    }
                }
            ]
        });
    }, expectedExceptionMessage, "@PasswordsMatch cannot be bound without its required parameter");

    deleteElement(formElementId);
}