function() {
        view = new joCard([
            new joTitle("Login"),
            new joFlexcol([
                new joDivider(),
                new joButton("Register").selectEvent.subscribe(onRegisterClicked),
                new joDivider(),
                new joGroup([
                    new joCaption("User Name"),
                    new joFlexrow(inputUser = new joInput("")),
                    new joCaption("Password"),
                    new joFlexrow(inputPass = new joPasswordInput(""))
                ]),
                new joFlexrow([
                    new joButton("Login").selectEvent.subscribe(onLoginClicked)
                ])
            ])
        ]);
    }