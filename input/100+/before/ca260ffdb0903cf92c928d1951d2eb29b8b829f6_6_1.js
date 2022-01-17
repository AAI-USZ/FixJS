function() {
        view = new joCard([
            new joTitle("Register"),
            new joGroup([
                new joCaption("User Name"),
                new joFlexrow(inputUser = new joInput("")),
                new joCaption("Password"),
                new joFlexrow(inputPass = new joPasswordInput("")),
                new joCaption("First Name"),
                new joFlexrow(inputFirstname = new joInput("")),
                new joCaption("Last Name"),
                new joFlexrow(inputSurname = new joInput("")),
                new joCaption("Email"),
                new joFlexrow(inputEmail = new joInput("")),
                new joCaption("Phone"),
                new joFlexrow(inputPhone = new joInput("")),
            ]),
            new joFlexrow([
                new joButton("Register").selectEvent.subscribe(onRegisterClicked)
            ])
        ]);
    }