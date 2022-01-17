function() {
        view =  new joCard([
            new joGroup([
               new joLabel("Content"),
               new joFlexrow(inputComment = new joTextarea("")),
            ]),
            new joDivider(),
            new joButton("Submit").selectEvent.subscribe(onSubmitClicked),
        ]);
    }