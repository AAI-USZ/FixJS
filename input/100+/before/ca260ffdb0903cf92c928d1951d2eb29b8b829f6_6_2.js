function onRegisterClicked() {
        console.log("hide popup");

        var user = {};
        user.username = inputUser.getData();
        user.password = inputPass.getData();
        user.firstname = inputFirstname.getData();
        user.surname = inputSurname.getData();
        user.email = inputEmail.getData();
        user.phone = inputPhone.getData();

        // perform login
        App.UserService.register(user,
            function(data) {
                console.log("success");
                App.scn.hidePopup();
            },
            function(error) {
                // TODO: failure case
            });

        App.scn.hidePopup();
    }