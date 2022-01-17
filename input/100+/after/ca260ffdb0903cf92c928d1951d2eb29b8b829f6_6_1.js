function() {
        view = new joCard([
            new joTitle("Register"),
            new joGroup([
                new joFlexrow([new joCaption("User Name"), validateUsername = new joView()]),
                new joFlexrow([inputUser = new joInput()]),
                new joFlexrow([new joCaption("Password"), validatePassword = new joView()]),
                new joFlexrow([inputPass = new joPasswordInput()]),
                new joFlexrow([new joCaption("First Name"), validateFirstname = new joView()]),
                new joFlexrow([inputFirstname = new joInput()]),
                new joFlexrow([new joCaption("Surname"), validateSurname = new joView()]),
                new joFlexrow([inputSurname = new joInput()]),
                new joFlexrow([new joCaption("Email"), validateEmail = new joView()]),
                new joFlexrow([inputEmail = new joInput("", "email")]),
                new joFlexrow([new joCaption("Phone"), validatePhone = new joView()]),
                new joFlexrow([inputPhone = new joInput("", "number")]),
            ]),
            new joFlexrow([
                new joButton("Register").setStyle({id:"btnRegister"}),
            ])
        ]);
    }