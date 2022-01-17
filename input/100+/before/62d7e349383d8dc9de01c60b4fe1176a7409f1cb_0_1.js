function (that, messageBar, passwordValidator) {
        var password = that.locate("password");
        if (password.is(":visible")) {
            var pwd = password.val();
            if (pwd !== that.locate("passwordConfirm").val()) {
                messageBar.show(that.options.parentBundle.resolve("admin-passwordsDoNotMatch"), null, true);
                return false;
            }
            if (!passwordValidator.validateLength(pwd)) {
                return false;
            }
        }
        return true;
    }