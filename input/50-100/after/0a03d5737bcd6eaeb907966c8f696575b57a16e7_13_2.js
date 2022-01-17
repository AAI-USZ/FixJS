function (inputs, fetchModel) {
        inputs.eq(0).prop("disabled", fetchModel().length <= 1);
    }